const express = require('express');
const app = express();
const PORT = 3000;

const produits = [
 { id: 1, nom: 'Stylo', prix: 1.5 },
 { id: 2, nom: 'Cahier', prix: 3.0 },
 { id: 3, nom: 'Regle', prix: 2.0 },
];


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


// GET tous les produits
app.get('/api/produits', (req, res) => {
 res.json(produits);
});

// GET un produit par ID
app.get('/api/produits/:id', (req, res) => {
 const id = parseInt(req.params.id);
 const produit = produits.find(p => p.id === id);
 if (!produit) {
 return res.status(404).json({ erreur: 'Produit non trouve' });
 }
 res.json(produit);
});





app.use(express.json()); // Active la lecture du body JSON
app.post('/api/produits', (req, res) => {
 const { nom, prix } = req.body;
 if (!nom || !prix) {
 return res.status(400).json({ erreur: 'Nom et prix requis' });
 }
 const nouveauProduit = { id: produits.length + 1, nom, prix };
 produits.push(nouveauProduit);
 res.status(201).json(nouveauProduit);
});

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