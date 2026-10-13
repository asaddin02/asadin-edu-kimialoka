export default {
  id: 'lingkungan',
  icon: 'leaf',
  levels: ['sd', 'smp', 'sma', 'kuliah'],
  title: ['Kimia lingkungan dan kimia hijau', 'Environmental and green chemistry'],
  summary: [
    'Udara, air, iklim, plastik, dan pertambangan: kimia di balik masalah lingkungan dan cara kimia hijau menyelesaikannya.',
    'Air, water, climate, plastics and mining: the chemistry behind environmental problems and how green chemistry helps.',
  ],
  body: {
    sd: [
      `Bumi kita dijaga oleh keseimbangan zat di udara, air, dan tanah. Aktivitas manusia bisa mengganggunya:

- Asap kendaraan dan pabrik mengandung {{m:carbon-monoxide|karbon monoksida}} dan gas lain yang membuat udara kotor.
- Terlalu banyak {{m:carbon-dioxide|karbon dioksida}} di udara membuat Bumi makin panas ([[efek-rumah-kaca]]).
- Sampah plastik terbawa ke sungai dan laut, lalu pecah menjadi [[mikroplastik]].

Kita bisa membantu: menanam pohon, menghemat listrik, naik sepeda atau kendaraan umum, membawa tas dan botol minum sendiri, serta memilah sampah organik dan anorganik.`,
      `Our Earth depends on a balance of substances in air, water and soil. People can upset it:

- Vehicle and factory smoke contains {{m:carbon-monoxide|carbon monoxide}} and other gases that dirty the air.
- Too much {{m:carbon-dioxide|carbon dioxide}} makes the Earth hotter (the [[efek-rumah-kaca|greenhouse effect]]).
- Plastic waste washes into rivers and seas and breaks into [[mikroplastik|microplastics]].

We can help: plant trees, save electricity, cycle or take public transport, bring our own bags and bottles, and sort organic and non-organic waste.`,
    ],
    smp: [
      `**Pencemaran udara**: pembakaran menghasilkan CO, {{m:sulfur-dioxide|SO₂}}, {{m:nitrogen-dioxide|NO₂}}, dan partikel halus (PM2,5). SO₂ dan NOₓ bereaksi dengan air membentuk [[hujan-asam]] yang merusak bangunan kapur dan tumbuhan.

**Perubahan iklim**: gas rumah kaca ({{m:carbon-dioxide|CO₂}}, {{m:methane|CH₄}}, {{m:nitrous-oxide|N₂O}}) menyerap panas inframerah. Kadar CO₂ kini lebih dari 420 ppm, tertinggi dalam jutaan tahun.

**Lapisan ozon**: {{m:ozone|ozon}} di stratosfer melindungi dari sinar UV. {{m:cfc-12|CFC}} merusaknya hingga terjadi "lubang ozon"; Protokol Montreal (1987) melarang CFC dan kini lapisan ozon perlahan pulih.

**Pencemaran air dan tanah**: limbah deterjen, pestisida ({{m:ddt|DDT}}), dan logam berat seperti {{m:mercury|raksa}} dari tambang emas ilegal dapat meracuni ikan dan manusia.`,
      `**Air pollution**: burning produces CO, {{m:sulfur-dioxide|SO₂}}, {{m:nitrogen-dioxide|NO₂}} and fine particles (PM2.5). SO₂ and NOₓ react with water to form [[hujan-asam|acid rain]], which damages limestone buildings and plants.

**Climate change**: greenhouse gases ({{m:carbon-dioxide|CO₂}}, {{m:methane|CH₄}}, {{m:nitrous-oxide|N₂O}}) absorb infrared heat. CO₂ is now above 420 ppm, the highest in millions of years.

**The ozone layer**: stratospheric {{m:ozone|ozone}} shields us from UV. {{m:cfc-12|CFCs}} destroyed it, creating the "ozone hole"; the Montreal Protocol (1987) banned CFCs and the layer is slowly recovering.

**Water and soil pollution**: detergent waste, pesticides ({{m:ddt|DDT}}) and heavy metals such as {{m:mercury|mercury}} from illegal gold mining can poison fish and people.`,
    ],
    sma: [
      `Kimia atmosfer: di stratosfer, sinar UV memecah CFC melepaskan radikal Cl· yang mengkatalisis penguraian ozon (Cl· + O₃ → ClO· + O₂; ClO· + O → Cl· + O₂). Satu radikal dapat merusak ribuan molekul O₃. Di permukaan, NO₂ + sinar matahari menghasilkan ozon troposfer dan kabut asap fotokimia.

Siklus karbon: CO₂ larut di laut membentuk {{m:carbonic-acid|asam karbonat}}, menurunkan pH laut (pengasaman laut) sehingga terumbu karang dan kerang sulit membentuk {{m:calcium-carbonate|CaCO₃}}. Indonesia, pusat Segitiga Terumbu Karang dunia, sangat terdampak.

Pengolahan air: koagulasi dengan {{m:potassium-alum|tawas}}, filtrasi, dan disinfeksi dengan {{m:calcium-hypochlorite|kaporit}} atau {{m:ozone|ozon}}. Parameter mutu air meliputi pH, oksigen terlarut (DO), BOD, COD, dan kadar logam.

[[kimia-hijau|Kimia hijau]] (12 prinsip Anastas & Warner) mencegah limbah sejak desain: ekonomi atom tinggi, pelarut aman (air, CO₂ superkritis), katalis alih-alih pereaksi berlebih, bahan terbarukan ({{m:methyl-oleate|biodiesel}}, bioplastik {{m:pla|PLA}}), dan produk yang mudah terurai.`,
      `Atmospheric chemistry: in the stratosphere UV splits CFCs, releasing Cl· radicals that catalyse ozone loss (Cl· + O₃ → ClO· + O₂; ClO· + O → Cl· + O₂). One radical can destroy thousands of O₃ molecules. At ground level NO₂ plus sunlight makes tropospheric ozone and photochemical smog.

The carbon cycle: CO₂ dissolving in the sea forms {{m:carbonic-acid|carbonic acid}}, lowering ocean pH (ocean acidification) so corals and shellfish struggle to build {{m:calcium-carbonate|CaCO₃}}. Indonesia, at the heart of the Coral Triangle, is especially affected.

Water treatment: coagulation with {{m:potassium-alum|alum}}, filtration, and disinfection with {{m:calcium-hypochlorite|pool chlorine}} or {{m:ozone|ozone}}. Water quality is measured by pH, dissolved oxygen (DO), BOD, COD and metal content.

[[kimia-hijau|Green chemistry]] (Anastas & Warner’s 12 principles) prevents waste by design: high atom economy, safer solvents (water, supercritical CO₂), catalysts instead of excess reagents, renewable feedstocks ({{m:methyl-oleate|biodiesel}}, {{m:pla|PLA}} bioplastic) and degradable products.`,
    ],
    kuliah: [
      `Nasib polutan di lingkungan ditentukan sifat fisika-kimianya: koefisien partisi oktanol–air (log Kow, lihat XLogP di halaman molekul), tekanan uap, kelarutan, dan waktu paruh degradasi. Senyawa persisten, bioakumulatif, dan toksik (PBT) seperti {{m:ddt|DDT}} dan metilmerkuri mengalami biomagnifikasi di rantai makanan; karena itu diatur Konvensi Stockholm dan Minamata.

Penilaian daur hidup (LCA) membandingkan dampak produk dari bahan baku sampai limbah. Plastik biodegradabel belum tentu lebih baik bila memerlukan kondisi pengomposan industri. Mikroplastik membawa zat aditif dan menyerap polutan organik.

Teknologi pengurangan emisi meliputi penangkapan dan penyimpanan karbon (CCS), katalis tiga arah kendaraan (CO, NOₓ, hidrokarbon → CO₂, N₂, H₂O), desulfurisasi gas buang (SO₂ + CaCO₃ → CaSO₄), dan hidrogen hijau dari elektrolisis air bertenaga surya.

Bagi Indonesia, isu utama kimia lingkungan antara lain kebakaran lahan gambut (emisi CO₂ dan partikulat), merkuri pada tambang emas skala kecil, limbah smelter nikel, serta pencemaran plastik di laut. Solusi berbasis kimia hijau adalah bidang riset dan karier yang terbuka lebar.`,
      `A pollutant’s fate depends on its physicochemical properties: the octanol–water partition coefficient (log Kow — see XLogP on molecule pages), vapour pressure, solubility and degradation half-life. Persistent, bioaccumulative and toxic (PBT) substances like {{m:ddt|DDT}} and methylmercury biomagnify up food chains, hence the Stockholm and Minamata Conventions.

Life-cycle assessment (LCA) compares a product’s impact from raw material to waste. Biodegradable plastics are not automatically better if they need industrial composting. Microplastics carry additives and absorb organic pollutants.

Emission-reduction technologies include carbon capture and storage (CCS), three-way catalytic converters (CO, NOₓ, hydrocarbons → CO₂, N₂, H₂O), flue-gas desulfurisation (SO₂ + CaCO₃ → CaSO₄) and green hydrogen from solar-powered electrolysis.

In Indonesia key issues include peatland fires (CO₂ and particulates), mercury in small-scale gold mining, nickel-smelter waste and marine plastic pollution. Green-chemistry solutions are a wide-open field for research and careers.`,
    ],
  },
  points: [
    ['Gas rumah kaca utama: CO₂, CH₄, N₂O; kadar CO₂ kini > 420 ppm.', 'Main greenhouse gases: CO₂, CH₄, N₂O; CO₂ is now > 420 ppm.'],
    ['SO₂ dan NOₓ menyebabkan hujan asam; CFC merusak lapisan ozon.', 'SO₂ and NOₓ cause acid rain; CFCs destroy the ozone layer.'],
    ['Kimia hijau mencegah limbah sejak desain proses.', 'Green chemistry prevents waste by design.'],
  ],
  molecules: ['carbon-dioxide', 'methane', 'ozone', 'cfc-12', 'sulfur-dioxide', 'mercury', 'ddt', 'polyethylene', 'pla', 'methyl-oleate'],
  labs: ['ph', 'gas'],
  activity: {
    sd: ['Selama seminggu, catat sampah plastik yang dihasilkan keluargamu. Buat rencana untuk menguranginya.', 'For a week, record the plastic waste your family makes. Plan how to reduce it.'],
    smp: ['Ukur pH air hujan, air sumur, dan air sungai di sekitar sekolah dengan indikator universal; bandingkan hasilnya.', 'Measure the pH of rain, well and river water near school with universal indicator and compare.'],
    sma: ['Rancang penjernih air sederhana (pasir, arang, kerikil, tawas) dan uji kekeruhan sebelum dan sesudah.', 'Design a simple water filter (sand, charcoal, gravel, alum) and test turbidity before and after.'],
    kuliah: ['Bandingkan log Kow dan waktu paruh 5 pestisida dari PubChem; tentukan mana yang paling berpotensi bioakumulasi.', 'Compare log Kow and half-lives of 5 pesticides from PubChem and decide which is most likely to bioaccumulate.'],
  },
  quiz: [
    { lv: 'kuliah', q: ["Singkatan PBT pada zat pencemar berarti…", "For pollutants, PBT stands for…"], options: [["Persisten, bioakumulatif, toksik", "Persistent, bioaccumulative, toxic"], ["Polimer, basa, tiol", "Polymer, base, thiol"], ["Padat, beku, tekanan", "Solid, frozen, pressure"], ["Pestisida, bahan, tanah", "Pesticide, material, soil"]], answer: 0, explain: ["Zat PBT tahan lama, menumpuk di jaringan, dan beracun; diatur Konvensi Stockholm.", "PBT substances persist, build up in tissue and are toxic; they are regulated by the Stockholm Convention."] },
    { lv: 'sd', q: ['Gas yang membuat Bumi makin panas bila terlalu banyak adalah…', 'Which gas warms the Earth when there is too much of it?'], options: [['Oksigen', 'Oxygen'], ['Karbon dioksida', 'Carbon dioxide'], ['Nitrogen', 'Nitrogen'], ['Helium', 'Helium']], answer: 1, explain: ['CO₂ menahan panas seperti selimut (efek rumah kaca).', 'CO₂ traps heat like a blanket (greenhouse effect).'] },
    { lv: 'sd', q: ['Cara terbaik mengurangi sampah plastik adalah…', 'The best way to reduce plastic waste is to…'], options: [['Membakarnya', 'Burn it'], ['Membuang ke sungai', 'Throw it in the river'], ['Membawa tas dan botol sendiri', 'Bring your own bag and bottle'], ['Menguburnya', 'Bury it']], answer: 2, explain: ['Mengurangi pemakaian lebih baik daripada membuang atau membakar.', 'Using less is better than dumping or burning.'] },
    { lv: 'smp', q: ['Hujan asam terutama disebabkan oleh gas…', 'Acid rain is mainly caused by…'], options: [['O₂ dan N₂', 'O₂ and N₂'], ['SO₂ dan NO₂', 'SO₂ and NO₂'], ['He dan Ar', 'He and Ar'], ['H₂ dan O₂', 'H₂ and O₂']], answer: 1, explain: ['SO₂ dan NO₂ bereaksi dengan air membentuk H₂SO₄ dan HNO₃.', 'SO₂ and NO₂ react with water to form H₂SO₄ and HNO₃.'] },
    { lv: 'smp', q: ['Zat yang merusak lapisan ozon adalah…', 'Which damages the ozone layer?'], options: [['CFC', 'CFCs'], ['Air', 'Water'], ['Garam', 'Salt'], ['Gula', 'Sugar']], answer: 0, explain: ['CFC melepaskan radikal klorin di stratosfer.', 'CFCs release chlorine radicals in the stratosphere.'] },
    { lv: 'sma', q: ['Pengasaman laut terjadi karena…', 'Ocean acidification happens because…'], options: [['Laut menyerap CO₂ membentuk asam karbonat', 'Seas absorb CO₂ forming carbonic acid'], ['Garam laut bertambah', 'Sea salt increases'], ['Suhu laut turun', 'Seas cool down'], ['Hujan asam saja', 'Only acid rain']], answer: 0, explain: ['CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻ menurunkan pH laut.', 'CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻ lowers ocean pH.'] },
    { lv: 'sma', q: ['Tawas dipakai pada pengolahan air untuk…', 'Alum is used in water treatment to…'], options: [['Membunuh kuman', 'Kill germs'], ['Menggumpalkan kotoran agar mengendap', 'Clump dirt so it settles'], ['Menambah rasa', 'Add flavour'], ['Menaikkan suhu', 'Warm the water']], answer: 1, explain: ['Ion Al³⁺ menetralkan muatan partikel koloid sehingga menggumpal (koagulasi).', 'Al³⁺ neutralises colloid charges so particles clump (coagulation).'] },
    { lv: 'sma', q: ['Prinsip kimia hijau yang benar adalah…', 'A true green-chemistry principle is…'], options: [['Memakai pereaksi berlebih', 'Use excess reagents'], ['Mencegah limbah lebih baik daripada mengolahnya', 'Prevent waste rather than treat it'], ['Selalu memakai pelarut organik', 'Always use organic solvents'], ['Menaikkan suhu reaksi', 'Raise reaction temperatures']], answer: 1, explain: ['Prinsip pertama kimia hijau adalah pencegahan limbah.', 'The first green-chemistry principle is waste prevention.'] },
    { lv: 'kuliah', q: ['Senyawa dengan log Kow tinggi cenderung…', 'Compounds with a high log Kow tend to…'], options: [['Larut baik dalam air', 'Dissolve well in water'], ['Terakumulasi di jaringan lemak', 'Accumulate in fatty tissue'], ['Cepat menguap', 'Evaporate quickly'], ['Tidak beracun', 'Be non-toxic']], answer: 1, explain: ['Lipofilik tinggi berarti mudah masuk dan tertahan di lemak (bioakumulasi).', 'High lipophilicity means they enter and stay in fat (bioaccumulation).'] },
  ],
  teacher: {
    cp: ['Fase C–F: peserta didik menganalisis masalah lingkungan dari sudut pandang kimia dan merancang solusi berkelanjutan (Profil Pelajar Pancasila: bernalar kritis, kreatif).', 'Phases C–F: learners analyse environmental problems chemically and design sustainable solutions.'],
    goals: [
      ['Menjelaskan penyebab kimia pencemaran udara, air, dan perubahan iklim.', 'Explain the chemistry behind air and water pollution and climate change.'],
      ['Menerapkan prinsip kimia hijau pada proyek sekolah.', 'Apply green-chemistry principles to a school project.'],
    ],
    duration: ['Proyek 2–3 minggu (P5: Gaya Hidup Berkelanjutan)', '2–3 week project (sustainable lifestyle theme)'],
    steps: [
      ['Pengukuran pH air hujan dan air sungai.', 'Measure rain and river pH.'],
      ['Audit sampah plastik sekolah dan analisis jenis polimer.', 'School plastic audit and polymer analysis.'],
      ['Rancang solusi: bank sampah, kompos, atau penjernih air.', 'Design a solution: waste bank, compost or water filter.'],
    ],
    misconceptions: [['"Lubang ozon penyebab utama pemanasan global." Keduanya masalah berbeda; pemanasan global terutama akibat gas rumah kaca.', '"The ozone hole causes global warming." They are different problems; warming is mainly from greenhouse gases.']],
    assessment: ['Kuis Kimialoka dan presentasi proyek solusi lingkungan.', 'Kimialoka quiz and an environmental-solution project presentation.'],
  },
  refs: ["18-9-occurrence-preparation-and-compounds-of-oxygen", "18-10-occurrence-preparation-and-properties-of-sulfur", "11-5-colloids"],
};
