// Classes of matter: the family tree and each class with its definition, members and more from PubChem.
import { $, esc } from '../core/dom.js';
import { S, pick, fmt, atLeast } from '../core/prefs.js';
import { icon } from '../components/icons.js';
import { pageHead, breadcrumbs, loading, notice, levelBadge } from '../components/common.js';
import { moleculeCard, liveCard, classCard } from '../components/cards.js';
import { CLASSES, getClass, rootClasses, childClasses, classPath } from '../data/classes.js';
import { MOLECULES, moleculesInClass } from '../data/curatedMolecules.js';
import { moleculeIndex, classMembers } from '../services/data.js';
import { cidsBySmarts, summaries } from '../services/pubchem.js';

const s = S({
  title: ['Golongan materi', 'Classes of matter'],
  lead: [
    'Setiap zat punya keluarga. Telusuri pohon golongan dari unsur hingga material, lalu buka setiap golongan untuk definisi, ciri, tata nama, dan anggotanya.',
    'Every substance has a family. Follow the tree from elements to materials, then open a class for its definition, features, naming and members.',
  ],
  tree: ['Pohon golongan', 'Class tree'],
  general: ['Rumus/pola umum', 'General formula'],
  features: ['Ciri khas', 'Key features'],
  naming: ['Tata nama', 'Naming'],
  subclasses: ['Golongan di dalamnya', 'Classes inside'],
  members: ['Anggota di katalog Alchemist', 'Members in the Alchemist catalogue'],
  more: ['Anggota lain dari PubChem', 'More members from PubChem'],
  moreLead: [
    'Senyawa nyata dengan gugus/struktur golongan ini, dicari di PubChem dengan pola SMARTS {smarts}.',
    'Real compounds with this class’s group, found in PubChem with the SMARTS pattern {smarts}.',
  ],
  loadMore: ['Muat lebih banyak dari PubChem', 'Load more from PubChem'],
  none: ['Belum ada molekul di katalog.', 'No catalogue molecules yet.'],
  count: ['{n} molekul', '{n} molecules'],
  notFound: ['Golongan tidak ditemukan.', 'Class not found.'],
  intro: ['Diperkenalkan mulai', 'Introduced from'],
});

export const title = route => (route.id ? pick(getClass(route.id)?.name || ['Golongan', 'Class']) : s.title);

const countOf = id => {
  const ids = new Set([id, ...CLASSES.filter(c => c.parent === id).map(c => c.id)]);
  return MOLECULES.filter(m => m.cls.some(k => ids.has(k))).length;
};

export async function render({ id, main, isCurrent }) {
  if (!id) return renderTree(main);
  const c = getClass(id);
  if (!c) {
    main.innerHTML = `<section class="container page-state"><h1>${esc(s.notFound)}</h1><a class="btn" href="/classes">${esc(s.title)}</a></section>`;
    return;
  }
  const idx = await moleculeIndex();
  const path = classPath(c.id);
  const kids = childClasses(c.id);
  const members = moleculesInClass(c.id);
  const kidMembers = kids.length
    ? MOLECULES.filter(m => m.cls.some(k => kids.some(kid => kid.id === k)) && !members.includes(m))
    : [];

  main.innerHTML = `<div class="container">
    ${breadcrumbs([[s.title, '/classes'], ...path.slice(0, -1).map(p => [pick(p.name), `/classes/${p.id}`]), [pick(c.name), '']])}
    <header class="page-head class-head" style="--accent:${c.color}">
      <p class="eyebrow">${icon(c.icon, { size: 18 })} ${path.length > 1 ? esc(pick(path[0].name)) : esc(s.title)}</p>
      <h1>${esc(pick(c.name))}</h1>
      <p class="lead">${esc(pick(c.def))}</p>
      <p>${esc(s.intro)} ${levelBadge(c.level)}</p>
    </header>
    <div class="grid grid-3 class-facts">
      ${c.general ? `<div class="card"><h2 class="h-small">${esc(s.general)}</h2><p class="formula formula-lg">${esc(c.general)}</p></div>` : ''}
      ${c.feat ? `<div class="card"><h2 class="h-small">${esc(s.features)}</h2><p>${esc(pick(c.feat))}</p></div>` : ''}
      ${c.naming && atLeast('smp') ? `<div class="card"><h2 class="h-small">${esc(s.naming)}</h2><p>${esc(pick(c.naming))}</p></div>` : ''}
    </div>
    ${kids.length ? `<section><h2>${esc(s.subclasses)}</h2><div class="grid grid-classes">${kids.map(k => classCard(k, countOf(k.id))).join('')}</div></section>` : ''}
    <section>
      <div class="section-head"><h2>${esc(s.members)}</h2><p class="muted">${esc(fmt(s.count, { n: members.length + kidMembers.length }))}</p></div>
      ${
        members.length + kidMembers.length
          ? `<div class="grid grid-cards">${[...members, ...kidMembers].map(m => moleculeCard(m, idx.get(m.id))).join('')}</div>`
          : `<p class="muted">${esc(s.none)}</p>`
      }
    </section>
    ${c.smarts ? `<section data-more-members><h2>${icon('globe', { size: 20 })} ${esc(s.more)}</h2><p class="muted">${esc(fmt(s.moreLead, { smarts: c.smarts }))}</p><div data-members>${loading()}</div></section>` : ''}
  </div>`;

  if (!c.smarts) return;
  const box = $('[data-members]', main);
  const snapshot = (await classMembers())[c.id] || [];
  if (!isCurrent()) return;
  const shown = new Set(snapshot.map(r => r.cid));
  box.innerHTML = `${snapshot.length ? `<div class="grid grid-cards" data-list>${snapshot.map(r => liveCard(r)).join('')}</div>` : '<div class="grid grid-cards" data-list></div>'}
    <div class="center"><button class="btn" type="button" data-load>${icon('download', { size: 16 })} ${esc(s.loadMore)}</button></div>`;
  let max = 60;
  $('[data-load]', main).addEventListener('click', async e => {
    const btn = e.currentTarget;
    btn.disabled = true;
    max += 60;
    try {
      const known = new Set(MOLECULES.map(m => m.cid));
      const cids = (await cidsBySmarts(c.smarts, max))
        .filter(x => !known.has(x) && !shown.has(x))
        .slice(0, 24);
      const rows = await summaries(cids);
      rows.forEach(r => shown.add(r.cid));
      if (isCurrent())
        $('[data-list]', main).insertAdjacentHTML('beforeend', rows.map(r => liveCard(r)).join(''));
    } catch {
      if (isCurrent())
        box.insertAdjacentHTML(
          'beforeend',
          notice(pick(['PubChem tidak dapat dihubungi.', 'PubChem could not be reached.']), 'warn')
        );
    } finally {
      btn.disabled = false;
    }
  });
}

function renderTree(main) {
  main.innerHTML = `<div class="container">
    ${pageHead({ title: esc(s.title), lead: esc(s.lead) })}
    <div class="grid grid-classes">${rootClasses()
      .map(c => classCard(c, countOf(c.id)))
      .join('')}</div>
    <section class="class-tree" aria-labelledby="tree-title">
      <h2 id="tree-title">${esc(s.tree)}</h2>
      <ul class="tree">
        ${rootClasses()
          .map(
            r => `<li><a href="/classes/${r.id}" class="tree-node" style="--accent:${r.color}">${icon(r.icon, { size: 18 })} ${esc(pick(r.name))} <small>${countOf(r.id)}</small></a>
            <ul>${childClasses(r.id)
              .map(
                k =>
                  `<li><a href="/classes/${k.id}" class="tree-node">${esc(pick(k.name))}${k.general ? ` <code>${esc(k.general)}</code>` : ''} <small>${moleculesInClass(k.id).length}</small></a></li>`
              )
              .join('')}</ul></li>`
          )
          .join('')}
      </ul>
    </section>
  </div>`;
}
