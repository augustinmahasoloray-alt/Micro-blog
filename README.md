Horizone Journal — Mini Blog
Un blog immersif pour les voyageurs lents, avec articles, communauté, assistant conversationnel et avis intégrés.

📖 À propos du projet
Horizone Journal est une plateforme de blog.

Ce projet a été développé dans une approche full-stack avec un front-end statique (HTML, CSS, Tailwind, JavaScript pur) et un back-end léger (Node.js / Express) qui stocke les données des utilisateurs, des articles publiés et des avis dans Google Sheets (via l'API Google Sheets).

🌐 Lien de deploiment
 https://micro-blog-g4yiyg.fly.dev ou 
 https://horizone-journal.vercel.app/

✨ Fonctionnalités principales
🌐 Interface utilisateur
Carrousel héroïque avec diaporama automatique et navigation tactile

Mode sombre / clair persistant (préférence locale)

Internationalisation (français, anglais, espagnol) – les textes statiques sont traduits instantanément, et les contenus dynamiques le sont via l'API MyMemory

Barre de navigation fixe avec recherche, menu burger mobile et tiroir latéral

📝 Gestion des articles
Grille d’articles paginée (8 articles par défaut, mode « Explorer tout » pour une vue illimitée)

Filtres : recherche par mot-clé, catégorie, auteur

Tri : date, nombre de likes, nombre de commentaires (ordre croissant/décroissant)

Création d’articles (formulaire en ligne) – nécessite une authentification

Modification et suppression de ses propres articles

Favoris : sauvegarde d’articles dans une liste personnelle

Notifications toast pour les actions (favori, like, partage, etc.)

❤️ Interactions sociales
Likes (avec animation cœur) et compteur dynamique

Réactions (👍, ❤️, 😮) sur les articles

Notation par étoiles (de 1 à 5) avec moyenne affichée

Commentaires : lecture et publication sur chaque article (via lightbox)

Partage : copie du lien, partage sur Twitter et Facebook

🧠 Assistant conversationnel (chatbot)
Panneau de chat intégré dans la colonne de droite (bureau)

Interface mobile en overlay (bouton flottant)

Réponses contextuelles sur les articles, les favoris, les notes, etc. (backend requis)

📝 Avis des lecteurs
Section « Ce que disent les voyageurs » avec défilement continu (carrousel infini)

Modale de soumission d’avis (prénom, nom, email, note, message)

Les avis sont stockés dans Google Sheets et affichés en temps réel

🔐 Authentification
Inscription / Connexion avec JWT (stocké dans localStorage)

Upload d’avatar vers Cloudinary (signature sécurisée côté serveur)

Gestion de session : affichage du nom et de l’avatar dans la barre de navigation et le tiroir mobile

Déconnexion

🌍 Internationalisation (i18n)
Support de trois langues : anglais, français, espagnol

Traduction automatique des titres, descriptions et corps d’articles via MyMemory

Les textes de l’interface sont intégrés dans un dictionnaire statique

🎨 Design et expérience
Typographie personnalisée (Tahoma pour les titres, Helvetica pour le corps, IBM Plex Mono pour les compteurs)

Effets visuels : animations de défilement (reveal), transitions, micro-interactions sur les boutons

Responsive : adapté aux écrans mobiles, tablettes et ordinateurs

Accessibilité : balises ARIA, gestion des animations réduites

🛠️ Stack technique
Front-end
HTML5 / CSS3 (avec variables CSS pour les thèmes)

Tailwind CSS (via CDN)

JavaScript vanilla (ES6 modules, async/await)

Font Awesome et Devicon pour les icônes

Google Fonts (IBM Plex Mono)

Back-end
Node.js + Express

Google Sheets API (stockage des articles utilisateurs, avis)

JWT pour l’authentification

Cloudinary pour l’upload sécurisé des avatars (signature côté serveur)

Le front-end peut fonctionner en mode dégradé (articles fictifs, avis fictifs) même sans back-end, mais les fonctionnalités d’authentification, de publication et d’avis nécessitent un back-end actif.

🚀 Installation et lancement
1. Cloner le dépôt
bash
git clone https://github.com/augustinmahasoloray-alt/horizone-journal.git
cd horizone-journal
2. Configuration du back-end
Le back-end est disponible dans un dépôt séparé (ou dans un dossier backend). Suivez ses instructions pour :

Configurer les identifiants Google Sheets

Mettre en place la signature Cloudinary

Démarrer le serveur sur le port 3000 (ou autre)

Variables d’environnement (.env) à définir :

env
PORT=3000
JWT_SECRET=your_jwt_secret
GOOGLE_SHEETS_PRIVATE_KEY=...
GOOGLE_SHEETS_CLIENT_EMAIL=...
SPREADSHEET_ID=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
3. Lancer le front-end
Ouvrez simplement index.html dans un navigateur moderne, ou utilisez un serveur local (Live Server, http-server, etc.).

Le front-end est configuré pour appeler l’API sur https://horizone-backend-production.up.railway.app/api (déploiement Railway). Pour utiliser votre propre back-end, modifiez la constante API_BASE dans le fichier script.js en 
const API_BASE = "http://localhost:3001";

Ensuite taper : npm run dev ou node server.js + entrée

📁 Structure du projet (principaux fichiers)
text
/
├── index.html               # Page principale (structure HTML)
├── style.css                # Styles personnalisés (variables, animations, composants)
├── script.js                # Toute la logique JavaScript (articles, auth, chat, avis, i18n…)
└── README.md                # Ce fichier

🔧 Personnalisation et extensions
Ajout de nouvelles langues : étendre l’objet TRANSLATIONS dans script.js et ajouter l’option dans les sélecteurs de langue.

Modification du nombre d’articles par page : changer la variable articlesPerPage (ligne ~1120).

Changer les articles fictifs : modifier le tableau MOCK_ARTICLES et MOCK_TRANSLATIONS.

Adapter l’apparence : les variables CSS dans :root et html.dark permettent de modifier les couleurs et les polices.

📌 Points d’attention
L’API de traduction MyMemory est gratuite mais limitée en volume. En cas d’échec, les textes restent en anglais.

Les articles publiés via le front-end sont stockés dans Google Sheets (via le back-end) ; les données ne sont pas persistées en local.

Le chatbot nécessite une route /api/chat côté back-end ; si elle n’est pas implémentée, le bot répondra avec un message d’erreur.

👤 Auteur

GitHub : augustinmahasoloray-alt

Email : augustinmahasoloray@gmail.com