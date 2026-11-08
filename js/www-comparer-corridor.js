/* www-comparer-corridor.js
 *
 * Specialise la carte « Comparaison fiscale » des articles du blog www vers le
 * corridor renseigne dans le champ CMS « Comparer associe ».
 *
 * POURQUOI CE SCRIPT EXISTE. Le gabarit Blog expose deja ce champ sur la grille
 * de fin d article, en data-comparer-slot, et pose data-has-comparer. Il
 * n existait aucun code pour s en servir : verifie le 23/08/2026 sur quatre
 * articles qui portent le champ depuis juillet, en HTML servi comme apres
 * hydratation, zero lien corridor rendu sur 22 articles renseignes. La carte
 * restait generique et pointait le hub, quel que soit le corridor.
 *
 * CE QU IL FAIT. Il ne cree ni ne deplace aucun element : il reecrit le titre,
 * la phrase et la destination de la carte deja presente. Un article sans
 * corridor garde la carte generique, ce qui est le comportement voulu.
 *
 * SOURCE DE VERITE. Le slug vient du DOM, donc du CMS. Les deux tables ci
 * dessous ne servent qu a VALIDER ce slug et a nommer les juridictions en
 * francais. Un slug absent de PAIRS laisse la carte intacte plutot que de
 * produire un lien mort ; un nom manquant specialise quand meme le lien et
 * laisse la copie generique.
 *
 * REGENERER LES TABLES depuis la source de verite de l app :
 *   node -e "import('./src/data/taxComparison.ts').then(m=>{const p=m.getTopComparisonPairs();
 *     console.log(JSON.stringify(p.map(x=>x.id1+'-vs-'+x.id2)));
 *     const n={};for(const x of p){for(const id of [x.id1,x.id2]) n[id]=m.getJurisdiction(id).nameFr;}
 *     console.log(JSON.stringify(n));})"
 * Toute regeneration change le fichier, donc son hash SRI : re-enregistrer le
 * script cote Webflow (nouvel id, remove puis add, republication).
 *
 * Genere le 2026-08-24 : 110 paires, 59 juridictions.
 */
(function () {
  'use strict';
  var PAIRS = ["france-vs-ch-ge","france-vs-ch-vd","france-vs-ch-zh","france-vs-ch-zg","france-vs-ch-bs","france-vs-ch-ti","france-vs-belgium","france-vs-luxembourg","france-vs-germany","france-vs-netherlands","france-vs-spain","france-vs-portugal","france-vs-italy","france-vs-ireland","france-vs-united-kingdom","france-vs-monaco","france-vs-greece","france-vs-canada-qc","france-vs-canada-on","france-vs-canada-bc","france-vs-usa-ny","france-vs-usa-ca","france-vs-uae","france-vs-morocco","france-vs-senegal","france-vs-tunisia","france-vs-mauritius","france-vs-qatar","france-vs-hong-kong","france-vs-singapore","france-vs-thailand","france-vs-ukraine","france-vs-madagascar","france-vs-indonesia","united-kingdom-vs-uae","united-kingdom-vs-usa-ny","united-kingdom-vs-usa-ca","united-kingdom-vs-usa-tx","united-kingdom-vs-ireland","united-kingdom-vs-ch-zh","australia-vs-united-kingdom","united-kingdom-vs-ch-ge","united-kingdom-vs-germany","united-kingdom-vs-netherlands","united-kingdom-vs-canada-on","united-kingdom-vs-canada-bc","germany-vs-ch-zh","germany-vs-ch-zg","germany-vs-austria","germany-vs-netherlands","germany-vs-usa-ca","usa-ca-vs-usa-tx","usa-ny-vs-usa-fl","usa-ca-vs-usa-wa","usa-ca-vs-usa-ny","usa-ny-vs-usa-nj","usa-ca-vs-usa-nv","usa-ca-vs-usa-fl","usa-ny-vs-usa-tx","usa-il-vs-usa-tx","usa-ma-vs-usa-nh","usa-co-vs-usa-tx","canada-qc-vs-canada-on","canada-qc-vs-canada-bc","canada-on-vs-canada-bc","canada-on-vs-canada-ab","canada-qc-vs-canada-ab","ch-ge-vs-ch-zg","ch-ge-vs-ch-zh","ch-ge-vs-ch-vd","ch-zh-vs-ch-zg","ch-bs-vs-ch-zh","ch-ti-vs-ch-zh","usa-ca-vs-ch-ge","usa-ca-vs-ch-zh","usa-ny-vs-ch-ge","canada-qc-vs-ch-ge","canada-on-vs-usa-ny","canada-on-vs-usa-ca","canada-bc-vs-usa-wa","belgium-vs-luxembourg","belgium-vs-netherlands","portugal-vs-spain","portugal-vs-uae","germany-vs-uae","italy-vs-ch-ti","sweden-vs-denmark","sweden-vs-norway","denmark-vs-norway","czech-republic-vs-germany","poland-vs-germany","morocco-vs-uae","morocco-vs-canada-qc","tunisia-vs-canada-qc","algeria-vs-france","algeria-vs-canada-qc","senegal-vs-canada-qc","cote-d-ivoire-vs-france","uae-vs-usa-tx","uae-vs-usa-fl","georgia-vs-uae","cyprus-vs-malta","cyprus-vs-portugal","malta-vs-portugal","greece-vs-cyprus","greece-vs-portugal","germany-vs-greece","united-kingdom-vs-greece","hungary-vs-czech-republic","romania-vs-poland"];
  var NAMES = {"algeria":"Algérie","australia":"Australie","austria":"Autriche","belgium":"Belgique","canada-ab":"Alberta","canada-bc":"Colombie-Britannique","canada-on":"Ontario","canada-qc":"Québec","ch-bs":"Bâle-Ville","ch-ge":"Genève","ch-ti":"Tessin","ch-vd":"Vaud","ch-zg":"Zoug","ch-zh":"Zurich","cote-d-ivoire":"Côte d’Ivoire","cyprus":"Chypre","czech-republic":"République tchèque","denmark":"Danemark","france":"France","georgia":"Géorgie","germany":"Allemagne","greece":"Grèce","hong-kong":"Hong Kong","hungary":"Hongrie","indonesia":"Indonésie","ireland":"Irlande","italy":"Italie","luxembourg":"Luxembourg","madagascar":"Madagascar","malta":"Malte","mauritius":"Maurice","monaco":"Monaco","morocco":"Maroc","netherlands":"Pays-Bas","norway":"Norvège","poland":"Pologne","portugal":"Portugal","qatar":"Qatar","romania":"Roumanie","senegal":"Sénégal","singapore":"Singapour","spain":"Espagne","sweden":"Suède","thailand":"Thaïlande","tunisia":"Tunisie","uae":"Émirats arabes unis","ukraine":"Ukraine","united-kingdom":"Royaume-Uni","usa-ca":"Californie","usa-co":"Colorado","usa-fl":"Floride","usa-il":"Illinois","usa-ma":"Massachusetts","usa-nh":"New Hampshire","usa-nj":"New Jersey","usa-nv":"Nevada","usa-ny":"New York","usa-tx":"Texas","usa-wa":"Washington"};

  function specialise() {
    var grid = document.querySelector('[data-comparer-slot]');
    if (!grid) return;
    var slug = (grid.getAttribute('data-comparer-slot') || '').trim();
    if (!slug || PAIRS.indexOf(slug) === -1) return;

    var link = grid.querySelector('a[href*="/comparer-impots"]');
    if (!link) return;
    var card = link.closest ? link.closest('.card') : null;
    if (!card) return;

    link.setAttribute('href', 'https://app.expatriation.io/fr/comparer-impots/' + slug);

    var parts = slug.split('-vs-');
    var a = NAMES[parts[0]];
    var b = NAMES[parts[1]];
    if (a && b) {
      var h = card.querySelector('h3');
      if (h) h.textContent = a + ' vs ' + b;
      var p = card.querySelector('p:not(.card-eyebrow)');
      if (p) {
        p.textContent = 'Salaire net, imp\u00f4ts et co\u00fbt de la vie compar\u00e9s c\u00f4te \u00e0 c\u00f4te, '
          + 'au m\u00eame salaire brut, entre ' + a + ' et ' + b + '.';
      }
      link.textContent = 'Comparer ' + a + ' et ' + b + ' \u2192';
    }
    grid.setAttribute('data-comparer-rendered', slug);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', specialise);
  } else {
    specialise();
  }
})();
