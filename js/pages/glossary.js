// Glossary: bilingual terms with a simple and a scientific definition, examples and related terms. A term's own
// page also lists the branches of chemistry (knowledge-map domains) and the lessons that use it.
import { $, $$, esc, debounce } from '../core/dom.js';
import { S, pick, atLeast } from '../core/prefs.js';
import { replaceQuery } from '../core/router.js';
import { icon } from '../components/icons.js';
import { pageHead, breadcrumbs, emptyState } from '../components/common.js';
import { GLOSSARY, GLOSSARY_CATS, findTerm } from '../data/glossary.js';
import { domainsOfConcept } from '../data/ontology.js';
import { topicsLinking } from '../data/topics/index.js';
import { getMolecule, normalize } from '../data/curatedMolecules.js';

const s = S({
  title: ['Kamus kimia', 'Chemistry glossary'],
  lead: [
    '{n} istilah kimia dalam dua bahasa, dengan penjelasan sederhana dan ilmiah.',
    '{n} chemistry terms in two languages, with simple and scientific explanations.',
  ],
  find: ['Cari istilah', 'Find a term'],
  cat: ['Kelompok', 'Group'],
  all: ['Semua', 'All'],
  simple: ['Sederhananya', 'In simple words'],
  sci: ['Secara ilmiah', 'Scientifically'],
  examples: ['Contoh molekul', 'Example molecules'],
  see: ['Lihat juga', 'See also'],
  none: ['Istilah tidak ditemukan.', 'No matching terms.'],
  back: ['Semua istilah', 'All terms'],
  domains: ['Cabang kimia', 'Branches of chemistry'],
  lessons: ['Materi yang memakai istilah ini', 'Lessons that use this term'],
  mentioned: ['Disebut juga di istilah', 'Also mentioned by'],
});

export const title = route => (route.id ? pick(findTerm(route.id)?.term || ['Istilah', 'Term']) : s.title);

const termHTML = (g, open = false) => {
  const simpleFirst = !atLeast('sma');
  const simple = `<p><strong>${esc(s.simple)}:</strong> ${esc(pick(g.simple))}</p>`;
  const sci = `<p><strong>${esc(s.sci)}:</strong> ${esc(pick(g.sci))}</p>`;
  const examples = (g.m || []).map(getMolecule).filter(Boolean);
  return `<article class="card term-card ${open ? 'is-open' : ''}" id="term-${g.key}">
    <h2 class="h-small"><a href="/glossary/${g.key}">${esc(pick(g.term))}</a> <span class="muted small" lang="${pick(['en', 'id'])}">${esc(pick([g.term[1], g.term[0]]))}</span></h2>
    ${simpleFirst ? simple + sci : sci + simple}
    ${examples.length ? `<p class="small"><strong>${esc(s.examples)}:</strong> ${examples.map(m => `<a class="chip" href="/molecule/${m.id}">${esc(pick(m.name))}</a>`).join(' ')}</p>` : ''}
    ${
      g.see?.length
        ? `<p class="small"><strong>${esc(s.see)}:</strong> ${g.see
            .map(findTerm)
            .filter(Boolean)
            .map(t => `<a href="/glossary/${t.key}">${esc(pick(t.term))}</a>`)
            .join(', ')}</p>`
        : ''
    }
  </article>`;
};

/** Where a term lives in Kimialoka: knowledge-map domains, lessons and terms that point to it. */
function usesHTML(g) {
  const domains = domainsOfConcept(g.key);
  const lessons = topicsLinking('g', g.key);
  const back = GLOSSARY.filter(t => t.key !== g.key && t.see?.includes(g.key));
  return `${
    domains.length
      ? `<section><h2 class="h-small">${icon('map', { size: 18 })} ${esc(s.domains)}</h2><p class="chip-grid">${domains
          .map(
            d => `<a class="chip" href="/peta/${d.id}">${icon(d.icon, { size: 14 })} ${esc(pick(d.name))}</a>`
          )
          .join(' ')}</p></section>`
      : ''
  }${
    lessons.length
      ? `<section><h2 class="h-small">${icon('book', { size: 18 })} ${esc(s.lessons)}</h2><p class="chip-grid">${lessons
          .map(
            t =>
              `<a class="chip" href="/learn/${t.id}">${icon(t.icon, { size: 14 })} ${esc(pick(t.title))}</a>`
          )
          .join(' ')}</p></section>`
      : ''
  }${
    back.length
      ? `<section><h2 class="h-small">${esc(s.mentioned)}</h2><p class="chip-grid">${back
          .map(t => `<a class="chip" href="/glossary/${t.key}">${esc(pick(t.term))}</a>`)
          .join(' ')}</p></section>`
      : ''
  }`;
}

export function render({ id, main, params }) {
  if (id) {
    const g = findTerm(id);
    main.innerHTML = `<div class="container narrow">
      ${breadcrumbs([
        [s.title, '/glossary'],
        [g ? pick(g.term) : id, ''],
      ])}
      ${g ? `<h1>${esc(pick(g.term))}</h1>${termHTML(g, true)}${usesHTML(g)}` : emptyState(s.none)}
      <p><a class="btn" href="/glossary">${esc(s.back)}</a></p>
    </div>`;
    return;
  }
  let q = params.get('q') || '';
  let cat = params.get('cat') || '';
  main.innerHTML = `<div class="container">
    ${pageHead({ title: esc(s.title), lead: esc(s.lead.replace('{n}', GLOSSARY.length)) })}
    <div class="filters">
      <div class="field field-grow"><label for="g-q">${esc(s.find)}</label><input id="g-q" type="search" value="${esc(q)}" autocomplete="off" /></div>
      <div class="field"><label for="g-cat">${esc(s.cat)}</label><select id="g-cat"><option value="">${esc(s.all)}</option>${Object.entries(
        GLOSSARY_CATS
      )
        .map(([k, v]) => `<option value="${k}" ${cat === k ? 'selected' : ''}>${esc(pick(v))}</option>`)
        .join('')}</select></div>
    </div>
    <p class="alpha" aria-hidden="true"></p>
    <div class="grid grid-2" data-terms aria-live="polite"></div>
  </div>`;
  const draw = () => {
    const nq = normalize(q);
    const list = GLOSSARY.filter(
      g =>
        (!cat || g.cat === cat) &&
        (!nq || normalize(`${g.term.join(' ')} ${g.simple.join(' ')}`).includes(nq))
    ).sort((a, b) => normalize(pick(a.term)).localeCompare(normalize(pick(b.term))));
    $('[data-terms]', main).innerHTML = list.length
      ? list.map(g => termHTML(g)).join('')
      : emptyState(s.none);
  };
  const update = debounce(() => {
    q = $('#g-q', main).value;
    cat = $('#g-cat', main).value;
    replaceQuery({ q, cat });
    draw();
  }, 150);
  for (const el of $$('#g-q, #g-cat', main)) el.addEventListener('input', update);
  draw();
}
