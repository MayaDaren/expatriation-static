/*
 * www-cross-eco-cta : copie hebergee du script Webflow `crossecoctajs5` 1.2.1
 * (carte Accompagnement + carte Guide + lien comparateur du bloc
 * .cross-ecosystem-cta des articles de blog). Reprise a l'identique le
 * 5 septembre 2026, a une exception pres : la description du guide
 * France-Suisse porte desormais une espace insecable avant le deux-points.
 * Le script Webflow ne pouvait pas etre corrige sur place (source inline
 * plafonnee a 2000 caracteres, celle-ci en fait 2659).
 */
(function(){
var G={'france-suisse':{e:'GUIDE OPÉRATIONNEL · 59 EUR',t:'France → Suisse',d:"Le guide complet du couloir France-Suisse : les 5 décisions clés, les scénarios fiscaux, le plan d'adaptation sur 30 jours.",h:'https://app.expatriation.io/fr/guide-france-suisse',c:'Découvrir le guide →'}};
var C={'france-vs-ch-ge':'Genève','france-vs-ch-vd':'Vaud','france-vs-ch-zh':'Zurich','france-vs-ch-zg':'Zoug','france-vs-ch-bs':'Bâle-Ville','france-vs-ch-ti':'Tessin','france-vs-belgium':'Belgique','france-vs-luxembourg':'Luxembourg','france-vs-germany':'Allemagne','france-vs-netherlands':'Pays-Bas','france-vs-spain':'Espagne','france-vs-portugal':'Portugal','france-vs-italy':'Italie','france-vs-ireland':'Irlande','france-vs-united-kingdom':'Royaume-Uni','france-vs-monaco':'Monaco','france-vs-uae':'Émirats arabes unis','france-vs-morocco':'Maroc','france-vs-mauritius':'Maurice','france-vs-senegal':'Sénégal','france-vs-tunisia':'Tunisie','france-vs-usa-ca':'Californie','france-vs-usa-ny':'New York','france-vs-canada-qc':'Québec','france-vs-canada-on':'Ontario'};
var ACC={e:'ACCOMPAGNEMENT SUR MESURE',t:'Un projet, un interlocuteur',d:'Cartographie de votre projet, coordination des spécialistes, ancrage terrain. Le cabinet vous accompagne à chaque étape.',h:'https://accompagnement.expatriation.io',c:'Réserver un échange offert →'};
function init(){
document.querySelectorAll('.cross-ecosystem-cta .cards-grid').forEach(function(g){
if(!g.querySelector('.accompagnement-card')){
var a=document.createElement('div');
a.className='card accompagnement-card';
a.style.cssText='background:#fff;border:1px solid #af9646;';
a.innerHTML='<p class="card-eyebrow" style="color:#af9646;">'+ACC.e+'</p><h3 style="color:#131b2a;">'+ACC.t+'</h3><p style="color:#333;">'+ACC.d+'</p><a href="'+ACC.h+'" class="btn btn-accompagnement" style="color:#131b2a;background:#af9646;border-color:#af9646;" target="_blank" rel="noopener">'+ACC.c+'</a>';
g.insertBefore(a,g.firstChild);
}
var s=g.getAttribute('data-guide-slot');
if(s){var d=G[s];var c=g.querySelector('.guide-card');if(d&&c){c.innerHTML='<p class="card-eyebrow">'+d.e+'</p><h3>'+d.t+'</h3><p>'+d.d+'</p><a href="'+d.h+'" class="btn btn-purchase" target="_blank" rel="noopener">'+d.c+'</a>';}}
var cs=g.getAttribute('data-comparer-slot');
if(cs&&C[cs]){var aa=g.querySelector('a[href*="comparer-impots"]');if(aa){aa.setAttribute('href','https://app.expatriation.io/fr/comparer-impots/'+cs);var card=aa.closest('.card');if(card){var h=card.querySelector('h3');if(h){h.textContent='France → '+C[cs];}}}}
});
}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();