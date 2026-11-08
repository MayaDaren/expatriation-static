# expatriation-static

Scripts chargés par www.expatriation.io et www.expat-ukraine.com (`ukr/`), servis par jsDelivr, **épinglés par SHA de commit** (immuable, même si un tag ou une règle venait à changer) :

    https://cdn.jsdelivr.net/gh/MayaDaren/expatriation-static@<sha du commit>/<chemin>

En service (08/11/2026) : v1.0.0 = `2917a3768b9a6515d6c44b3f00084ad81a9783b8` (www), v1.1.0 = `1c981f3c8ff0ef07bc1a43ec1006e555567f7a2f` (expat-ukraine).

Ils étaient servis par app.expatriation.io (Vercel) jusqu'au 08/11/2026. La suspension du compte Vercel le 06/11 a fait disparaître le bandeau de consentement, GA4 et les bandes de www.

## Règles

- **Un tag publié ne change jamais** : un ruleset GitHub « Tags immuables » interdit de supprimer ou déplacer un tag, et `main` refuse les force-push (aucune exception, propriétaire compris). Webflow fige un hash SRI (`integrity="sha384-..."`) pour chaque script. Un fichier modifié sous le même tag serait refusé par le navigateur, et la surface disparaîtrait sans bruit.
- Pour changer un fichier : commit, nouveau tag (`v1.2.0`, ...), URL au SHA du commit, calcul du hash (`openssl dgst -sha384 -binary <fichier> | base64`), nouvelle version du script enregistré dans Webflow avec la nouvelle URL et le nouveau hash, puis publication.
- `tarteaucitron/` charge `lang/`, `css/` et `tarteaucitron.services.js` depuis son propre dossier, SANS hash SRI : c'est pourquoi l'URL est épinglée au commit. Garder l'arborescence.
- Source d'origine : `public/js/` et `public/tarteaucitron/` d'expatriation-app (commit 3be205f) ; `ukr/ukrbilanband6.js` vient de `public/js/` d'accompagnement-expatriation-astro (tag v1.1.0, 08/11/2026). Ces copies dans l'app et dans accompagnement ne sont plus chargées par www ni par expat-ukraine.
