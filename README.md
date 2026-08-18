1. Présentation
Ce projet est un blog dynamique avec un backend Express et un frontend statique (HTML/CSS/JS). Il permet aux utilisateurs de s’authentifier, de publier des articles, de les commenter, de les liker, d’uploader des images (via Cloudinary) et de discuter avec un assistant (chatbot) basé sur l’API Groq. Les données des utilisateurs sont stockées dans Google Sheets.

2. Technologies utilisées
Node.js / Express

JWT (jsonwebtoken) pour l’authentification

Cloudinary (upload d’images)

Google Sheets API (stockage utilisateurs)

Groq API (chatbot)

HTML / CSS / JavaScript (frontend)

3. Prérequis
Node.js (version 14+)

Un navigateur web

(Optionnel) Un serveur local comme Live Server pour le frontend

4. Installation
Clonez le dépôt, puis installez les dépendances du backend :

bash
npm install
5. Configuration
Créez un fichier .env à la racine du backend en vous basant sur l’exemple ci-dessous.
Remplacez les valeurs par vos propres identifiants (ne committez jamais ce fichier).

env
# Serveur
PORT=3001

# JWT
JWT_SECRET=votre_secret_jwt

# Google Sheets
GOOGLE_SHEET_ID=votre_google_sheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=votre_service_account_email
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nvotre_cle_privee\n-----END PRIVATE KEY-----\n"

# Cloudinary
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret

# Groq (chatbot)
GROQ_API_KEY=votre_cle_groq
6. Exécution
Backend
Lancez le serveur avec :

bash
npm run dev

Frontend
Le frontend est composé du fichier index.html (ainsi que script.js et style.css).
Pour l’exécuter :

Option 1 : ouvrez simplement index.html dans votre navigateur.

Option 2 : utilisez une extension comme Live Server (VS Code) pour servir le fichier sur un port local.

Le frontend communique avec le backend via les appels API ; assurez-vous que le serveur backend est bien lancé avant d’utiliser l’application.

7. Accès à l'application
Backend : http://localhost:3001 (exemple : http://localhost:3001/api/health pour vérifier)

Frontend : ouvrez index.html dans votre navigateur (ou via Live Server, par exemple http://127.0.0.1:5500/index.html)

8. Fonctionnalités principales
Authentification : inscription / connexion (JWT)

Gestion des articles : création, consultation, modification (via les routes /api/articles)

Commentaires : ajout et affichage (routes /api/articles/comments)

Likes : aimer / retirer un like (routes /api/articles/likes)

Upload d’images : via Cloudinary (route /api/upload)

Chatbot : assistant intelligent utilisant Groq (route /api/chat)

Intégration Google Sheets : stockage des données utilisateurs

Santé du serveur : endpoint /api/health pour vérifier le bon fonctionnement