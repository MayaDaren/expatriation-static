# expatriation-static

Scripts chargés par www.expatriation.io et www.expat-ukraine.com (`ukr/`), servis par jsDelivr, **épinglés par SHA de commit** (immuable, même si un tag ou une règle venait à changer) :

    https://cdn.jsdelivr.net/gh/MayaDaren/expatriation-static@<sha du commit>/<chemin>

En service (08/11/2026) : v1.0.0 = `2917a3768b9a6515d6c44b3f00084ad81a9783b8` (www), v1.1.0 = `1c981f3c8ff0ef07bc1a43ec1006e555567f7a2f` (expat-ukraine).

Depuis le 08/11/2026 vers 13:10 (Paris), `js/www-cross-eco-cta.js` est servi en v1.2.0 = `619301615a0ceb8e5a506bf655de76921ca067ed` (script Webflow `wwwcrossecocta` 1.3.0, Blog Template) : la carte Guide France-Suisse annonce un guide offert. Les autres scripts www restent en v1.0.0.

Depuis le 16/11/2026 (production www vers 03:30, Paris), `js/www-cross-eco-cta.js` est servi en v1.3.0 = `8f49cd69685408a88f88ef5a63aaa383913188c0` (script Webflow `wwwcrossecocta` 1.4.0, Blog Template, `sha384-TQLHJhz0thkCzlX6n+NLoV0n0Z9tpRTDgXRd2Nrr6A1prVPFs45t91PkFMb9ny6p`) : la carte Guide France-Suisse dit « le bon réflexe à adopter dans chacune ».

Depuis le 18/11/2026 (production expat-ukraine vers 20:15, Paris) :

- `ukr/ukrbilanband6.js` est servi en v1.4.0 = `2c78e88efabcf7e2c33f98b596bba7668e83f028` (script Webflow `ukrbilanband6` 1.3.0, `sha384-adc/OC0IoDO3zbLY4dl7GtOLgUqhjYtcUI2fZY+5IycCVBLaMgFAsuyILqZP6yn2`) : « les éventuels scénarios écartés ».
- `ukr/ukrnavwww1.js` est servi en v1.5.0 = `843c653b0f47e81f9e6aa84502e115e941e39f21` (script Webflow `ukrnavwww1` 1.1.0, en-tête, `sha384-3rmyKEcjtmExALDM7ziVo957GgK70xo2NVF1YKNKt/bHpBjn1SI348ACDcNkz5Qg`) : menu d'expat-ukraine identique à celui de www (barre, filet or, liens, recherche, menu mobile), menu mobile en Arial. Il remplace le script inline `ukrnavcenter2`. Le commit intermédiaire `93971cf` n'a servi qu'en staging.

Depuis le 18/11/2026 vers 20:28 (Paris), `ukr/ukrnavwww1.js` est servi en v1.6.0 = `2c6c8b8adcd32aaa091329fced50528d65e0f01a` (script Webflow `ukrnavwww1` 1.2.0, `sha384-wcLFCs2RKZV/oUP01Dp2dgnbM3Kmsj6wbEW2svddZS+SUzAGm4QLaZwwfJxPq+kY`) : logo EXPAT UKRAINE à 60 px, loupe de recherche identique à celle de www.

Depuis le 19/11/2026 vers 00:02 (Paris), `ukr/ukrnavwww1.js` est servi en v1.7.0 = `2c51cc22fcbdf2716af5ad230075c2979bb6eb34` (script Webflow `ukrnavwww1` 1.3.0, `sha384-04dNwzQSPobiKzX1gkobDKCSksVJkysKVRtZ/0pwMEn1Y55fIc/e7vpnL3Z2Ff9n`) : liens du menu aux valeurs de 1440 px (14 px, 1,68 px, padding 5/14 px) dès 992 px, paliers fins des liens retirés, paliers de largeur de la recherche gardés.

Ils étaient servis par app.expatriation.io (Vercel) jusqu'au 08/11/2026. La suspension du compte Vercel le 06/11 a fait disparaître le bandeau de consentement, GA4 et les bandes de www.

## Règles

- **Un tag publié ne change jamais** : un ruleset GitHub « Tags immuables » interdit de supprimer ou déplacer un tag, et `main` refuse les force-push (aucune exception, propriétaire compris). Webflow fige un hash SRI (`integrity="sha384-..."`) pour chaque script. Un fichier modifié sous le même tag serait refusé par le navigateur, et la surface disparaîtrait sans bruit.
- Pour changer un fichier : commit, nouveau tag (`v1.2.0`, ...), URL au SHA du commit, calcul du hash (`openssl dgst -sha384 -binary <fichier> | base64`), nouvelle version du script enregistré dans Webflow avec la nouvelle URL et le nouveau hash, puis publication.
- `tarteaucitron/` charge `lang/`, `css/` et `tarteaucitron.services.js` depuis son propre dossier, SANS hash SRI : c'est pourquoi l'URL est épinglée au commit. Garder l'arborescence.
- Source d'origine : `public/js/` et `public/tarteaucitron/` d'expatriation-app (commit 3be205f) ; `ukr/ukrbilanband6.js` vient de `public/js/` d'accompagnement-expatriation-astro (tag v1.1.0, 08/11/2026). Ces copies dans l'app et dans accompagnement ne sont plus chargées par www ni par expat-ukraine.
