// Deployment settings. Everything else is configured through the server environment (see README).
export const CONFIG = {
  donateLocalURL: 'https://saweria.co/asadin02',
  donateInternationalURL: 'https://ko-fi.com/asadin02',
  feedbackURL: 'https://github.com/asaddin02/asadin-edu-kimialoka/issues',
  // Source code link shown in "About" (update after renaming the GitHub repository).
  repository: 'https://github.com/asaddin02/asadin-edu-kimialoka',
  // Official, free, key-less data sources.
  pubchem: 'https://pubchem.ncbi.nlm.nih.gov/',
  wikidata: 'https://www.wikidata.org/w/api.php',
  sparql: 'https://query.wikidata.org/sparql',
  commons: 'https://commons.wikimedia.org/w/api.php',
  // When the Node server or the Cloudflare Function is present, PubChem calls go through this caching
  // proxy (it paces requests so a whole classroom behind one IP stays under PubChem's 5 requests/second).
  proxy: 'api/pubchem/',
};
