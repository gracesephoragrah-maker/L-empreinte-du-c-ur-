# L'Empreinte du Cœur — Grande Collecte Solidaire

Site vitrine de la **Grande Collecte Solidaire** organisée par *L'Empreinte du Cœur* à **Grand-Lahou (Rue Princesse)** :

- samedi 26 décembre 2026, de 11h à 16h
- dimanche 27 décembre 2026, de 10h à 16h

Le site permet de contacter l'équipe et de devenir bénévole via WhatsApp, de faire un don en ligne avec JEKO, de préparer sa liste de dons (vêtements, vivres, livres, jouets, fonds) et d'envoyer cette liste en un clic sur WhatsApp. Un compte à rebours suit l'événement.

## Technologies

React 19, TypeScript, Vite et Tailwind CSS 4. Le site est entièrement statique, sans serveur ni clé d'API.

## Démarrer en local

Prérequis : Node.js 20.19 ou plus récent.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # vérification TypeScript
npm run build    # génère le dossier dist/
npm run preview  # prévisualise la version de production
```

## Modifier les contenus

Tous les textes et réglages sont regroupés dans `src/data/collecteData.ts` :

- dates et horaires (`schedules`) et lieu ;
- numéro WhatsApp (`whatsappNumber`, format international sans le « + ») et téléphones (`phones`) ;
- lien de paiement JEKO (`jekoUrl`) ;
- listes de dons proposées (vêtements, livres, jouets, vivres, fonds).

Les dates du compte à rebours se trouvent en haut de `src/components/CountdownTimer.tsx` (heure de Grand-Lahou, GMT).

Les images sont dans `public/images/` (`logo.png`, `hands.jpg`) et les icônes du site dans `public/`.

## Mise en ligne sur GitHub Pages

1. Créez le dépôt GitHub et poussez le code sur la branche `main`.
2. Dans **Settings → Pages**, choisissez **Source : GitHub Actions**.
3. Chaque push sur `main` lance `.github/workflows/deploy.yml`, qui compile et publie le site.

Le site est ensuite disponible à l'adresse `https://<votre-compte>.github.io/<nom-du-depot>/`.
