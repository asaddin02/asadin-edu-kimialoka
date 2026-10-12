// Materials and mixtures: /material groups alloys, glass, ceramics, composites, solutions, colloids, suspensions,
// heterogeneous mixtures and biological macromolecules; /material/<id> shows composition, properties and sources.
import { $, esc, debounce } from '../core/dom.js';
import { S, pick, fmt } from '../core/prefs.js';
import { replaceQuery } from '../core/router.js';
import { icon } from '../components/icons.js';
import { pageHead, breadcrumbs, levelBadge, extLink, emptyState } from '../components/common.js';
import { MATERIALS, MATERIAL_TYPES, getMaterial, pdbURL, pdbImage } from '../data/materials.js';
import { getMolecule, normalize } from '../data/curatedMolecules.js';
import { getElement } from '../data/periodicTable.js';
import { getIon } from '../data/ions.js';
import { reference } from '../data/references.js';
import { findTopic } from '../data/topics/index.js';

const s = S({
  title: ['Material & campuran', 'Materials & mixtures'],
  lead: [
    'Kimia bukan hanya molekul: paduan logam, kaca, keramik, komposit, larutan, koloid, suspensi, campuran heterogen, dan makromolekul hayati. Setiap entri menautkan unsur, senyawa, dan ion penyusunnya.',
    'Chemistry is more than molecules: alloys, glass, ceramics, composites, solutions, colloids, suspensions, heterogeneous mixtures and biological macromolecules. Every entry links to its elements, compounds and ions.',
  ],
  search: ['Cari material', 'Find a material'],
  placeholder: ['Contoh: baja, susu, DNA', 'e.g. steel, milk, DNA'],
  type: ['Jenis', 'Kind'],
  all: ['Semua', 'All'],
  count: ['{n} entri', '{n} entries'],
  none: ['Tidak ada yang cocok.', 'Nothing matches.'],
  notFound: ['Material tidak ditemukan.', 'Material not found.'],
  composition: ['Komposisi', 'Composition'],
  component: ['Komponen', 'Component'],
  share: ['Porsi / peran', 'Share / role'],
  props: ['Sifat', 'Properties'],
  uses: ['Kegunaan & contoh', 'Uses & examples'],
  sep: ['Cara memisahkan', 'How to separate it'],
  pdb: ['Struktur 3D di Protein Data Bank', '3D structure in the Protein Data Bank'],
  pdbNote: ['Gambar dari RCSB PDB (lisensi CC0).', 'Image from the RCSB PDB (CC0).'],
  refs: ['Sumber', 'Sources'],
  compNote: [
    'Persentase hanya ditulis bila sumber mencantumkannya; komposisi lain dinyatakan dengan kata-kata.',
    'Percentages appear only where the source gives them; other compositions are described in words.',
  ],
  lesson: ['Materi terkait', 'Related lessons'],
});

export const title = route =>
  route.id ? pick(getMaterial(route.id)?.name || ['Material', 'Material']) : s.title;

function compLink(link) {
  if (!link) return null;
  const [kind, id] = link.split(':');
  if (kind === 'e') {
    const e = getElement(id);
    return e ? `<a href="/atom/${e.s}">${esc(pick([e.id, e.en]))} (${esc(e.s)})</a>` : null;
  }
  if (kind === 'm') {
    const m = getMolecule(id);
    return m ? `<a href="/molecule/${m.id}">${esc(pick(m.name))}</a>` : null;
  }
  if (kind === 'i') {
    const i = getIon(id);
    return i ? `<a href="/ion/${i.id}">${esc(pick(i.name))}</a>` : null;
  }
  return null;
}

const wikiURL = title => `https://en.wikipedia.org/wiki/${title}`;
function sourceLink(code) {
  if (code.startsWith('wiki:')) {
    const t = code.slice(5);
    return extLink(wikiURL(t), `Wikipedia: ${decodeURIComponent(t).replace(/_/g, ' ')}`);
  }
  const r = reference(code);
  return r ? extLink(r.url, r.label) : '';
}

const LESSONS = {
  paduan: 'material',
  kaca: 'material',
  keramik: 'material',
  komposit: 'material',
  larutan: 'larutan',
  koloid: 'larutan',
  suspensi: 'larutan',
  heterogen: 'zat',
  biopolimer: 'biomolekul',
};

export function render({ id, main, params }) {
  if (id) return renderMaterial(main, id);
  const state = { q: params.get('q') || '', type: params.get('type') || '' };
  main.innerHTML = `<div class="container">
    ${pageHead({ title: esc(s.title), lead: esc(s.lead) })}
    <form class="filters" role="search" data-filters>
      <div class="field field-grow"><label for="mat-q">${esc(s.search)}</label><input id="mat-q" name="q" type="search" value="${esc(state.q)}" placeholder="${esc(s.placeholder)}" autocomplete="off" /></div>
      <div class="field"><label for="mat-type">${esc(s.type)}</label><select id="mat-type" name="type"><option value="">${esc(s.all)}</option>${Object.entries(
        MATERIAL_TYPES
      )
        .map(([k, t]) => `<option value="${k}">${esc(pick(t.name))}</option>`)
        .join('')}</select></div>
    </form>
    <p class="muted" data-count aria-live="polite"></p>
    <div data-list></div>
  </div>`;
  const form = $('[data-filters]', main);
  form.elements.type.value = state.type;
  const draw = () => {
    const q = normalize(state.q);
    const list = MATERIALS.filter(
      m =>
        (!state.type || m.type === state.type) &&
        (!q || normalize(`${m.name[0]} ${m.name[1]} ${m.id} ${m.pdb || ''}`).includes(q))
    );
    $('[data-count]', main).textContent = fmt(s.count, { n: list.length });
    const groups = Object.entries(MATERIAL_TYPES)
      .map(([k, t]) => [k, t, list.filter(m => m.type === k)])
      .filter(([, , items]) => items.length);
    $('[data-list]', main).innerHTML = groups.length
      ? groups
          .map(
            ([
              k,
              t,
              items,
            ]) => `<section aria-labelledby="mt-${k}"><h2 id="mt-${k}">${icon(t.icon, { size: 20 })} ${esc(pick(t.name))}</h2>
        <p class="muted">${esc(pick(t.def))}</p>
        <div class="grid grid-3">${items
          .map(
            m =>
              `<a class="card topic-card" href="/material/${m.id}"><span class="card-title">${esc(pick(m.name))}</span><span class="card-text">${esc(pick(m.about))}</span><span class="topic-meta">${levelBadge(m.lv)}${m.pdb ? ` <span class="chip">PDB ${esc(m.pdb)}</span>` : ''}</span></a>`
          )
          .join('')}</div></section>`
          )
          .join('')
      : emptyState(s.none);
  };
  const update = debounce(() => {
    state.q = form.elements.q.value;
    state.type = form.elements.type.value;
    replaceQuery(state);
    draw();
  }, 150);
  form.addEventListener('input', update);
  form.addEventListener('submit', e => e.preventDefault());
  draw();
}

function renderMaterial(main, id) {
  const m = getMaterial(id);
  if (!m) {
    main.innerHTML = `<section class="container page-state"><h1>${esc(s.notFound)}</h1><a class="btn" href="/material">${esc(s.title)}</a></section>`;
    return;
  }
  const t = MATERIAL_TYPES[m.type];
  const lesson = LESSONS[m.type];
  main.innerHTML = `<article class="container material-page">
    ${breadcrumbs([
      [s.title, '/material'],
      [pick(t.name), `/material?type=${m.type}`],
      [pick(m.name), ''],
    ])}
    <header class="page-head">
      <p class="eyebrow">${icon(t.icon, { size: 18 })} ${esc(pick(t.name))}</p>
      <h1>${esc(pick(m.name))}</h1>
      <p class="mol-badges">${levelBadge(m.lv)}</p>
      <p class="lead">${esc(pick(m.about))}</p>
    </header>
    <div class="grid grid-2">
      <section class="card"><h2 class="h-small">${esc(s.composition)}</h2>
        <table class="data-table"><thead><tr><th scope="col">${esc(s.component)}</th><th scope="col">${esc(s.share)}</th></tr></thead><tbody>${m.comp
          .map(([link, share]) => {
            const a = compLink(link);
            const label = a || esc(pick(share || ['–', '–']));
            return `<tr><td>${label}</td><td>${a && share ? esc(pick(share)) : a ? '–' : ''}</td></tr>`;
          })
          .join('')}</tbody></table>
        <p class="muted small">${esc(s.compNote)}</p>
      </section>
      ${
        m.pdb
          ? `<figure class="card pdb-figure"><img src="${esc(pdbImage(m.pdb))}" alt="${esc(s.pdb)}: ${esc(m.pdb)}" width="320" height="320" loading="lazy" data-fallback="remove" /><figcaption>${extLink(pdbURL(m.pdb), `${s.pdb}: ${m.pdb}`)}<br><span class="muted small">${esc(s.pdbNote)}</span></figcaption></figure>`
          : `<section class="card"><h2 class="h-small">${esc(pick(t.name))}</h2><p>${esc(pick(t.def))}</p></section>`
      }
    </div>
    <div class="grid grid-2">
      <section class="card"><h2 class="h-small">${icon('gauge', { size: 18 })} ${esc(s.props)}</h2><p>${esc(pick(m.props))}</p></section>
      <section class="card"><h2 class="h-small">${icon('bulb', { size: 18 })} ${esc(s.uses)}</h2><p>${esc(pick(m.uses))}</p></section>
    </div>
    ${m.sep ? `<section class="card"><h2 class="h-small">${icon('filter', { size: 18 })} ${esc(s.sep)}</h2><p>${esc(pick(m.sep))}</p></section>` : ''}
    <section class="mol-section refs"><h2 class="h-small">${esc(s.refs)}</h2><ul class="ref-list">${m.src.map(c => `<li>${sourceLink(c)}</li>`).join('')}</ul>
      ${lesson && findTopic(lesson) ? `<p>${esc(s.lesson)}: <a href="/learn/${lesson}">${esc(pick(findTopic(lesson).title))}</a></p>` : ''}
    </section>
  </article>`;
}
