// Ion explorer: /ion lists cations, anions, polyatomic and complex ions; /ion/<id> is an ion profile with its
// PubChem identity (checked by scripts/sync-ions.mjs), electron count, tests, compounds and reactions.
import { $, esc, debounce, safeURL } from '../core/dom.js';
import { S, pick, fmt, num, atLeast } from '../core/prefs.js';
import { replaceQuery } from '../core/router.js';
import { levelName } from '../i18n/ui.js';
import { icon } from '../components/icons.js';
import {
  pageHead,
  breadcrumbs,
  loading,
  notice,
  extLink,
  levelBadge,
  emptyState,
} from '../components/common.js';
import { moleculeCard } from '../components/cards.js';
import { Viewer3D } from '../components/moleculeViewer3D.js';
import { IONS, getIon } from '../data/ions.js';
import { getMolecule, normalize } from '../data/curatedMolecules.js';
import { getElement } from '../data/periodicTable.js';
import { reactionsWith } from '../data/reactionLibrary.js';
import { materialsWith } from '../data/materials.js';
import { reference } from '../data/references.js';
import { ionIndex, ionRecord, moleculeIndex } from '../services/data.js';
import { parseFormula, formulaHTML } from '../services/formula.js';
import { imageURL, recordURL } from '../services/pubchem.js';
import { trackVisit } from '../core/userdata.js';

const s = S({
  title: ['Penjelajah ion', 'Ion explorer'],
  lead: [
    'Kation, anion, ion poliatom, dan ion kompleks: muatan, jumlah elektron, cara mengenalinya, dan senyawa tempat ion itu berada. Identitas setiap ion dicocokkan dengan rekaman PubChem.',
    'Cations, anions, polyatomic and complex ions: charge, electron count, how to test for them and the compounds they are found in. Every ion’s identity is checked against its PubChem record.',
  ],
  search: ['Cari ion', 'Find an ion'],
  placeholder: ['Contoh: sulfat, Fe³⁺, NH4', 'e.g. sulfate, Fe³⁺, NH4'],
  kind: ['Jenis', 'Kind'],
  all: ['Semua', 'All'],
  cation: ['Kation (+)', 'Cations (+)'],
  anion: ['Anion (−)', 'Anions (−)'],
  structure: ['Susunan', 'Structure'],
  mono: ['Monoatom', 'Monatomic'],
  poly: ['Poliatom', 'Polyatomic'],
  complex: ['Ion kompleks', 'Complex ions'],
  level: ['Jenjang', 'Level'],
  count: ['{n} ion', '{n} ions'],
  none: ['Tidak ada ion yang cocok.', 'No ions match.'],
  notFound: ['Ion tidak ditemukan.', 'Ion not found.'],
  charge: ['Muatan', 'Charge'],
  electrons: ['Jumlah elektron', 'Electrons'],
  electronsNote: ['Σ nomor atom − muatan', 'Σ atomic numbers − charge'],
  composition: ['Atom penyusun', 'Atoms'],
  mass: ['Massa (PubChem)', 'Mass (PubChem)'],
  about: ['Sifat dan perilaku', 'Behaviour'],
  found: ['Ditemukan & dipakai di', 'Found & used in'],
  test: ['Cara mengenali (uji)', 'How to test for it'],
  compounds: ['Senyawa katalog yang mengandung ion ini', 'Catalogue compounds containing this ion'],
  noCompounds: [
    'Belum ada senyawa katalog dengan ion ini; cari di PubChem lewat Jelajah.',
    'No catalogue compounds with this ion yet; search PubChem from Explore.',
  ],
  acid: ['Asam penghasil anion ini', 'The acid that gives this anion'],
  reactions: ['Reaksi yang melibatkan ion ini', 'Reactions involving this ion'],
  materials: ['Ada di material & campuran', 'Found in materials & mixtures'],
  related: ['Ion terkait', 'Related ions'],
  identity: ['Identitas kimia (PubChem)', 'Chemical identity (PubChem)'],
  noRecord: [
    'PubChem belum memiliki rekaman untuk ion bebas ini, sehingga data identitasnya belum tersedia. Muatan dan jumlah elektron dihitung dari rumusnya.',
    'PubChem has no record of this free ion, so its identity data is not available yet. Its charge and electron count are computed from the formula.',
  ],
  refs: ['Rujukan', 'References'],
  lesson: ['Materi: Ion & senyawa ion', 'Lesson: Ions & ionic compounds'],
  offline: [
    'Data PubChem belum dapat dimuat (mungkin sedang offline).',
    'PubChem data could not be loaded (you may be offline).',
  ],
});

export const title = route => (route.id ? pick(getIon(route.id)?.name || ['Ion', 'Ion']) : s.title);

/** Σ Z − charge, from the ion's formula. */
export function electronCount(ion) {
  const f = parseFormula(ion.f);
  const protons = Object.entries(f.counts || {}).reduce(
    (sum, [el, n]) => sum + (getElement(el)?.z || 0) * n,
    0
  );
  return { protons, electrons: protons - (f.charge || 0), charge: f.charge || 0, counts: f.counts || {} };
}
const chargeText = c => (c > 0 ? `+${c}` : c < 0 ? `−${-c}` : '0');
const typeOf = i => (i.complex ? 'complex' : i.poly ? 'poly' : 'mono');

export async function render({ id, main, params, isCurrent, cleanup }) {
  if (id) return renderIon(main, id, isCurrent, cleanup);
  const state = {
    q: params.get('q') || '',
    kind: params.get('kind') || '',
    type: params.get('type') || '',
    lv: params.get('lv') || '',
  };
  main.innerHTML = `<div class="container">
    ${pageHead({ title: esc(s.title), lead: esc(s.lead) })}
    <form class="filters" role="search" data-filters>
      <div class="field field-grow"><label for="ion-q">${esc(s.search)}</label><input id="ion-q" name="q" type="search" value="${esc(state.q)}" placeholder="${esc(s.placeholder)}" autocomplete="off" /></div>
      <div class="field"><label for="ion-kind">${esc(s.kind)}</label><select id="ion-kind" name="kind"><option value="">${esc(s.all)}</option><option value="cation">${esc(s.cation)}</option><option value="anion">${esc(s.anion)}</option></select></div>
      <div class="field"><label for="ion-type">${esc(s.structure)}</label><select id="ion-type" name="type"><option value="">${esc(s.all)}</option><option value="mono">${esc(s.mono)}</option><option value="poly">${esc(s.poly)}</option><option value="complex">${esc(s.complex)}</option></select></div>
      <div class="field"><label for="ion-lv">${esc(s.level)}</label><select id="ion-lv" name="lv"><option value="">${esc(s.all)}</option>${['sd', 'smp', 'sma', 'kuliah'].map(l => `<option value="${l}">${esc(levelName(l))}</option>`).join('')}</select></div>
    </form>
    <p class="muted" data-count aria-live="polite"></p>
    <div class="grid grid-4" data-ions></div>
    <p class="muted small">${esc(s.lesson)}: <a href="/learn/ion">${esc(pick(['buka materi', 'open the lesson']))}</a></p>
  </div>`;
  const form = $('[data-filters]', main);
  for (const k of ['kind', 'type', 'lv']) form.elements[k].value = state[k];
  const draw = () => {
    const q = normalize(state.q);
    const list = IONS.filter(
      i =>
        (!state.kind || i.kind === state.kind) &&
        (!state.type || typeOf(i) === state.type) &&
        (!state.lv || i.lv === state.lv) &&
        (!q || normalize(`${i.name[0]} ${i.name[1]} ${i.f} ${i.id}`).includes(q))
    );
    $('[data-count]', main).textContent = fmt(s.count, { n: list.length });
    $('[data-ions]', main).innerHTML = list.length ? list.map(ionCard).join('') : emptyState(s.none);
  };
  const update = debounce(() => {
    for (const k of Object.keys(state)) state[k] = form.elements[k].value;
    replaceQuery(state);
    draw();
  }, 150);
  form.addEventListener('input', update);
  form.addEventListener('submit', e => e.preventDefault());
  draw();
}

export function ionCard(i) {
  const { charge } = electronCount(i);
  return `<a class="card ion-card ion-${i.kind}" href="/ion/${i.id}">
    <span class="ion-formula">${formulaHTML(i.f)}</span>
    <span class="card-title">${esc(pick(i.name))}</span>
    <span class="topic-meta">${esc(pick(i.kind === 'cation' ? s.cation : s.anion))} · ${esc(pick(i.complex ? s.complex : i.poly ? s.poly : s.mono))} · ${esc(pick(['muatan', 'charge']))} ${chargeText(charge)}</span>
  </a>`;
}

async function renderIon(main, id, isCurrent, cleanup) {
  const ion = getIon(id);
  if (!ion) {
    main.innerHTML = `<section class="container page-state"><h1>${esc(s.notFound)}</h1><a class="btn" href="/ion">${esc(s.title)}</a></section>`;
    return;
  }
  trackVisit(`ion:${ion.id}`, pick(ion.name));
  main.innerHTML = `<div class="container">${loading()}</div>`;
  const [index, rec, molIdx] = await Promise.all([
    ionIndex().catch(() => new Map()),
    ion.noRecord ? Promise.resolve(null) : ionRecord(ion.id).catch(() => null),
    moleculeIndex(),
  ]);
  if (!isCurrent()) return;
  const { protons, electrons, charge, counts } = electronCount(ion);
  const info = index.get(ion.id);
  const props = rec?.props || {};
  const compounds = (ion.cmp || []).map(getMolecule).filter(Boolean);
  const acid = ion.acid ? getMolecule(ion.acid) : null;
  const reactions = reactionsWith(`i:${ion.id}`);
  const materials = materialsWith(`i:${ion.id}`);
  const refs = (ion.src || []).map(reference).filter(Boolean);
  const cid = rec?.cid || info?.cid;
  const els = Object.entries(counts)
    .map(([el, n]) => [getElement(el), n])
    .filter(([e]) => e);

  const facts = [
    [s.charge, chargeText(charge)],
    [s.electrons, `${electrons} (${protons} − (${chargeText(charge)}))`],
    [
      s.composition,
      els.map(([e, n]) => `<a href="/atom/${e.s}">${esc(e.s)}</a>${n > 1 ? ` × ${n}` : ''}`).join(', '),
    ],
    props.mw ? [s.mass, `${num(props.mw, 3)} g/mol`] : null,
  ].filter(Boolean);

  main.innerHTML = `<article class="container ion-page">
    ${breadcrumbs([
      [s.title, '/ion'],
      [pick(ion.name), ''],
    ])}
    <header class="mol-head">
      <div class="mol-titles">
        <p class="formula formula-lg">${formulaHTML(ion.f)}</p>
        <h1>${esc(pick(ion.name))}</h1>
        <p class="mol-badges">${levelBadge(ion.lv)} <span class="chip">${esc(pick(ion.kind === 'cation' ? s.cation : s.anion))}</span> <span class="chip">${esc(pick(ion.complex ? s.complex : ion.poly ? s.poly : s.mono))}</span></p>
      </div>
    </header>
    ${ion.noRecord ? notice(esc(s.noRecord), 'warn') : !rec ? notice(esc(s.offline), 'warn') : ''}
    <section class="mol-stage">
      <div class="card">
        <table class="data-table"><tbody>${facts.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${v}</td></tr>`).join('')}</tbody></table>
        <p class="muted small">${esc(s.electrons)}: ${esc(s.electronsNote)}.</p>
      </div>
      <div class="mol-side">
        ${ion.poly && rec?.structure ? `<div class="viewer-box"><div class="viewer viewer-sm" data-viewer></div></div>` : ''}
        ${cid && ion.poly ? `<figure class="structure-2d"><img src="${imageURL(cid, 300)}" alt="${esc(pick(['Struktur 2D', '2D structure']))}: ${esc(pick(ion.name))}" width="240" height="240" loading="lazy" data-fallback="icon" data-retry="2" /><figcaption>PubChem CID ${cid}</figcaption></figure>` : ''}
      </div>
    </section>

    <section class="mol-section"><h2>${esc(s.about)}</h2><p class="lead">${esc(pick(ion.about))}</p>
      <div class="grid grid-2">
        <div class="card"><h3>${icon('pin', { size: 18 })} ${esc(s.found)}</h3><p>${esc(pick(ion.found))}</p></div>
        ${ion.test ? `<div class="card"><h3>${icon('beaker', { size: 18 })} ${esc(s.test)}</h3><p>${esc(pick(ion.test))}</p></div>` : ''}
      </div>
    </section>

    <section class="mol-section"><h2>${esc(s.compounds)}</h2>
      ${compounds.length ? `<div class="grid grid-cards">${compounds.map(m => moleculeCard(m, molIdx.get(m.id))).join('')}</div>` : `<p class="muted">${esc(s.noCompounds)}</p>`}
      <p><a class="link-more" href="/explore?q=${encodeURIComponent(ion.q?.[0] || pick(ion.name))}">${icon('search', { size: 16 })} ${esc(pick(['Cari senyawa lain di PubChem', 'Search more compounds in PubChem']))}</a></p>
      ${acid ? `<p>${esc(s.acid)}: <a href="/molecule/${acid.id}">${esc(pick(acid.name))}</a></p>` : ''}
    </section>

    ${
      reactions.length
        ? `<section class="mol-section"><h2>${esc(s.reactions)}</h2><ul class="rx-list">${reactions
            .map(r => `<li><a href="/reaction/${r.id}">${esc(pick(r.name))}</a></li>`)
            .join('')}</ul></section>`
        : ''
    }
    ${
      materials.length
        ? `<section class="mol-section"><h2>${esc(s.materials)}</h2><p class="chip-grid">${materials.map(m => `<a class="chip" href="/material/${m.id}">${esc(pick(m.name))}</a>`).join(' ')}</p></section>`
        : ''
    }
    ${
      ion.see?.length
        ? `<section class="mol-section"><h2>${esc(s.related)}</h2><div class="grid grid-4">${ion.see
            .map(getIon)
            .filter(Boolean)
            .map(ionCard)
            .join('')}</div></section>`
        : ''
    }

    ${
      rec && atLeast('sma')
        ? `<section class="mol-section"><h2>${esc(s.identity)}</h2><div class="card"><table class="data-table"><tbody>
      <tr><th scope="row">PubChem CID</th><td>${extLink(recordURL(rec.cid), String(rec.cid))}</td></tr>
      ${props.title ? `<tr><th scope="row">${esc(pick(['Nama PubChem', 'PubChem title']))}</th><td>${esc(props.title)}</td></tr>` : ''}
      ${props.iupac ? `<tr><th scope="row">${esc(pick(['Nama IUPAC', 'IUPAC name']))}</th><td>${esc(props.iupac)}</td></tr>` : ''}
      ${props.formula ? `<tr><th scope="row">${esc(pick(['Rumus PubChem', 'PubChem formula']))}</th><td><code>${esc(props.formula)}</code></td></tr>` : ''}
      ${props.smiles ? `<tr><th scope="row">SMILES</th><td><code>${esc(props.smiles)}</code></td></tr>` : ''}
      ${props.inchikey ? `<tr><th scope="row">InChIKey</th><td><code>${esc(props.inchikey)}</code></td></tr>` : ''}
      ${rec.cas ? `<tr><th scope="row">CAS</th><td>${esc(rec.cas)}</td></tr>` : ''}
      </tbody></table>
      ${rec.descriptions?.[0] ? `<blockquote lang="en"><p>${esc(rec.descriptions[0].text)}</p><footer>${safeURL(rec.descriptions[0].url) ? extLink(rec.descriptions[0].url, rec.descriptions[0].source) : esc(rec.descriptions[0].source)}</footer></blockquote>` : ''}
      </div></section>`
        : ''
    }

    <section class="mol-section refs"><h2 class="h-small">${esc(s.refs)}</h2>
      <ul class="ref-list">${refs.map(r => `<li>${extLink(r.url, r.label)}</li>`).join('')}${cid ? `<li>${extLink(recordURL(cid), `PubChem CID ${cid}`)}</li>` : ''}</ul>
      <p><a href="/learn/ion">${esc(s.lesson)}</a></p>
    </section>
  </article>`;

  const host = $('[data-viewer]', main);
  if (host && rec?.structure?.atoms?.length) {
    const viewer = new Viewer3D(host, { label: `3D: ${pick(ion.name)}` });
    viewer.setData(rec.structure);
    cleanup(() => viewer.destroy());
  }
}
