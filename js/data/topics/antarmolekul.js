export default {
  id: 'antarmolekul',
  icon: 'link',
  levels: ['sd', 'smp', 'sma', 'kuliah'],
  title: ['Gaya antarmolekul & sifat zat', 'Intermolecular forces & properties'],
  summary: [
    'Gaya London, dipol–dipol, dan ikatan hidrogen menjelaskan titik didih, kelarutan, tegangan permukaan, dan keunikan air.',
    'London forces, dipole–dipole forces and hydrogen bonds explain boiling points, solubility, surface tension and water’s oddities.',
  ],
  body: {
    sd: [
      `Partikel-partikel zat saling tarik-menarik. Tarikan inilah yang membuat tetes air berbentuk bulat, membuat serangga anggang-anggang dapat berjalan di atas air, dan membuat air naik perlahan di tisu.

Makin kuat partikel saling tarik, makin sulit zat itu menguap atau mendidih. Coba teteskan air dan alkohol di tangan: alkohol lebih cepat kering karena partikelnya saling tarik lebih lemah daripada partikel air.

Minyak dan air tidak mau bercampur. Partikel air lebih suka menarik sesamanya, sehingga minyak terdorong dan mengapung di atas. Sabun dapat "menjembatani" keduanya, itulah sebabnya piring berminyak bersih setelah dicuci dengan sabun.`,
      `The particles of a substance pull on each other. This pull makes water drops round, lets pond skaters walk on water and makes water creep up a tissue.

The stronger the particles attract, the harder the substance is to evaporate or boil. Put drops of water and alcohol on your hand: the alcohol dries faster because its particles attract each other less strongly than water’s do.

Oil and water will not mix. Water particles prefer to pull on each other, so the oil is pushed out and floats on top. Soap can "bridge" the two, which is why greasy plates come clean with soap.`,
    ],
    smp: [
      `Di dalam molekul, atom terikat kuat oleh ikatan kovalen. Di antara molekul bekerja [[gaya-antarmolekul|gaya antarmolekul]] yang jauh lebih lemah, tetapi menentukan wujud, titik didih, dan kelarutan zat. Tiga jenisnya:

- [[gaya-london|Gaya London (dispersi)]]: ada pada semua molekul; makin besar dan panjang molekul, makin kuat. Karena itu titik didih halogen naik dari {{m:fluorine|F₂}} (−188 °C) sampai {{m:iodine|I₂}} (184 °C).
- [[dipol-dipol|Gaya dipol–dipol]]: antara [[molekul-polar|molekul polar]] yang punya kutub positif dan negatif, misalnya {{m:hydrogen-chloride|HCl}}.
- [[ikatan-hidrogen|Ikatan hidrogen]]: tarikan kuat bila H terikat pada F, O, atau N. Air membentuk banyak ikatan hidrogen.

Akibatnya: {{m:water|air}} mendidih pada 100 °C, sedangkan {{m:hydrogen-sulfide|H₂S}} yang molekulnya lebih berat sudah mendidih pada −60 °C. {{m:ethanol|Etanol}} (titik didih 78 °C) dan {{m:dimethyl-ether|dimetil eter}} (−24 °C) punya rumus sama, tetapi hanya etanol yang dapat berikatan hidrogen.

"Sejenis melarutkan sejenis": zat polar larut dalam pelarut polar (gula dalam air), zat nonpolar larut dalam pelarut nonpolar (minyak dalam bensin).`,
      `Inside a molecule, atoms are held tightly by covalent bonds. Between molecules act much weaker [[gaya-antarmolekul|intermolecular forces]], yet these decide state, boiling point and solubility. Three kinds:

- [[gaya-london|London (dispersion) forces]]: in every molecule; the bigger and longer the molecule, the stronger. That is why the halogens’ boiling points rise from {{m:fluorine|F₂}} (−188 °C) to {{m:iodine|I₂}} (184 °C).
- [[dipol-dipol|Dipole–dipole forces]]: between [[molekul-polar|polar molecules]] with positive and negative ends, such as {{m:hydrogen-chloride|HCl}}.
- [[ikatan-hidrogen|Hydrogen bonds]]: strong attractions when H is bonded to F, O or N. Water forms many hydrogen bonds.

So {{m:water|water}} boils at 100 °C while heavier {{m:hydrogen-sulfide|H₂S}} boils at −60 °C. {{m:ethanol|Ethanol}} (boiling point 78 °C) and {{m:dimethyl-ether|dimethyl ether}} (−24 °C) share a formula, but only ethanol can hydrogen-bond.

"Like dissolves like": polar substances dissolve in polar solvents (sugar in water), non-polar ones in non-polar solvents (oil in petrol).`,
    ],
    sma: [
      `Kepolaran molekul ditentukan oleh [[ikatan-polar|kepolaran ikatan]] dan [[bentuk-molekul|bentuk molekul]]: {{m:carbon-dioxide|CO₂}} linear sehingga dipolnya saling meniadakan (nonpolar), sedangkan {{m:water|H₂O}} bengkok sehingga polar. Lihat bentuknya di {{lab:vsepr|lab VSEPR}}.

Faktor yang memperkuat [[gaya-london|gaya London]]:

- Jumlah elektron (polarisabilitas): F₂ < Cl₂ < Br₂ < I₂; CH₄ < C₂H₆ < C₃H₈.
- Luas kontak: isomer rantai lurus lebih tinggi titik didihnya daripada bercabang, misalnya {{m:butane|butana}} (−0,5 °C) dan {{m:isobutane|isobutana}} (−12 °C).

[[ikatan-hidrogen|Ikatan hidrogen]] menjelaskan anomali hidrida: H₂O, HF, dan NH₃ mendidih jauh lebih tinggi daripada hidrida lain di golongannya, padahal pada hidrida golongan 14 (CH₄, SiH₄, GeH₄) titik didih naik teratur mengikuti ukuran.

Keunikan air karena ikatan hidrogen: es lebih ringan dari air cair (kisi heksagonal yang renggang) sehingga danau membeku dari atas; massa jenis air maksimum pada 4 °C; kalor jenis dan kalor penguapannya besar sehingga menstabilkan suhu tubuh dan iklim.

Dalam larutan juga ada **gaya ion–dipol**: ion Na⁺ dan Cl⁻ dikelilingi molekul air (hidrasi), yang memungkinkan garam larut. [[gaya-van-der-waals|Gaya van der Waals]] adalah sebutan umum untuk gaya London dan dipol.`,
      `Molecular polarity depends on [[ikatan-polar|bond polarity]] and [[bentuk-molekul|shape]]: {{m:carbon-dioxide|CO₂}} is linear, so its dipoles cancel (non-polar), while bent {{m:water|H₂O}} is polar. See the shapes in the {{lab:vsepr|VSEPR lab}}.

What strengthens [[gaya-london|London forces]]:

- Number of electrons (polarisability): F₂ < Cl₂ < Br₂ < I₂; CH₄ < C₂H₆ < C₃H₈.
- Contact area: straight-chain isomers boil higher than branched ones, e.g. {{m:butane|butane}} (−0.5 °C) and {{m:isobutane|isobutane}} (−12 °C).

[[ikatan-hidrogen|Hydrogen bonding]] explains the hydride anomaly: H₂O, HF and NH₃ boil far higher than the other hydrides of their groups, whereas the group 14 hydrides (CH₄, SiH₄, GeH₄) rise steadily with size.

Water’s oddities come from hydrogen bonding: ice is less dense than liquid water (an open hexagonal lattice), so lakes freeze from the top; water is densest at 4 °C; its heat capacity and heat of vaporisation are large, steadying body temperature and climate.

In solutions there are also **ion–dipole forces**: Na⁺ and Cl⁻ are surrounded by water molecules (hydration), which lets salt dissolve. [[gaya-van-der-waals|Van der Waals forces]] is the collective name for London and dipole forces.`,
    ],
    kuliah: [
      `Energi interaksi antarmolekul dapat dinyatakan secara kuantitatif. Untuk dua molekul pada jarak r: gaya London (dispersi) ∝ α₁α₂/r⁶ (α = polarisabilitas), dipol–dipol terputar termal (Keesom) ∝ μ₁²μ₂²/(kT·r⁶), dan dipol–dipol terinduksi (Debye) ∝ μ²α/r⁶. Ketiganya digabung dengan tolakan jarak pendek dalam potensial Lennard-Jones: V(r) = 4ε[(σ/r)¹² − (σ/r)⁶]. Tetapan a dalam persamaan gas van der Waals mencerminkan tarikan ini.

Ikatan hidrogen (sekitar 10–40 kJ/mol) memiliki sifat terarah dan sebagian kovalen; kerja samanya menstabilkan heliks ganda DNA, heliks-α dan lembaran-β protein, serta jaringan air cair. **Efek hidrofobik** bukan tarikan langsung antarmolekul nonpolar, melainkan terutama efek entropi: air di sekitar permukaan nonpolar kehilangan kebebasan susunan ikatan hidrogennya, sehingga molekul nonpolar cenderung berkumpul. Efek ini mendorong pelipatan protein dan pembentukan membran sel.

Hubungan gaya antarmolekul dengan sifat makroskopik: persamaan Clausius–Clapeyron, ln(P₂/P₁) = −(ΔH_uap/R)(1/T₂ − 1/T₁), menghubungkan tekanan uap dengan entalpi penguapan; aturan Trouton menyatakan entropi penguapan banyak cairan sekitar 85–88 J mol⁻¹ K⁻¹, dengan air dan alkohol menyimpang karena ikatan hidrogen. Tegangan permukaan dan viskositas juga naik seiring kekuatan gaya antarmolekul.`,
      `Intermolecular energies can be quantified. For two molecules at distance r: London (dispersion) ∝ α₁α₂/r⁶ (α = polarisability), thermally averaged dipole–dipole (Keesom) ∝ μ₁²μ₂²/(kT·r⁶), and dipole–induced dipole (Debye) ∝ μ²α/r⁶. All three combine with short-range repulsion in the Lennard-Jones potential: V(r) = 4ε[(σ/r)¹² − (σ/r)⁶]. The a constant in the van der Waals gas equation reflects these attractions.

Hydrogen bonds (about 10–40 kJ/mol) are directional and partly covalent; together they stabilise the DNA double helix, protein α-helices and β-sheets, and the network of liquid water. The **hydrophobic effect** is not a direct attraction between non-polar molecules but mainly an entropy effect: water next to a non-polar surface loses freedom in its hydrogen-bond arrangements, so non-polar molecules tend to cluster. It drives protein folding and cell-membrane formation.

Linking forces to bulk properties: the Clausius–Clapeyron equation, ln(P₂/P₁) = −(ΔH_vap/R)(1/T₂ − 1/T₁), relates vapour pressure to the enthalpy of vaporisation; Trouton’s rule says many liquids have a vaporisation entropy near 85–88 J mol⁻¹ K⁻¹, with water and alcohols deviating because of hydrogen bonding. Surface tension and viscosity also rise with intermolecular strength.`,
    ],
  },
  points: [
    ['Gaya antarmolekul jauh lebih lemah dari ikatan kovalen, tetapi menentukan wujud dan titik didih.', 'Intermolecular forces are much weaker than covalent bonds but decide state and boiling point.'],
    ['Urutan kekuatan (molekul seukuran): ikatan hidrogen > dipol–dipol > gaya London.', 'Strength (similar-sized molecules): hydrogen bonds > dipole–dipole > London forces.'],
    ['Gaya London bertambah dengan jumlah elektron dan luas kontak molekul.', 'London forces grow with electron count and molecular contact area.'],
    ['Ikatan hidrogen terjadi bila H terikat pada F, O, atau N.', 'Hydrogen bonds form when H is bonded to F, O or N.'],
    ['"Sejenis melarutkan sejenis": polar dengan polar, nonpolar dengan nonpolar.', '"Like dissolves like": polar with polar, non-polar with non-polar.'],
  ],
  molecules: ['water', 'hydrogen-sulfide', 'ethanol', 'dimethyl-ether', 'butane', 'isobutane', 'iodine'],
  labs: ['vsepr', 'wujud'],
  activity: {
    sd: ['Letakkan klip kertas perlahan di atas air dalam mangkuk sampai mengapung, lalu teteskan sabun di pinggirnya. Ceritakan apa yang terjadi.', 'Gently float a paper clip on water in a bowl, then add a drop of soap at the edge. Describe what happens.'],
    smp: ['Teteskan air, alkohol, dan minyak goreng di atas kaca. Ukur waktu masing-masing mengering, lalu urutkan kekuatan gaya antarmolekulnya.', 'Put drops of water, rubbing alcohol and cooking oil on glass. Time how long each takes to dry and rank their intermolecular forces.'],
    sma: ['Buat grafik titik didih hidrida golongan 14–17 dari data PubChem di Kimialoka, lalu jelaskan anomali H₂O, HF, dan NH₃.', 'Graph the boiling points of the group 14–17 hydrides from Kimialoka’s PubChem data and explain the anomalies of H₂O, HF and NH₃.'],
    kuliah: ['Dengan dua titik tekanan uap air dari literatur, hitung ΔH penguapan dengan persamaan Clausius–Clapeyron dan bandingkan dengan nilai rujukan 40,7 kJ/mol.', 'From two literature vapour pressures of water, compute ΔH of vaporisation with the Clausius–Clapeyron equation and compare it with the reference 40.7 kJ/mol.'],
  },
  quiz: [
    { lv: 'sd', q: ['Alkohol cepat kering di kulit karena partikelnya…', 'Alcohol dries fast on skin because its particles…'], options: [['Saling tarik lebih lemah daripada partikel air', 'Attract each other less than water’s do'], ['Lebih berat', 'Are heavier'], ['Tidak bergerak', 'Do not move'], ['Menempel kuat di kulit', 'Stick firmly to skin']], answer: 0, explain: ['Tarikan antarpartikel alkohol lebih lemah sehingga mudah menguap.', 'Alcohol’s particles attract more weakly, so it evaporates easily.'] },
    { lv: 'sd', q: ['Minyak mengapung di atas air karena…', 'Oil floats on water because…'], options: [['Minyak dan air tidak bercampur dan minyak lebih ringan', 'They do not mix and oil is lighter'], ['Minyak lebih berat', 'Oil is heavier'], ['Air mendidih', 'Water is boiling'], ['Minyak larut sempurna', 'Oil dissolves completely']], answer: 0, explain: ['Air menarik sesamanya, minyak terdorong keluar; massa jenis minyak lebih kecil.', 'Water pulls on itself and pushes oil out; oil is less dense.'] },
    { lv: 'smp', q: ['Gaya antarmolekul yang ada pada semua molekul adalah…', 'The intermolecular force present in every molecule is…'], options: [['Ikatan hidrogen', 'Hydrogen bonding'], ['Gaya London', 'London forces'], ['Ikatan ion', 'Ionic bonding'], ['Dipol–dipol', 'Dipole–dipole']], answer: 1, explain: ['Gaya London muncul dari dipol sesaat, jadi ada di semua molekul.', 'London forces arise from instantaneous dipoles, so every molecule has them.'] },
    { lv: 'smp', q: ['Air mendidih jauh lebih tinggi daripada H₂S karena…', 'Water boils much higher than H₂S because…'], options: [['Air lebih berat', 'Water is heavier'], ['Air membentuk ikatan hidrogen', 'Water forms hydrogen bonds'], ['H₂S berwujud padat', 'H₂S is a solid'], ['Air bersifat nonpolar', 'Water is non-polar']], answer: 1, explain: ['O–H···O ikatan hidrogen jauh lebih kuat daripada gaya pada H₂S.', 'O–H···O hydrogen bonds are much stronger than the forces in H₂S.'] },
    { lv: 'smp', q: ['Zat yang larut dalam air adalah…', 'Which dissolves in water?'], options: [['Minyak goreng', 'Cooking oil'], ['Lilin', 'Candle wax'], ['Gula', 'Sugar'], ['Bensin', 'Petrol']], answer: 2, explain: ['Gula polar dan dapat berikatan hidrogen dengan air.', 'Sugar is polar and can hydrogen-bond with water.'] },
    { lv: 'sma', q: ['Titik didih tertinggi dimiliki…', 'The highest boiling point belongs to…'], options: [['F₂', 'F₂'], ['Cl₂', 'Cl₂'], ['Br₂', 'Br₂'], ['I₂', 'I₂']], answer: 3, explain: ['I₂ memiliki elektron terbanyak sehingga gaya London terkuat (titik didih 184 °C).', 'I₂ has the most electrons, so the strongest London forces (boiling point 184 °C).'] },
    { lv: 'sma', q: ['Butana mendidih lebih tinggi daripada isobutana karena…', 'Butane boils higher than isobutane because…'], options: [['Massanya lebih besar', 'It is heavier'], ['Rantai lurus memberi luas kontak lebih besar', 'Its straight chain gives more contact area'], ['Ia berikatan hidrogen', 'It hydrogen-bonds'], ['Ia polar', 'It is polar']], answer: 1, explain: ['Keduanya C₄H₁₀, tetapi rantai lurus bersentuhan lebih luas sehingga gaya London lebih kuat.', 'Both are C₄H₁₀, but the straight chain touches more, giving stronger London forces.'] },
    { lv: 'sma', q: ['Molekul berikut yang nonpolar walaupun ikatannya polar adalah…', 'Which molecule is non-polar despite polar bonds?'], options: [['H₂O', 'H₂O'], ['NH₃', 'NH₃'], ['CO₂', 'CO₂'], ['HCl', 'HCl']], answer: 2, explain: ['CO₂ linear sehingga dua dipol C=O saling meniadakan.', 'CO₂ is linear, so the two C=O dipoles cancel.'] },
    { lv: 'sma', q: ['Es mengapung di air karena…', 'Ice floats on water because…'], options: [['Es lebih rapat', 'Ice is denser'], ['Ikatan hidrogen menyusun es dalam kisi yang renggang', 'Hydrogen bonds hold ice in an open lattice'], ['Es berisi udara', 'Ice contains air'], ['Air cair nonpolar', 'Liquid water is non-polar']], answer: 1, explain: ['Kisi heksagonal es lebih renggang sehingga massa jenisnya lebih kecil daripada air cair.', 'Ice’s hexagonal lattice is more open, so it is less dense than liquid water.'] },
    { lv: 'kuliah', q: ['Dalam potensial Lennard-Jones, suku −(σ/r)⁶ menggambarkan…', 'In the Lennard-Jones potential, the −(σ/r)⁶ term describes…'], options: [['Tolakan jarak pendek', 'Short-range repulsion'], ['Tarikan dispersi', 'Dispersion attraction'], ['Ikatan kovalen', 'Covalent bonding'], ['Gaya Coulomb ion', 'Ionic Coulomb force']], answer: 1, explain: ['Suku r⁻⁶ adalah tarikan van der Waals; suku r⁻¹² tolakan.', 'The r⁻⁶ term is van der Waals attraction; the r⁻¹² term is repulsion.'] },
    { lv: 'kuliah', q: ['Efek hidrofobik terutama didorong oleh…', 'The hydrophobic effect is driven mainly by…'], options: [['Tarikan kuat antarmolekul nonpolar', 'Strong attraction between non-polar molecules'], ['Kenaikan entropi air', 'An increase in the entropy of water'], ['Ikatan kovalen baru', 'New covalent bonds'], ['Tolakan ion', 'Ionic repulsion']], answer: 1, explain: ['Mengumpulkan molekul nonpolar membebaskan molekul air di sekitarnya sehingga entropi naik.', 'Clustering non-polar molecules frees the surrounding water, raising entropy.'] },
  ],
  teacher: {
    cp: ['Fase D–F: peserta didik menghubungkan jenis gaya antarmolekul dengan titik didih, kelarutan, dan sifat air.', 'Phases D–F: learners link intermolecular forces to boiling point, solubility and the properties of water.'],
    goals: [
      ['Mengenali gaya London, dipol–dipol, dan ikatan hidrogen pada molekul.', 'Identify London, dipole–dipole and hydrogen-bond forces in molecules.'],
      ['Membandingkan titik didih berdasarkan gaya antarmolekul.', 'Compare boiling points using intermolecular forces.'],
      ['Menjelaskan sifat istimewa air dengan ikatan hidrogen.', 'Explain water’s special properties with hydrogen bonding.'],
    ],
    duration: ['2 × 45 menit', '2 × 45 min'],
    steps: [
      ['Pemantik: klip mengapung di air lalu tenggelam setelah diberi sabun.', 'Hook: a paper clip floats on water, then sinks after soap is added.'],
      ['Percobaan laju penguapan air, alkohol, dan aseton (tetesan di kaca).', 'Experiment: evaporation rates of water, alcohol and acetone on glass.'],
      ['Analisis grafik titik didih hidrida dan halogen dari data PubChem.', 'Analyse boiling-point graphs of hydrides and halogens from PubChem data.'],
      ['Diskusi: mengapa danau membeku dari atas.', 'Discussion: why lakes freeze from the top.'],
    ],
    misconceptions: [
      ['"Saat air mendidih, ikatan O–H putus." Yang diputus adalah ikatan hidrogen antarmolekul; molekul H₂O tetap utuh.', '"Boiling water breaks O–H bonds." Only the hydrogen bonds between molecules break; H₂O molecules stay whole.'],
      ['"Ikatan hidrogen adalah ikatan kovalen dengan hidrogen." Ikatan hidrogen adalah gaya antarmolekul.', '"A hydrogen bond is a covalent bond to hydrogen." It is an intermolecular force.'],
      ['"Molekul berat selalu mendidih lebih tinggi." H₂O lebih ringan daripada H₂S tetapi mendidih jauh lebih tinggi.', '"Heavier molecules always boil higher." H₂O is lighter than H₂S but boils far higher.'],
    ],
    assessment: ['Kuis Kimialoka dan laporan percobaan penguapan dengan penjelasan gaya antarmolekul.', 'The Kimialoka quiz and an evaporation report explained with intermolecular forces.'],
  },
  refs: ['10-1-intermolecular-forces', '10-2-properties-of-liquids', '7-6-molecular-structure-and-polarity', 'oc:2-12-noncovalent-interactions-between-molecules'],
};
