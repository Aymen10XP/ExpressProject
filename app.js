const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON (important: this should be before routes)
app.use(express.json());

// Route GET simple
app.get('/bonjour', (req, res) => {
  res.send('Bonjour le monde !');
});

// Route avec parametre dynamique
app.get('/utilisateur/:nom', (req, res) => {
  const nom = req.params.nom;
  res.send(`Bienvenue, ${nom} !`);
});

// Route avec query string (?age=25)
app.get('/profil', (req, res) => {
  const age = req.query.age;
  res.send(`Tu as ${age} ans.`);
});

app.get('/', (req, res) => {
  res.send('Bonjour depuis Express !');
});

// Import and use the produits router
const produitsRouter = require('./routes/produits');
app.use('/api/produits', produitsRouter);



// Import and use the produits todos
const todosRouter = require('./routes/todos');
app.use('/api/todos', todosRouter);




// Middleware de log personnalise
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Passe au middleware suivant
});

// Middleware d'authentification sur une route
const verifierToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token !== 'secret123') {
    return res.status(401).json({ erreur: 'Non autorise' });
  }
  next();
};

app.get('/api/admin', verifierToken, (req, res) => {
  res.json({ message: "Acces accorde a l'admin" });
});

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Serveur Tlansa 3a http://localhost:${PORT}`);
});