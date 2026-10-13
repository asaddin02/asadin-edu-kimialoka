export default {
  id: 'elektrokimia',
  icon: 'battery',
  levels: ['smp', 'sma', 'kuliah'],
  title: ['Elektrokimia: sel, baterai & elektrolisis', 'Electrochemistry: cells, batteries & electrolysis'],
  summary: [
    'Sel volta dan sel elektrolisis, potensial elektrode standar, hukum Faraday, persamaan Nernst, baterai, dan korosi.',
    'Galvanic and electrolytic cells, standard electrode potentials, Faraday’s laws, the Nernst equation, batteries and corrosion.',
  ],
  body: {
    sd: [
      `Baterai di senter, jam, dan ponsel menyimpan energi dalam bentuk zat kimia. Saat dipakai, zat-zat di dalamnya bereaksi dan menghasilkan listrik.

Kamu bisa membuat "baterai buah": tusukkan paku berlapis seng dan kawat tembaga ke dalam jeruk nipis, lalu hubungkan dengan kabel ke lampu LED kecil (beberapa buah disambung berderet). Air jeruk yang asam membantu kedua logam bereaksi sehingga listrik mengalir.

Kebalikannya, listrik juga bisa dipakai untuk menjalankan reaksi kimia. Perhiasan dan keran yang berkilau sering dilapisi logam tipis dengan cara ini (penyepuhan). Baterai bekas jangan dibuang sembarangan karena berisi logam yang dapat mencemari tanah dan air.`,
      `Batteries in torches, clocks and phones store energy as chemicals. When used, the substances inside react and produce electricity.

You can make a "fruit battery": push a zinc-coated nail and a copper wire into a lime and connect them with wires to a small LED (join several fruits in a row). The acidic juice helps the two metals react, so electricity flows.

The other way round, electricity can drive chemical reactions. Shiny jewellery and taps are often coated with a thin layer of metal this way (electroplating). Never throw used batteries away carelessly: they contain metals that can pollute soil and water.`,
    ],
    smp: [
      `Reaksi [[redoks]] adalah perpindahan elektron: zat yang melepas elektron mengalami [[oksidasi]], zat yang menerima elektron mengalami [[reduksi]]. Bila kedua setengah reaksi dipisahkan dan elektronnya dialirkan lewat kawat, terbentuklah sel listrik.

- **[[sel-volta|Sel volta]]** (sel galvani) mengubah energi kimia menjadi listrik dari reaksi yang berlangsung sendiri. Pada sel Daniell, seng teroksidasi dan ion tembaga tereduksi: {{r:sel-daniell|Zn + Cu²⁺ → Zn²⁺ + Cu}}.
- **[[sel-elektrolisis|Sel elektrolisis]]** memakai listrik untuk menjalankan reaksi yang tidak berlangsung sendiri, misalnya {{r:elektrolisis-air|menguraikan air}} menjadi hidrogen dan oksigen, penyepuhan, dan pemurnian logam.

Di kedua jenis sel, oksidasi terjadi di [[anode]] dan reduksi di [[katode]].

[[baterai|Baterai]] sekali pakai (baterai kering, alkalin) tidak dapat diisi ulang; baterai isi ulang (aki timbal–asam, litium-ion) dapat dipulihkan dengan arus listrik. [[korosi|Korosi]] besi juga reaksi elektrokimia; besi dilindungi dengan cat, pelapisan seng (galvanis), atau timah (kaleng).`,
      `A [[redoks|redox]] reaction is a transfer of electrons: the substance losing electrons undergoes [[oksidasi|oxidation]], the one gaining them [[reduksi|reduction]]. If the two half-reactions are separated and the electrons sent through a wire, you get an electric cell.

- A **[[sel-volta|galvanic cell]]** (voltaic cell) turns chemical energy into electricity from a reaction that runs by itself. In the Daniell cell, zinc is oxidised and copper ions reduced: {{r:sel-daniell|Zn + Cu²⁺ → Zn²⁺ + Cu}}.
- An **[[sel-elektrolisis|electrolytic cell]]** uses electricity to drive a reaction that would not run by itself, such as {{r:elektrolisis-air|splitting water}} into hydrogen and oxygen, electroplating and refining metals.

In both kinds of cell, oxidation happens at the [[anode]] and reduction at the [[katode|cathode]].

Single-use [[baterai|batteries]] (dry cells, alkaline) cannot be recharged; rechargeable ones (lead–acid, lithium-ion) are restored with an electric current. The [[korosi|corrosion]] of iron is electrochemical too; iron is protected by paint, a zinc coating (galvanising) or tin (tin cans).`,
    ],
    sma: [
      `**Susunan sel volta**: dua elektrode dalam larutan ionnya, dihubungkan kawat dan jembatan garam yang menjaga kenetralan muatan. Notasi sel: Zn | Zn²⁺ || Cu²⁺ | Cu (anode di kiri). Pada sel volta anode bermuatan negatif dan katode positif; pada sel elektrolisis sebaliknya.

[[potensial-standar|Potensial reduksi standar]] (E°, disebut juga [[potensial-elektrode|potensial elektrode]] standar; 1 M, 1 bar, 25 °C) diukur terhadap elektrode hidrogen standar (0 V). Makin positif E°, makin mudah spesies tereduksi: Ag⁺/Ag +0,80 V, Cu²⁺/Cu +0,34 V, 2H⁺/H₂ 0,00 V, Zn²⁺/Zn −0,76 V.

**E°sel = E°katode − E°anode**; reaksi spontan bila E°sel > 0. Sel Daniell: +0,34 − (−0,76) = +1,10 V. Cobalah di {{lab:volta|lab Sel volta}}.

**Elektrolisis**: hasilnya bergantung pada lelehan atau larutan. Lelehan NaCl menghasilkan logam Na dan Cl₂; larutan NaCl pekat menghasilkan H₂, Cl₂, dan NaOH ({{r:klor-alkali|proses klor-alkali}}) karena air lebih mudah direduksi daripada Na⁺. **Hukum Faraday**: muatan Q = I·t; mol elektron = Q/F dengan tetapan Faraday F = 96 485 C/mol. Massa logam yang mengendap = (Ar × I × t)/(n × F).

**Baterai**: sel kering seng–karbon dan alkalin sekitar 1,5 V; aki timbal–asam sekitar 2 V per sel (6 sel = 12 V); litium-ion dengan katode {{m:lithium-cobalt-oxide|LiCoO₂}} atau {{m:lithium-iron-phosphate|LiFePO₄}} dan anode {{m:graphite|grafit}}; sel bahan bakar hidrogen mengubah H₂ + ½O₂ menjadi air dan listrik.

**Korosi** adalah sel volta kecil: besi teroksidasi di daerah anodik, oksigen tereduksi di daerah katodik ({{r:perkaratan|perkaratan}}). Perlindungan katodik memakai anode korban (Mg atau Zn) pada kapal dan pipa.`,
      `**Building a galvanic cell**: two electrodes in solutions of their ions, joined by a wire and a salt bridge that keeps the charges balanced. Cell notation: Zn | Zn²⁺ || Cu²⁺ | Cu (anode on the left). In a galvanic cell the anode is negative and the cathode positive; in an electrolytic cell the reverse.

[[potensial-standar|Standard reduction potentials]] (E°, also called standard [[potensial-elektrode|electrode potentials]]; 1 M, 1 bar, 25 °C) are measured against the standard hydrogen electrode (0 V). The more positive E°, the more easily a species is reduced: Ag⁺/Ag +0.80 V, Cu²⁺/Cu +0.34 V, 2H⁺/H₂ 0.00 V, Zn²⁺/Zn −0.76 V.

**E°cell = E°cathode − E°anode**; the reaction is spontaneous when E°cell > 0. Daniell cell: +0.34 − (−0.76) = +1.10 V. Try it in the {{lab:volta|Voltaic cell lab}}.

**Electrolysis**: the products depend on melt or solution. Molten NaCl gives sodium metal and Cl₂; concentrated NaCl solution gives H₂, Cl₂ and NaOH (the {{r:klor-alkali|chlor-alkali process}}) because water is reduced more easily than Na⁺. **Faraday’s laws**: charge Q = I·t; moles of electrons = Q/F with the Faraday constant F = 96 485 C/mol. Mass of metal deposited = (Ar × I × t)/(n × F).

**Batteries**: zinc–carbon and alkaline dry cells about 1.5 V; lead–acid about 2 V per cell (6 cells = 12 V); lithium-ion with a {{m:lithium-cobalt-oxide|LiCoO₂}} or {{m:lithium-iron-phosphate|LiFePO₄}} cathode and a {{m:graphite|graphite}} anode; hydrogen fuel cells turn H₂ + ½O₂ into water and electricity.

**Corrosion** is a tiny galvanic cell: iron is oxidised at anodic spots and oxygen reduced at cathodic spots ({{r:perkaratan|rusting}}). Cathodic protection uses sacrificial anodes (Mg or Zn) on ships and pipelines.`,
    ],
    kuliah: [
      `Potensial sel bergantung pada konsentrasi menurut [[persamaan-nernst|persamaan Nernst]]: E = E° − (RT/nF) ln Q, atau E = E° − (0,0592/n) log Q pada 25 °C. Sel konsentrasi (elektrode sama, konsentrasi berbeda) menghasilkan tegangan kecil; prinsip yang sama mendasari elektrode kaca pH (sekitar 59 mV per satuan pH pada 25 °C) dan elektrode selektif ion.

Termodinamika sel: ΔG = −nFE dan ΔG° = −nFE° = −RT ln K. E°sel +1,10 V untuk sel Daniell (n = 2) memberi K sekitar 10³⁷: reaksinya praktis sempurna. Diagram Pourbaix (E terhadap pH) memetakan daerah kekebalan, korosi, dan pasivasi logam.

Kinetika elektrode: arus nyata memerlukan **overpotensial** di atas potensial kesetimbangan; hubungan arus–overpotensial digambarkan persamaan Butler–Volmer dan pendekatan Tafel. Inilah alasan elektrolisis air di industri memerlukan tegangan lebih besar dari 1,23 V dan katalis elektrode (Pt, Ni, IrO₂).

Material baterai modern dinilai dari tegangan sel, kapasitas spesifik (mAh/g), rapat energi (Wh/kg), dan umur siklus. Pada baterai litium-ion terjadi interkalasi Li⁺ ke dalam grafit (LiC₆) dan lapisan antarmuka elektrolit padat (SEI) yang menentukan umur. Katode kaya nikel (NMC) memakai nikel, sumber daya strategis Indonesia; pengolahan dan daur ulangnya adalah bidang riset elektrokimia dan kimia hijau.`,
      `A cell’s potential depends on concentration via the [[persamaan-nernst|Nernst equation]]: E = E° − (RT/nF) ln Q, or E = E° − (0.0592/n) log Q at 25 °C. Concentration cells (same electrodes, different concentrations) give small voltages; the same principle underlies the glass pH electrode (about 59 mV per pH unit at 25 °C) and ion-selective electrodes.

Cell thermodynamics: ΔG = −nFE and ΔG° = −nFE° = −RT ln K. An E° of +1.10 V for the Daniell cell (n = 2) gives K of about 10³⁷: the reaction goes essentially to completion. Pourbaix diagrams (E against pH) map a metal’s immunity, corrosion and passivation regions.

Electrode kinetics: real currents need an **overpotential** beyond the equilibrium potential; the current–overpotential relation is described by the Butler–Volmer equation and its Tafel approximation. That is why industrial water electrolysis needs more than 1.23 V and electrocatalysts (Pt, Ni, IrO₂).

Modern battery materials are judged by cell voltage, specific capacity (mAh/g), energy density (Wh/kg) and cycle life. Lithium-ion batteries intercalate Li⁺ into graphite (LiC₆), and the solid–electrolyte interphase (SEI) largely sets their lifetime. Nickel-rich cathodes (NMC) use nickel, a strategic Indonesian resource; its processing and recycling are active fields of electrochemistry and green chemistry.`,
    ],
  },
  points: [
    ['Oksidasi di anode, reduksi di katode (sel volta maupun elektrolisis).', 'Oxidation at the anode, reduction at the cathode (in galvanic and electrolytic cells).'],
    ['Sel volta: reaksi spontan → listrik; sel elektrolisis: listrik → reaksi tidak spontan.', 'Galvanic cell: spontaneous reaction → electricity; electrolytic cell: electricity → non-spontaneous reaction.'],
    ['E°sel = E°katode − E°anode; spontan bila positif.', 'E°cell = E°cathode − E°anode; spontaneous when positive.'],
    ['Hukum Faraday: mol elektron = I·t/F, F = 96 485 C/mol.', 'Faraday’s law: moles of electrons = I·t/F, F = 96 485 C/mol.'],
    ['Korosi adalah sel volta kecil; dicegah dengan pelapisan dan anode korban.', 'Corrosion is a tiny galvanic cell; prevented by coatings and sacrificial anodes.'],
  ],
  molecules: ['copper-sulfate', 'lithium-cobalt-oxide', 'lithium-iron-phosphate', 'graphite', 'sodium-chloride'],
  labs: ['volta'],
  activity: {
    sd: ['Buat baterai jeruk nipis dengan paku galvanis dan kawat tembaga (beberapa buah berderet) untuk menyalakan LED. Bandingkan dengan larutan garam.', 'Build a lime battery with galvanised nails and copper wire (several in a row) to light an LED. Compare with salt water.'],
    smp: ['Elektrolisis larutan tembaga(II) sulfat dengan dua pensil grafit dan baterai 9 V. Amati elektrode mana yang dilapisi tembaga dan mana yang mengeluarkan gas.', 'Electrolyse copper(II) sulfate solution with two graphite pencils and a 9 V battery. Note which electrode gets copper-plated and which gives off gas.'],
    sma: ['Susun sel volta Zn–Cu dan Mg–Cu di lab Sel volta Kimialoka, bandingkan E°sel terukur dengan hitungan dari tabel potensial standar.', 'Build Zn–Cu and Mg–Cu cells in the Kimialoka Voltaic cell lab and compare the E°cell values with those from the standard-potential table.'],
    kuliah: ['Hitung E sel Daniell bila [Zn²⁺] = 1,0 M dan [Cu²⁺] = 0,010 M pada 25 °C, lalu jelaskan arah perubahan tegangannya.', 'Calculate the Daniell cell E when [Zn²⁺] = 1.0 M and [Cu²⁺] = 0.010 M at 25 °C, and explain the direction of the voltage change.'],
  },
  quiz: [
    { lv: 'sd', q: ["Baterai bekas sebaiknya…", "Used batteries should be…"], options: [["Dibuang ke sungai", "Thrown in the river"], ["Dikumpulkan di tempat pengumpulan khusus", "Taken to a special collection point"], ["Dibakar", "Burned"], ["Dikubur di kebun", "Buried in the garden"]], answer: 1, explain: ["Logam di dalam baterai dapat mencemari tanah dan air.", "The metals inside can pollute soil and water."] },
    { lv: 'sd', q: ["Baterai menyimpan energi dalam bentuk…", "A battery stores energy as…"], options: [["Zat kimia", "Chemicals"], ["Cahaya", "Light"], ["Air", "Water"], ["Udara", "Air"]], answer: 0, explain: ["Zat kimia di dalam baterai bereaksi dan menghasilkan listrik.", "The chemicals inside react and produce electricity."] },
    { lv: 'smp', q: ['Pada sel volta, oksidasi terjadi di…', 'In a galvanic cell, oxidation happens at the…'], options: [['Katode', 'Cathode'], ['Anode', 'Anode'], ['Jembatan garam', 'Salt bridge'], ['Kawat', 'Wire']], answer: 1, explain: ['Anode = oksidasi, katode = reduksi.', 'Anode = oxidation, cathode = reduction.'] },
    { lv: 'smp', q: ['Sel yang memakai listrik untuk menjalankan reaksi disebut…', 'A cell that uses electricity to drive a reaction is…'], options: [['Sel volta', 'A galvanic cell'], ['Sel elektrolisis', 'An electrolytic cell'], ['Sel surya', 'A solar cell'], ['Sel darah', 'A blood cell']], answer: 1, explain: ['Elektrolisis memakai energi listrik untuk reaksi yang tidak spontan.', 'Electrolysis uses electrical energy for a non-spontaneous reaction.'] },
    { lv: 'smp', q: ['Baterai yang dapat diisi ulang adalah…', 'Which battery can be recharged?'], options: [['Baterai seng–karbon', 'Zinc–carbon'], ['Baterai alkalin', 'Alkaline'], ['Baterai litium-ion', 'Lithium-ion'], ['Baterai jeruk', 'A fruit battery']], answer: 2, explain: ['Litium-ion adalah baterai sekunder (isi ulang).', 'Lithium-ion is a secondary (rechargeable) battery.'] },
    { lv: 'sma', q: ['E° Ag⁺/Ag = +0,80 V dan Cu²⁺/Cu = +0,34 V. E°sel Cu–Ag adalah…', 'E° Ag⁺/Ag = +0.80 V and Cu²⁺/Cu = +0.34 V. E°cell for Cu–Ag is…'], options: [['+1,14 V', '+1.14 V'], ['+0,46 V', '+0.46 V'], ['−0,46 V', '−0.46 V'], ['+0,80 V', '+0.80 V']], answer: 1, explain: ['Katode Ag (lebih positif): 0,80 − 0,34 = +0,46 V.', 'Silver is the cathode (more positive): 0.80 − 0.34 = +0.46 V.'] },
    { lv: 'sma', q: ['Elektrolisis larutan NaCl pekat menghasilkan di katode…', 'Electrolysing concentrated NaCl solution gives at the cathode…'], options: [['Logam natrium', 'Sodium metal'], ['Gas hidrogen', 'Hydrogen gas'], ['Gas klorin', 'Chlorine gas'], ['Gas oksigen', 'Oxygen gas']], answer: 1, explain: ['Air lebih mudah direduksi daripada Na⁺, jadi terbentuk H₂ dan OH⁻.', 'Water is reduced more easily than Na⁺, so H₂ and OH⁻ form.'] },
    { lv: 'sma', q: ['Arus 2 A selama 9650 detik mengalirkan mol elektron sebanyak…', 'A 2 A current for 9650 s delivers how many moles of electrons?'], options: [['0,1 mol', '0.1 mol'], ['0,2 mol', '0.2 mol'], ['2 mol', '2 mol'], ['0,02 mol', '0.02 mol']], answer: 1, explain: ['Q = 2 × 9650 = 19 300 C; 19 300/96 485 ≈ 0,2 mol.', 'Q = 2 × 9650 = 19 300 C; 19 300/96 485 ≈ 0.2 mol.'] },
    { lv: 'sma', q: ['Pelindung pipa baja dengan anode korban memakai logam…', 'A sacrificial anode protecting a steel pipe uses…'], options: [['Tembaga', 'Copper'], ['Magnesium', 'Magnesium'], ['Perak', 'Silver'], ['Emas', 'Gold']], answer: 1, explain: ['Mg lebih mudah teroksidasi daripada besi sehingga "dikorbankan".', 'Mg is oxidised more easily than iron, so it is "sacrificed".'] },
    { lv: 'kuliah', q: ['Menurut persamaan Nernst, bila [Cu²⁺] pada sel Daniell diturunkan, E sel…', 'By the Nernst equation, lowering [Cu²⁺] in a Daniell cell makes E…'], options: [['Naik', 'Rise'], ['Turun', 'Fall'], ['Tetap', 'Stay the same'], ['Menjadi nol', 'Become zero']], answer: 1, explain: ['Q = [Zn²⁺]/[Cu²⁺] naik sehingga E = E° − (0,0592/2) log Q turun.', 'Q = [Zn²⁺]/[Cu²⁺] rises, so E = E° − (0.0592/2) log Q falls.'] },
    { lv: 'kuliah', q: ['Elektrolisis air di industri memerlukan tegangan di atas 1,23 V karena…', 'Industrial water electrolysis needs more than 1.23 V because of…'], options: [['Overpotensial elektrode', 'Electrode overpotential'], ['Air tidak menghantar', 'Water does not conduct'], ['Hukum Hess', 'Hess’s law'], ['Efek Tyndall', 'The Tyndall effect']], answer: 0, explain: ['Kinetika reaksi di elektrode memerlukan overpotensial agar arus berarti mengalir.', 'Electrode kinetics require an overpotential for a useful current to flow.'] },
    { lv: 'kuliah', q: ['Untuk sel dengan n = 2 dan E° = +1,10 V, ΔG° sekitar…', 'For a cell with n = 2 and E° = +1.10 V, ΔG° is about…'], options: [['−212 kJ', '−212 kJ'], ['+212 kJ', '+212 kJ'], ['−106 kJ', '−106 kJ'], ['−1,1 kJ', '−1.1 kJ']], answer: 0, explain: ['ΔG° = −nFE° = −2 × 96 485 × 1,10 ≈ −2,12 × 10⁵ J.', 'ΔG° = −nFE° = −2 × 96 485 × 1.10 ≈ −2.12 × 10⁵ J.'] },
  ],
  teacher: {
    cp: ['Fase D–F: peserta didik menjelaskan sel volta dan elektrolisis, menghitung potensial sel dan hukum Faraday, serta mengaitkannya dengan baterai dan korosi.', 'Phases D–F: learners explain galvanic cells and electrolysis, calculate cell potentials and Faraday quantities, and link them to batteries and corrosion.'],
    goals: [
      ['Menentukan anode, katode, dan arah elektron pada sel.', 'Identify the anode, cathode and electron flow in a cell.'],
      ['Menghitung E°sel dan meramalkan kespontanan.', 'Calculate E°cell and predict spontaneity.'],
      ['Menerapkan hukum Faraday pada elektrolisis dan penyepuhan.', 'Apply Faraday’s laws to electrolysis and electroplating.'],
    ],
    duration: ['4 × 45 menit', '4 × 45 min'],
    steps: [
      ['Pemantik: baterai jeruk nipis menyalakan LED.', 'Hook: a lime battery lights an LED.'],
      ['Lab virtual Sel volta: pasangan logam dan potensial sel.', 'Virtual Voltaic cell lab: metal pairs and cell potentials.'],
      ['Praktikum elektrolisis CuSO₄ dan hitungan Faraday.', 'Practical: electrolysis of CuSO₄ and Faraday calculations.'],
      ['Diskusi: baterai kendaraan listrik, nikel Indonesia, dan daur ulang.', 'Discussion: EV batteries, Indonesian nickel and recycling.'],
    ],
    misconceptions: [
      ['"Elektron mengalir melalui jembatan garam." Elektron mengalir lewat kawat; jembatan garam mengalirkan ion.', '"Electrons flow through the salt bridge." Electrons flow through the wire; the salt bridge carries ions.'],
      ['"Anode selalu positif." Anode negatif pada sel volta dan positif pada sel elektrolisis; yang tetap adalah oksidasinya.', '"The anode is always positive." It is negative in a galvanic cell and positive in an electrolytic cell; what is constant is that oxidation happens there.'],
      ['"Baterai menyimpan listrik." Baterai menyimpan energi kimia yang diubah menjadi listrik saat dipakai.', '"Batteries store electricity." They store chemical energy that becomes electricity when used.'],
    ],
    assessment: ['Laporan praktikum elektrolisis, kuis Kimialoka, dan soal potensial sel dan hukum Faraday.', 'An electrolysis report, the Kimialoka quiz and cell-potential and Faraday problems.'],
  },
  refs: ['17-1-review-of-redox-chemistry', '17-2-galvanic-cells', '17-3-electrode-and-cell-potentials', '17-4-potential-free-energy-and-equilibrium', '17-5-batteries-and-fuel-cells', '17-6-corrosion', '17-7-electrolysis'],
};
