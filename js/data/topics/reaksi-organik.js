export default {
  id: 'reaksi-organik',
  icon: 'flask',
  levels: ['smp', 'sma', 'kuliah'],
  title: ['Reaksi organik', 'Organic reactions'],
  summary: [
    'Substitusi, adisi, eliminasi, oksidasi–reduksi, esterifikasi, hidrolisis, penyabunan, dan polimerisasi, sampai mekanisme SN1, SN2, E1, dan E2.',
    'Substitution, addition, elimination, oxidation–reduction, esterification, hydrolysis, saponification and polymerisation, up to SN1, SN2, E1 and E2 mechanisms.',
  ],
  body: {
    sd: [
      `Di dapur banyak terjadi reaksi zat organik:

- **Tapai dan roti**: ragi mengubah gula menjadi alkohol dan gas karbon dioksida. Gasnya membuat adonan roti mengembang ({{r:fermentasi|fermentasi}}).
- **Sabun**: sejak dulu sabun dibuat dengan memasak minyak atau lemak bersama larutan basa kuat ({{r:saponifikasi|penyabunan}}).
- **Plastik**: botol dan kantong plastik dibuat dengan menyambung ribuan molekul kecil menjadi rantai sangat panjang ({{r:polimerisasi-etena|polimerisasi}}).

Reaksi-reaksi ini menghasilkan zat baru dengan sifat yang berbeda dari zat awalnya: minyak yang licin menjadi sabun yang berbusa, gas kecil menjadi plastik yang kuat.`,
      `Many reactions of organic substances happen in the kitchen:

- **Tapai and bread**: yeast turns sugar into alcohol and carbon dioxide gas. The gas makes bread dough rise ({{r:fermentasi|fermentation}}).
- **Soap**: for centuries soap has been made by cooking oil or fat with a strong base solution ({{r:saponifikasi|saponification}}).
- **Plastics**: bottles and bags are made by joining thousands of small molecules into very long chains ({{r:polimerisasi-etena|polymerisation}}).

These reactions make new substances quite unlike the starting ones: slippery oil becomes foamy soap, and a small gas becomes strong plastic.`,
    ],
    smp: [
      `Senyawa organik mengalami reaksi khas menurut gugus fungsinya:

- **Pembakaran**: hidrokarbon dan alkohol terbakar menjadi CO₂ dan air, melepaskan energi ({{r:pembakaran-propana|elpiji}}).
- **Fermentasi**: ragi mengubah glukosa menjadi etanol dan CO₂ tanpa oksigen ({{r:fermentasi|lihat reaksinya}}).
- **[[esterifikasi|Esterifikasi]]**: asam karboksilat + alkohol → ester beraroma buah + air ({{r:esterifikasi-etil-asetat|etil asetat}}).
- **[[saponifikasi|Penyabunan]]**: lemak + basa kuat → gliserol + sabun.
- **[[polimerisasi|Polimerisasi]]**: monomer kecil tersambung menjadi polimer, misalnya etena menjadi {{m:polyethylene|polietilena}}.

Ikatan rangkap pada alkena membuatnya lebih reaktif daripada alkana: alkena dapat menghilangkan warna air bromin ({{r:adisi-bromin|adisi bromin}}), sedangkan alkana tidak.`,
      `Organic compounds undergo typical reactions according to their functional groups:

- **Combustion**: hydrocarbons and alcohols burn to CO₂ and water, releasing energy ({{r:pembakaran-propana|LPG}}).
- **Fermentation**: yeast turns glucose into ethanol and CO₂ without oxygen ({{r:fermentasi|see the reaction}}).
- **[[esterifikasi|Esterification]]**: carboxylic acid + alcohol → fruity ester + water ({{r:esterifikasi-etil-asetat|ethyl acetate}}).
- **[[saponifikasi|Saponification]]**: fat + strong base → glycerol + soap.
- **[[polimerisasi|Polymerisation]]**: small monomers join into polymers, such as ethene into {{m:polyethylene|polyethylene}}.

The double bond makes alkenes more reactive than alkanes: alkenes decolourise bromine water ({{r:adisi-bromin|bromine addition}}), alkanes do not.`,
    ],
    sma: [
      `Jenis-jenis reaksi organik:

1. **[[substitusi|Substitusi]]**: satu atom/gugus diganti. Alkana + halogen dengan cahaya UV: {{r:klorinasi-metana|CH₄ + Cl₂ → CH₃Cl + HCl}}. Haloalkana + OH⁻ → alkohol ({{r:sn2-bromometana|SN2}}).
2. **[[adisi|Adisi]]**: ikatan rangkap terbuka. {{r:hidrogenasi-etena|Hidrogenasi}} (H₂, katalis Ni), {{r:adisi-bromin|halogenasi}}, {{r:hidrasi-etena|hidrasi}} (H₂O, katalis asam), dan adisi HX. Pada alkena tidak simetris berlaku aturan Markovnikov: H masuk ke karbon yang sudah memiliki H lebih banyak.
3. **[[eliminasi|Eliminasi]]**: molekul kecil dilepas sehingga terbentuk ikatan rangkap. {{r:dehidrasi-etanol|Dehidrasi etanol}} dengan H₂SO₄ pekat sekitar 170 °C; {{r:eliminasi-bromoetana|dehidrohalogenasi}} dengan KOH dalam etanol.
4. **[[oksidasi-reduksi-organik|Oksidasi–reduksi]]**: pada [[oksidasi-alkohol|oksidasi alkohol]], alkohol primer → aldehida → asam karboksilat; alkohol sekunder → keton; alkohol tersier sukar dioksidasi. Oksidatornya antara lain K₂Cr₂O₇ atau KMnO₄ dalam asam ({{r:uji-napas-dikromat|contoh}}). Reduksi membalik arah ini ({{r:reduksi-asetaldehida|contoh}}).
5. **Esterifikasi dan [[hidrolisis]]**: bolak-balik dengan katalis asam; hidrolisis dengan basa kuat (penyabunan) berlangsung sampai habis karena asamnya berubah menjadi garam.
6. **Polimerisasi**: adisi (monomer ber-C=C: polietilena, PVC) dan kondensasi (melepas H₂O: {{r:polimerisasi-nilon|nilon-6,6}}, PET, protein).

Untuk menentukan jenis reaksi, bandingkan struktur pereaksi dan produk: apakah ada atom yang diganti (substitusi), ditambahkan pada ikatan rangkap (adisi), atau dilepas membentuk ikatan rangkap (eliminasi)? Semua contoh setara dan dapat dibuka di {{page:reaction|pustaka reaksi}}.`,
      `Types of organic reaction:

1. **[[substitusi|Substitution]]**: an atom or group is replaced. Alkane + halogen in UV light: {{r:klorinasi-metana|CH₄ + Cl₂ → CH₃Cl + HCl}}. Haloalkane + OH⁻ → alcohol ({{r:sn2-bromometana|SN2}}).
2. **[[adisi|Addition]]**: a multiple bond opens. {{r:hidrogenasi-etena|Hydrogenation}} (H₂, Ni catalyst), {{r:adisi-bromin|halogenation}}, {{r:hidrasi-etena|hydration}} (H₂O, acid catalyst) and HX addition. For unsymmetrical alkenes Markovnikov’s rule applies: H adds to the carbon already carrying more H.
3. **[[eliminasi|Elimination]]**: a small molecule leaves to form a multiple bond. {{r:dehidrasi-etanol|Dehydrating ethanol}} with concentrated H₂SO₄ at about 170 °C; {{r:eliminasi-bromoetana|dehydrohalogenation}} with KOH in ethanol.
4. **[[oksidasi-reduksi-organik|Oxidation–reduction]]**: in the [[oksidasi-alkohol|oxidation of alcohols]], primary alcohol → aldehyde → carboxylic acid; secondary alcohol → ketone; tertiary alcohols resist oxidation. Oxidants include K₂Cr₂O₇ or KMnO₄ in acid ({{r:uji-napas-dikromat|example}}). Reduction reverses this ({{r:reduksi-asetaldehida|example}}).
5. **Esterification and [[hidrolisis|hydrolysis]]**: reversible with an acid catalyst; hydrolysis with a strong base (saponification) goes to completion because the acid becomes a salt.
6. **Polymerisation**: addition (C=C monomers: polyethylene, PVC) and condensation (releasing H₂O: {{r:polimerisasi-nilon|nylon-6,6}}, PET, proteins).

To classify a reaction, compare reactants and products: was an atom replaced (substitution), added across a multiple bond (addition), or removed to form one (elimination)? Every example is balanced and can be opened in the {{page:reaction|reaction library}}.`,
    ],
    kuliah: [
      `**Mekanisme** menjelaskan bagaimana elektron bergerak (panah lengkung dari pasangan elektron ke atom yang menerimanya):

- **SN2**: satu tahap serempak; nukleofil menyerang dari sisi belakang, konfigurasi terbalik (inversi Walden); laju = k[substrat][nukleofil]; cepat untuk metil dan primer, terhambat sterik pada tersier.
- **SN1**: dua tahap melalui karbokation; laju = k[substrat]; disukai substrat tersier dan pelarut protik; menghasilkan campuran rasemik dan dapat disertai penataan ulang karbokation.
- **E2**: basa kuat menarik H-β bersamaan dengan lepasnya gugus pergi (geometri anti-periplanar); **E1** melalui karbokation. Produk utama biasanya alkena lebih tersubstitusi (aturan Zaitsev).
- **Adisi elektrofilik** pada alkena melalui karbokation paling stabil (asal aturan Markovnikov); **substitusi elektrofilik aromatik** melalui ion arenium, dengan pengarah orto/para (–OH, –CH₃) dan meta (–NO₂, –COOH).
- **Adisi nukleofilik** pada karbonil aldehida/keton dan **substitusi asil nukleofilik** pada turunan asam (melalui zat antara tetrahedral).
- **Reaksi radikal**: inisiasi (Cl₂ → 2Cl· oleh cahaya), propagasi, dan terminasi.

Pemilihan kondisi (suhu, pelarut, kekuatan basa/nukleofil) menentukan persaingan substitusi dan eliminasi, serta kendali kinetik lawan termodinamik. Dalam sintesis, analisis retrosintesis memecah molekul target menjadi prekursor sederhana. Metrik [[kimia-hijau|kimia hijau]] menilai reaksi: adisi memiliki ekonomi atom 100%, sedangkan substitusi dan eliminasi selalu menghasilkan produk samping.`,
      `**Mechanisms** show how electrons move (curved arrows from an electron pair to the atom receiving it):

- **SN2**: one concerted step; the nucleophile attacks from the back, inverting the configuration (Walden inversion); rate = k[substrate][nucleophile]; fast for methyl and primary, sterically blocked for tertiary.
- **SN1**: two steps via a carbocation; rate = k[substrate]; favoured by tertiary substrates and protic solvents; gives racemic mixtures and can involve carbocation rearrangements.
- **E2**: a strong base removes a β-H as the leaving group departs (anti-periplanar geometry); **E1** goes via a carbocation. The main product is usually the more substituted alkene (Zaitsev’s rule).
- **Electrophilic addition** to alkenes goes via the most stable carbocation (the origin of Markovnikov’s rule); **electrophilic aromatic substitution** via an arenium ion, with ortho/para directors (–OH, –CH₃) and meta directors (–NO₂, –COOH).
- **Nucleophilic addition** to aldehyde/ketone carbonyls and **nucleophilic acyl substitution** in acid derivatives (via a tetrahedral intermediate).
- **Radical reactions**: initiation (Cl₂ → 2Cl· by light), propagation and termination.

Conditions (temperature, solvent, base/nucleophile strength) decide the contest between substitution and elimination, and kinetic versus thermodynamic control. In synthesis, retrosynthetic analysis breaks a target into simpler precursors. [[kimia-hijau|Green chemistry]] metrics judge reactions: additions have 100% atom economy, while substitutions and eliminations always make by-products.`,
    ],
  },
  points: [
    ['Substitusi mengganti, adisi menambah pada ikatan rangkap, eliminasi melepas dan membentuk ikatan rangkap.', 'Substitution replaces, addition adds across a multiple bond, elimination removes to form one.'],
    ['Alkohol primer → aldehida → asam karboksilat; alkohol sekunder → keton.', 'Primary alcohol → aldehyde → carboxylic acid; secondary alcohol → ketone.'],
    ['Esterifikasi dan hidrolisis ester adalah reaksi bolak-balik; penyabunan berjalan sempurna.', 'Esterification and ester hydrolysis are reversible; saponification goes to completion.'],
    ['Polimerisasi adisi dari monomer C=C; kondensasi melepas molekul kecil.', 'Addition polymerisation uses C=C monomers; condensation releases a small molecule.'],
    ['SN2: satu tahap, inversi; SN1: melalui karbokation, rasemik.', 'SN2: one step, inversion; SN1: via a carbocation, racemic.'],
  ],
  molecules: ['methane', 'ethylene', 'ethanol', 'acetaldehyde', 'acetic-acid', 'ethyl-acetate', 'polyethylene', 'nylon-66'],
  labs: ['rakit'],
  activity: {
    sd: ['Buat adonan roti sederhana dengan dan tanpa ragi. Bandingkan setelah satu jam dan ceritakan dari mana gelembung gasnya.', 'Make simple bread dough with and without yeast. Compare after an hour and explain where the gas bubbles come from.'],
    smp: ['Kelompokkan 10 reaksi di pustaka reaksi Kimialoka menjadi pembakaran, fermentasi, esterifikasi, penyabunan, dan polimerisasi.', 'Sort 10 reactions from the Kimialoka reaction library into combustion, fermentation, esterification, saponification and polymerisation.'],
    sma: ['Buat peta reaksi yang menghubungkan etena, etanol, etanal, asam etanoat, etil etanoat, dan kloroetana; tulis jenis reaksi dan pereaksi di setiap panah.', 'Draw a reaction map linking ethene, ethanol, ethanal, ethanoic acid, ethyl ethanoate and chloroethane, writing the reaction type and reagent on every arrow.'],
    kuliah: ['Gambarkan mekanisme lengkap (panah lengkung) untuk reaksi SN1 t-butil bromida dengan air dan SN2 bromometana dengan OH⁻, lalu bandingkan hukum laju dan stereokimianya.', 'Draw full curved-arrow mechanisms for the SN1 reaction of t-butyl bromide with water and the SN2 reaction of bromomethane with OH⁻, and compare their rate laws and stereochemistry.'],
  },
  quiz: [
    { lv: 'sd', q: ["Sabun dibuat dengan memasak minyak atau lemak bersama…", "Soap is made by cooking oil or fat with…"], options: [["Basa kuat", "A strong base"], ["Gula", "Sugar"], ["Pasir", "Sand"], ["Air dingin saja", "Cold water only"]], answer: 0, explain: ["Penyabunan: lemak + basa kuat → sabun + gliserol.", "Saponification: fat + strong base → soap + glycerol."] },
    { lv: 'sd', q: ["Adonan roti mengembang karena ragi menghasilkan…", "Bread dough rises because yeast makes…"], options: [["Gas karbon dioksida", "Carbon dioxide gas"], ["Garam", "Salt"], ["Minyak", "Oil"], ["Air", "Water"]], answer: 0, explain: ["Fermentasi gula oleh ragi menghasilkan CO₂.", "Yeast fermenting sugar gives CO₂."] },
    { lv: 'smp', q: ['Ragi mengubah gula menjadi…', 'Yeast turns sugar into…'], options: [['Minyak', 'Oil'], ['Alkohol dan CO₂', 'Alcohol and CO₂'], ['Garam', 'Salt'], ['Protein', 'Protein']], answer: 1, explain: ['Fermentasi: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂.', 'Fermentation: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂.'] },
    { lv: 'smp', q: ['Reaksi lemak dengan basa kuat menghasilkan…', 'Fat reacting with a strong base makes…'], options: [['Sabun dan gliserol', 'Soap and glycerol'], ['Plastik', 'Plastic'], ['Gula', 'Sugar'], ['Ester', 'An ester']], answer: 0, explain: ['Penyabunan (saponifikasi).', 'Saponification.'] },
    { lv: 'smp', q: ['Senyawa yang menghilangkan warna air bromin adalah…', 'Which decolourises bromine water?'], options: [['Etana', 'Ethane'], ['Etena', 'Ethene'], ['Metana', 'Methane'], ['Air', 'Water']], answer: 1, explain: ['Etena memiliki ikatan rangkap C=C yang mengadisi bromin.', 'Ethene’s C=C double bond adds bromine.'] },
    { lv: 'sma', q: ['CH₂=CH₂ + H₂ → CH₃CH₃ termasuk reaksi…', 'CH₂=CH₂ + H₂ → CH₃CH₃ is…'], options: [['Substitusi', 'Substitution'], ['Adisi', 'Addition'], ['Eliminasi', 'Elimination'], ['Esterifikasi', 'Esterification']], answer: 1, explain: ['Hidrogen menempel pada ikatan rangkap: adisi (hidrogenasi).', 'Hydrogen adds across the double bond: addition (hydrogenation).'] },
    { lv: 'sma', q: ['Dehidrasi etanol menjadi etena termasuk reaksi…', 'Dehydrating ethanol to ethene is…'], options: [['Adisi', 'Addition'], ['Eliminasi', 'Elimination'], ['Substitusi', 'Substitution'], ['Polimerisasi', 'Polymerisation']], answer: 1, explain: ['Air dilepas dan terbentuk ikatan rangkap.', 'Water leaves and a double bond forms.'] },
    { lv: 'sma', q: ['Oksidasi alkohol sekunder menghasilkan…', 'Oxidising a secondary alcohol gives…'], options: [['Aldehida', 'An aldehyde'], ['Keton', 'A ketone'], ['Asam karboksilat', 'A carboxylic acid'], ['Eter', 'An ether']], answer: 1, explain: ['Misalnya propan-2-ol → propanon.', 'For example propan-2-ol → propanone.'] },
    { lv: 'sma', q: ['Menurut aturan Markovnikov, adisi HBr pada propena menghasilkan terutama…', 'By Markovnikov’s rule, HBr adds to propene mainly to give…'], options: [['1-bromopropana', '1-bromopropane'], ['2-bromopropana', '2-bromopropane'], ['Propana', 'Propane'], ['Propanol', 'Propanol']], answer: 1, explain: ['H masuk ke C yang memiliki H lebih banyak, Br ke C tengah.', 'H goes to the carbon with more H; Br to the middle carbon.'] },
    { lv: 'sma', q: ['Nilon-6,6 terbentuk melalui polimerisasi…', 'Nylon-6,6 forms by…'], options: [['Adisi', 'Addition polymerisation'], ['Kondensasi', 'Condensation polymerisation'], ['Radikal', 'Radical polymerisation'], ['Substitusi', 'Substitution']], answer: 1, explain: ['Setiap ikatan amida yang terbentuk melepaskan satu molekul air.', 'Each amide bond formed releases a water molecule.'] },
    { lv: 'kuliah', q: ['Laju reaksi SN1 bergantung pada…', 'The rate of an SN1 reaction depends on…'], options: [['Konsentrasi substrat saja', 'The substrate concentration only'], ['Konsentrasi nukleofil saja', 'The nucleophile only'], ['Keduanya', 'Both'], ['Tidak keduanya', 'Neither']], answer: 0, explain: ['Tahap penentu laju adalah pembentukan karbokation dari substrat.', 'The rate-determining step is carbocation formation from the substrate.'] },
    { lv: 'kuliah', q: ['Gugus –NO₂ pada substitusi elektrofilik aromatik bersifat…', 'In electrophilic aromatic substitution, –NO₂ is…'], options: [['Pengarah orto/para dan pengaktif', 'An activating ortho/para director'], ['Pengarah meta dan penonaktif', 'A deactivating meta director'], ['Tidak berpengaruh', 'Without effect'], ['Pengarah para saja', 'A para-only director']], answer: 1, explain: ['Gugus penarik elektron menonaktifkan cincin dan mengarahkan ke posisi meta.', 'Electron-withdrawing groups deactivate the ring and direct meta.'] },
    { lv: 'kuliah', q: ['Ekonomi atom 100% dimiliki reaksi…', '100% atom economy belongs to…'], options: [['Adisi', 'Additions'], ['Substitusi', 'Substitutions'], ['Eliminasi', 'Eliminations'], ['Pembakaran', 'Combustions']], answer: 0, explain: ['Semua atom pereaksi masuk ke dalam produk.', 'Every reactant atom ends up in the product.'] },
  ],
  teacher: {
    cp: ['Fase D–F: peserta didik mengelompokkan dan meramalkan reaksi senyawa organik serta mengaitkannya dengan produk sehari-hari dan industri.', 'Phases D–F: learners classify and predict organic reactions and link them to everyday and industrial products.'],
    goals: [
      ['Membedakan substitusi, adisi, eliminasi, oksidasi–reduksi, dan kondensasi.', 'Distinguish substitution, addition, elimination, oxidation–reduction and condensation.'],
      ['Meramalkan produk reaksi alkena, alkohol, dan asam karboksilat.', 'Predict the products of alkene, alcohol and carboxylic-acid reactions.'],
      ['Menjelaskan mekanisme SN1/SN2 dan E1/E2 (kuliah).', 'Explain SN1/SN2 and E1/E2 mechanisms (university).'],
    ],
    duration: ['4 × 45 menit', '4 × 45 min'],
    steps: [
      ['Pemantik: sabun, roti, dan plastik — dari mana asalnya?', 'Hook: soap, bread and plastic — where do they come from?'],
      ['Praktikum esterifikasi (aroma) atau penyabunan skala kecil dengan pengawasan.', 'Supervised small-scale esterification (smells) or saponification practical.'],
      ['Membuat peta reaksi organik berkelompok.', 'Group work on an organic reaction map.'],
      ['Latihan mengenali jenis reaksi di pustaka reaksi Kimialoka.', 'Practice classifying reactions in the Kimialoka reaction library.'],
    ],
    misconceptions: [
      ['"Adisi dan substitusi sama saja karena ada atom yang masuk." Pada adisi tidak ada atom yang keluar.', '"Addition and substitution are the same because atoms come in." In addition nothing leaves.'],
      ['"Semua alkohol dapat dioksidasi menjadi asam." Alkohol sekunder menjadi keton; tersier sukar dioksidasi.', '"All alcohols oxidise to acids." Secondary alcohols give ketones; tertiary ones resist oxidation.'],
      ['"Katalis ikut habis dalam esterifikasi." Asam sulfat pekat hanya katalis dan penarik air.', '"The catalyst is used up in esterification." Concentrated sulfuric acid is only a catalyst and drying agent.'],
    ],
    assessment: ['Kuis Kimialoka, peta reaksi, dan laporan praktikum esterifikasi atau penyabunan.', 'The Kimialoka quiz, a reaction map and an esterification or saponification report.'],
  },
  refs: ['20-1-hydrocarbons', 'oc:6-1-kinds-of-organic-reactions', 'oc:7-8-orientation-of-electrophilic-additions-markovnikovs-rule', 'oc:11-2-the-sn2-reaction', 'oc:11-4-the-sn1-reaction', 'oc:11-7-elimination-reactions-zaitsevs-rule', 'oc:17-7-oxidation-of-alcohols', 'oc:31-1-chain-growth-polymers'],
};
