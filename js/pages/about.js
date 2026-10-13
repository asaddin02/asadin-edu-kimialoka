// About: purpose, official data sources and licences, privacy, offline download and credits.
import { $, esc, toast } from '../core/dom.js';
import { S, pick, fmt } from '../core/prefs.js';
import { icon } from '../components/icons.js';
import { pageHead, extLink } from '../components/common.js';
import { CONFIG } from '../config.js';
import { MOLECULES } from '../data/curatedMolecules.js';
import { GLOSSARY } from '../data/glossary.js';
import { TOPICS } from '../data/topics/index.js';
import { LABS } from '../data/curriculum.js';
import { DOMAINS } from '../data/ontology.js';
import { IONS } from '../data/ions.js';
import { ALL_REACTIONS } from '../data/reactionLibrary.js';
import { MATERIALS } from '../data/materials.js';
import { allDataFiles } from '../services/data.js';

const s = S({
  title: ['Tentang Kimialoka', 'About Kimialoka'],
  lead: [
    'Kimialoka adalah ensiklopedia kimia interaktif dan platform belajar yang terbuka untuk pelajar SD sampai mahasiswa serta guru: dari materi, partikel, atom, dan unsur sampai molekul, material, reaksi, dan cabang-cabang ilmu kimia. Bagian dari ekosistem Asadin Edu bersama Biotaloka.',
    'Kimialoka is an open interactive chemistry encyclopedia and learning platform for learners from primary school to university and their teachers: from matter, particles, atoms and elements to molecules, materials, reactions and the branches of chemistry. Part of the Asadin Edu family alongside Biotaloka.',
  ],
  what: ['Apa isinya?', 'What is inside?'],
  whatList: [
    [
      'Peta kimia: dari materi sampai transformasi, dengan {d} cabang kimia dan setiap konsepnya.',
      '{m} kartu molekul, mineral, dan material yang ditulis untuk pelajar, dengan struktur 3D, foto, dan data PubChem.',
      'Tabel periodik 118 unsur dengan berat atom standar IUPAC, isotop, sejarah, kegunaan, dan bahaya dari lembaga rujukan; penjelajah isotop dengan semua nuklida yang dikenal.',
      '{i} ion, {r} reaksi setara, dan {x} material & campuran yang saling tertaut.',
      'Pencarian terpadu, termasuk ke lebih dari 100 juta senyawa PubChem dengan nama, rumus, CAS, CID, SMILES, InChI, atau InChIKey.',
      '{t} materi empat lapis untuk SD–kuliah dengan rujukan OpenStax, {l} laboratorium virtual, kuis, dan kamus {g} istilah.',
      'Ruang guru: modul ajar, lembar kerja, kartu flash, dan tautan tugas.',
    ],
    [
      'A chemistry map from matter to transformation, with {d} branches of chemistry and all their concepts.',
      '{m} learner-friendly cards for molecules, minerals and materials, with 3D structures, photos and PubChem data.',
      'A 118-element periodic table with IUPAC standard atomic weights, isotopes, history, uses and hazards from reference institutions; an isotope explorer with every known nuclide.',
      '{i} ions, {r} balanced reactions and {x} materials & mixtures, all linked to each other.',
      'Unified search, including more than 100 million PubChem compounds by name, formula, CAS, CID, SMILES, InChI or InChIKey.',
      '{t} four-layer lessons for primary to university with OpenStax references, {l} virtual labs, quizzes and a {g}-term glossary.',
      'A teacher room: lesson plans, worksheets, flashcards and assignment links.',
    ],
  ],
  sources: ['Sumber data resmi dan gratis', 'Official, free data sources'],
  pubchem: [
    'PubChem (National Library of Medicine, NIH, AS): sifat terhitung, struktur 2D/3D, data eksperimen, klasifikasi GHS, kegunaan, sinonim, dan tabel periodik. Data PubChem umumnya domain publik; data dari tiap penyumbang mengikuti ketentuan sumbernya yang dicantumkan.',
    'PubChem (US National Library of Medicine, NIH): computed properties, 2D/3D structures, experimental data, GHS classification, uses, synonyms and the periodic table. PubChem data are largely public domain; contributed data follow the terms of the credited source.',
  ],
  wikidata: [
    'Wikidata (CC0): penghubung antara PubChem, nama bahasa Indonesia, artikel Wikipedia, dan foto.',
    'Wikidata (CC0): links PubChem, Indonesian names, Wikipedia articles and photos.',
  ],
  wikipedia: [
    'Wikipedia bahasa Indonesia dan Inggris (CC BY-SA 4.0): bagian pembuka artikel, selalu ditampilkan dengan tautan ke artikelnya.',
    'Indonesian and English Wikipedia (CC BY-SA 4.0): article leads, always shown with a link to the article.',
  ],
  commons: [
    'Wikimedia Commons: foto zat dan unsur dengan nama pembuat dan lisensi masing-masing.',
    'Wikimedia Commons: photos of substances and elements with each author and licence.',
  ],
  reference: [
    'Lembaga rujukan unsur dan isotop (lewat PubChem): IUPAC CIAAW (berat atom standar, kelimpahan isotop), IAEA Atomic Mass Data Center (nuklida, waktu paruh, peluruhan), NIST, Los Alamos National Laboratory dan Jefferson Lab (sejarah, kegunaan, kelimpahan), serta IUPAC Periodic Table of the Elements and Isotopes (pemakaian isotop; CC BY-NC-ND 4.0, ditampilkan tanpa diubah).',
    'Reference institutions for elements and isotopes (via PubChem): IUPAC CIAAW (standard atomic weights, isotopic abundances), the IAEA Atomic Mass Data Center (nuclides, half-lives, decay), NIST, Los Alamos National Laboratory and Jefferson Lab (history, uses, abundance), and the IUPAC Periodic Table of the Elements and Isotopes (isotope uses; CC BY-NC-ND 4.0, shown unmodified).',
  ],
  openstax: [
    'OpenStax Chemistry 2e, Organic Chemistry, dan Biology 2e (CC BY 4.0): rujukan bacaan untuk setiap materi, reaksi, ion, dan cabang kimia. RCSB Protein Data Bank: struktur makromolekul hayati.',
    'OpenStax Chemistry 2e, Organic Chemistry and Biology 2e (CC BY 4.0): reading references for every lesson, reaction, ion and branch. RCSB Protein Data Bank: structures of biological macromolecules.',
  ],
  how: [
    'Data katalog disinkronkan dari sumber-sumber ini dengan skrip terbuka (npm run sync), lalu disimpan agar cepat dan bisa dipakai offline. Senyawa di luar katalog diambil langsung saat dibuka.',
    'Catalogue data are synced from these sources by open scripts (npm run sync) and stored for speed and offline use. Compounds outside the catalogue are fetched live when opened.',
  ],
  privacy: ['Privasi', 'Privacy'],
  privacyText: [
    'Tanpa akun, iklan, cookie pelacak, atau analitik. Simpanan, catatan, dan kemajuan hanya ada di perangkatmu. Saat mencari atau membuka senyawa baru, browser menghubungi PubChem dan Wikimedia secara langsung atau melalui server Kimialoka.',
    'No accounts, ads, tracking cookies or analytics. Bookmarks, notes and progress live only on your device. When you search or open new compounds, your browser contacts PubChem and Wikimedia directly or through the Kimialoka server.',
  ],
  offline: ['Pakai tanpa internet', 'Use offline'],
  offlineText: [
    'Kimialoka adalah aplikasi web progresif (PWA): bisa dipasang di layar utama dan tetap berjalan tanpa internet. Tekan tombol di bawah saat ada Wi-Fi untuk menyimpan seluruh data katalog dan 118 unsur ({n} berkas).',
    'Kimialoka is a progressive web app (PWA): install it on your home screen and it works without internet. Press the button below on Wi-Fi to store all catalogue and element data ({n} files).',
  ],
  offlineBtn: ['Simpan semua untuk offline', 'Save everything for offline'],
  offlineWorking: ['Menyimpan… {done}/{total}', 'Saving… {done}/{total}'],
  offlineDone: ['Selesai. Data katalog siap dipakai offline.', 'Done. Catalogue data is ready offline.'],
  offlineNo: [
    'Fitur ini memerlukan HTTPS atau localhost dan browser yang mendukung service worker.',
    'This needs HTTPS or localhost and a browser with service workers.',
  ],
  limits: ['Batasan', 'Limitations'],
  limitsText: [
    'Kimialoka adalah alat belajar, bukan petunjuk medis, farmasi, atau keselamatan kerja. Data eksperimen dan klasifikasi bahaya berasal dari sumber PubChem apa adanya dan dapat berbeda antarsumber. Selalu ikuti lembar data keselamatan (SDS) dan pengawasan guru di laboratorium.',
    'Kimialoka is a learning tool, not medical, pharmaceutical or workplace-safety advice. Experimental data and hazard classifications come from PubChem sources as published and may differ between sources. Always follow safety data sheets (SDS) and a teacher’s supervision in the lab.',
  ],
  license: ['Lisensi & kode', 'Licence & code'],
  licenseText: [
    'Kode sumber: MIT. Materi belajar (teks kartu, materi, kuis, kamus, ion, reaksi, material, peta): CC BY-SA 4.0. Teks Wikipedia: CC BY-SA 4.0. Teks IUPAC IPTEI: CC BY-NC-ND 4.0. Foto: lisensi masing-masing di Commons.',
    'Source code: MIT. Learning content (cards, lessons, quizzes, glossary, ions, reactions, materials, map): CC BY-SA 4.0. Wikipedia text: CC BY-SA 4.0. IUPAC IPTEI text: CC BY-NC-ND 4.0. Photos: their own Commons licences.',
  ],
  cite: ['Cara mengutip', 'How to cite'],
  family: ['Keluarga Asadin Edu', 'The Asadin Edu family'],
  familyText: [
    'Biotaloka adalah atlas makhluk hidup; Kimialoka adalah ensiklopedia kimia dan dunia materi. Keduanya terbuka, dwibahasa, dan bebas dipakai sekolah.',
    'Biotaloka is the atlas of living things; Kimialoka is the encyclopedia of chemistry and the world of matter. Both are open, bilingual and free for schools.',
  ],
  repo: ['Kode sumber & laporan masalah', 'Source code & issue reports'],
});

export const title = () => s.title;

export function render({ main }) {
  const list = s.whatList.map(x =>
    fmt(x, {
      m: MOLECULES.length,
      t: TOPICS.length,
      l: LABS.length,
      g: GLOSSARY.length,
      d: DOMAINS.length,
      i: IONS.length,
      r: ALL_REACTIONS.length,
      x: MATERIALS.length,
    })
  );
  main.innerHTML = `<div class="container narrow prose">
    ${pageHead({ title: esc(s.title), lead: esc(s.lead) })}
    <h2>${esc(s.what)}</h2><ul>${list.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
    <h2>${esc(s.sources)}</h2>
    <ul class="sources">
      <li>${icon('flask', { size: 18 })} ${esc(s.pubchem)} ${extLink('https://pubchem.ncbi.nlm.nih.gov/', 'pubchem.ncbi.nlm.nih.gov')}</li>
      <li>${icon('link', { size: 18 })} ${esc(s.wikidata)} ${extLink('https://www.wikidata.org/', 'wikidata.org')}</li>
      <li>${icon('book', { size: 18 })} ${esc(s.wikipedia)} ${extLink('https://id.wikipedia.org/', 'id.wikipedia.org')}</li>
      <li>${icon('palette', { size: 18 })} ${esc(s.commons)} ${extLink('https://commons.wikimedia.org/', 'commons.wikimedia.org')}</li>
      <li>${icon('nucleus', { size: 18 })} ${esc(s.reference)} ${extLink('https://www.ciaaw.org/', 'ciaaw.org')} · ${extLink('https://www-nds.iaea.org/amdc/', 'IAEA AMDC')}</li>
      <li>${icon('book', { size: 18 })} ${esc(s.openstax)} ${extLink('https://openstax.org/subjects/science', 'openstax.org')} · ${extLink('https://www.rcsb.org/', 'rcsb.org')}</li>
    </ul>
    <p class="muted">${esc(s.how)}</p>
    <h2>${esc(s.offline)}</h2>
    <p data-offline-text>${esc(s.offlineText.replace('{n}', '…'))}</p>
    <p><button class="btn btn-primary" type="button" data-offline>${icon('download', { size: 16 })} ${esc(s.offlineBtn)}</button></p>
    <p class="muted" data-offline-status aria-live="polite"></p>
    <h2>${esc(s.privacy)}</h2><p>${esc(s.privacyText)}</p>
    <h2>${esc(s.limits)}</h2><p>${esc(s.limitsText)}</p>
    <h2>${esc(s.license)}</h2><p>${esc(s.licenseText)}</p>
    <h2>${esc(s.cite)}</h2><p class="mono">Kimialoka · Asadin Edu (${new Date().getFullYear()}). ${esc(pick(['Ensiklopedia kimia interaktif.', 'Interactive chemistry encyclopedia.']))} ${esc(location.origin)}</p>
    <h2>${esc(s.family)}</h2><p>${esc(s.familyText)}</p>
    <p>${extLink(CONFIG.repository, s.repo)}</p>
  </div>`;

  allDataFiles().then(files => {
    $('[data-offline-text]', main).textContent = s.offlineText.replace('{n}', files.length);
  });
  $('[data-offline]', main).addEventListener('click', async e => {
    const status = $('[data-offline-status]', main);
    if (!('caches' in window) || !navigator.serviceWorker?.controller) {
      status.textContent = s.offlineNo;
      return;
    }
    e.currentTarget.disabled = true;
    const files = await allDataFiles();
    const cache = await caches.open('kimialoka-data-v1');
    let done = 0;
    const queue = [...files];
    await Promise.all(
      Array.from({ length: 6 }, async () => {
        while (queue.length) {
          const path = queue.shift();
          try {
            const res = await fetch(new URL(path, location.origin));
            if (res.ok) await cache.put(new URL(path, location.origin).href, res);
          } catch {}
          done++;
          if (done % 10 === 0 || done === files.length)
            status.textContent = fmt(s.offlineWorking, { done, total: files.length });
        }
      })
    );
    status.textContent = s.offlineDone;
    toast(s.offlineDone);
  });
}
