# Pré-requis

NPM version 6.13.4
Node version 12.15.0
Angular CLI version 8.3.25

# FullStack Project
​
Fonctionnalités : authentification, création de compte utilisateur ou freelance, modification du profil de l'utilisateur, recherche de freelances, affichage du profil d'un freelance
​
​
# User Stories
- En tant qu'utilisateur non-authentifié je veux pouvoir effectuer une recherche de freelances en fonction de la ville et de la compétence recherchées (mais je ne pourrai pas afficher leur profil)
​
- En tant qu'utilisateur je veux pouvoir créer un compte pour pouvoir me connecter.
- En tant qu'utilisateur je veux pouvoir me connecter
- En tant qu'utilisateur je veux pouvoir modifier mon profil
- En tant qu'utilisateur je veux pouvoir effectuer une recherche de freelances en fonction de la ville et de la compétence recherchées
- En tant qu'utilisateur je veux pouvoir afficher le profil d'un freelance pour pouvoir le contacter

- En tant que freelance je veux pouvoir créer un compte pour pouvoir me connecter.
- En tant que freelance je veux pouvoir me connecter
- En tant que freelance je veux pouvoir modifier mon profil
- En tant que freelance je veux pouvoir effectuer une recherche de freelances en fonction de la ville et de la compétence recherchées
- En tant que freelance je veux pouvoir afficher le profil d'un freelance pour pouvoir le contacter

- En tant qu'administrateur je veux pouvoir me connecter
- En tant qu'administrateur je veux pouvoir modifier mon profil
- En tant qu'administrateur je veux pouvoir effectuer une recherche de freelances en fonction de la ville et de la compétence recherchées
- En tant qu'administrateur je veux pouvoir afficher le profil d'un freelance pour pouvoir le contacter
- En tant qu'administrateur je veux pouvoir créer une ville
- En tant qu'administrateur je veux pouvoir créer une compétence
​
​
# instructions de mise en route (testé sous Windows 10)
Serveur :
1. Cloner le repository: `git clone https://github.com/birametgod/FBM_App.git`.
2. Se diriger vers le dossier de l'application qui vient d'être créé grâce à la commande `cd`.
3. Se diriger vers le dossier `backend` (à la racine du projet) grâce à la commande `cd`, puis lancer `npm install`.
4. Une fois la commande `npm install` terminée, exécuter la commande `npm start`(toujours dans le dossier `backend`). Lorsque le message `connected to database` apparait, cela signifie que le backend peut désormais être utilisé (`http://localhost:3000`).
5. Ouvrir un autre terminal (en laissant le terminal du backend en arrière-plan), puis se diriger vers le dossier de l'application, puis dans le dossier `frontend`(à la racine du projet) grâce à la commande `cd`.
6. Executer la commande `npm install`.
7. Une fois la commande `npm install` terminée, exécuter la commande `ng server --open`. Une fois cette commande terminée, une nouvelle page s'affichera dans le navigateur avec le frontend (`http://localhost:4200`).

La base de donnée est hébergée dans le cloud de MongoDB, il n'y a donc rien à faire de ce côté.
​
​
# Utilisations

1. Administrateur
    - Se connecter en utilisant les identifiants `birame.sene@ynov.com` en tant qu'adresse email, et `birame`en tant que mot de passe
    - Vous pouvez créer une ville ou une compétence via l'onglet `Admin`.
2. Utilisateur
    - Se créer un compte via l'onglet `M'inscrire`. ATTENTION: Pour pouvoir s'inscrire il faut avoir rempli tous les champs (même l'image) et vérifier qu'il n'y ai pas d'erreur (le téléphone doit commencer par `6` ou `7`et avoir 9 chiffres).
    - Pour modifier son compte, cliquer sur l'onglet `Mon Profil`, puis sur le bouton `Modifier` en bas du profil.
3. Freelance
    - Se créer un compte via l'onglet `Je suis freelance`. ATTENTION: Pour pouvoir s'inscrire il faut avoir rempli tous les champs (même l'image) et vérifier qu'il n'y ai pas d'erreur (le téléphone doit commencer par `6` ou `7`et avoir 9 chiffres, et le mail doit respecter la structure d'un email standard).
    - Pour modifier son compte, cliquer sur l'onglet `Mon Profil`, puis sur le bouton `Modifier` en bas du profil.
4. Effectuer une recherche
    - Cliquer sur l'onglet `Super Malt` (en haut à gauche). 
    - Commencer à taper la technologie, puis la sélectionner dans les propositions qui s'affichent au-dessous du champ.
    - Commencer à taper la ville, puis la sélectionner dans les propositions qui s'affichent au-dessous du champ.
    - Valider le formulaire.
    - La liste des freelances correspondant à la recherche s'affiche.
    - Vous pouvez filtrer cette liste grâce aux tags présents en haut de cette dernière. Il suffit de cocher une technologie et seuls les profils concernés par la recherche et par les tags apparaîtront.
    - Si vous êtes connectés, vous pouvez voir le profil d'un freelance en cliquant sur le bouton `Afficher` dans le bas de la carte du freelance concerné.