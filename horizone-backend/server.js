import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const app = express();

// Middlewares
app.use(cors()); // Autoriser les requêtes CORS (pour le frontend)
app.use(express.json()); // Parser le JSON dans les requêtes

// Routes
import authRoutes from './routes/auth.js';
import uploadRoutes from './routes/upload.js';
import articleRoutes from './routes/articles.js';
import commentsRouter from './routes/comments.js';
import likesRouter from './routes/likes.js';

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/articles', commentsRouter);
app.use('/api/articles', likesRouter);

// Route de santé (pour vérifier que le serveur fonctionne)
app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: "Serveur en marche !" });
});

// Route pour le chatbot
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Le message est requis." });
    }

    // URL de l'API Groq (ou autre)
    const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
    const GROQ_MODEL = "openai/gpt-oss-120b";

    if (!process.env.GROQ_API_KEY) {
      console.error("Clé API Groq manquante dans .env");
      return res.status(500).json({ error: "Clé API manquante." });
    }

    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: "system",
            content: "You are Journal Assistant. You help visitors find articles, summarize articles, answer questions, and explain blog topics. Answer in the same language as the user."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erreur Groq :", errorData);
      return res.status(500).json({
        error: errorData?.error?.message || "Erreur avec l'API Groq."
      });
    }

    const data = await response.json();
    res.json({
      reply: data.choices[0].message.content
    });

  } catch (error) {
    console.error("Erreur dans /api/chat :", error);
    res.status(500).json({
      error: "Impossible de contacter l'API Groq.",
      details: error.message
    });
  }
});

// Gestion des erreurs 404 (route non trouvée)
app.use((req, res) => {
  res.status(404).json({ error: "Route non trouvée." });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Serveur en marche sur http://localhost:${PORT}`);
});