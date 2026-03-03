const express = require('express');
const router = express.Router();

const produits = [
 { id: 1, nom: 'Stylo', prix: 1.5 },
 { id: 2, nom: 'Cahier', prix: 3.0 },
 { id: 3, nom: 'Regle', prix: 2.0 },
];

router.use(express.json()); // Active la lecture du body JSON
router.post('/', (req, res) => {
 const { nom, prix } = req.body;
 if (!nom || !prix) {
 return res.status(400).json({ erreur: 'Nom et prix requis' });
 }
 const nouveauProduit = { id: produits.length + 1, nom, prix };
 produits.push(nouveauProduit);
 res.status(201).json(nouveauProduit);
});

// GET tous les produits
router.get('/', (req, res) => {
 res.json(produits);
});

// GET un produit par ID
router.get('/:id', (req, res) => {
 const id = parseInt(req.params.id);
 const produit = produits.find(p => p.id === id);
 if (!produit) {
 return res.status(404).json({ erreur: 'Produit non trouve' });
 }
 res.json(produit);
});

// PATCH un produit par ID
router.patch('/:id', (req, res)=>{
 const id = parseInt(req.params.id);
 const index = produits.findIndex(p => p.id === id);
 if (index ==-1) {
 return res.status(404).json({ erreur: 'Produit non trouve' });
 }
 const { nom, prix} = req.body;
 produits[index].nom = nom;
 produits[index].prix = prix;
 res.json(produits[index]);
});

// DELETE produit par ID
router.delete('/:id', (req, res)=>{
 const id = parseInt(req.params.id);
 const index = produits.findIndex(p => p.id === id);
 if (index == -1) {
 return res.status(404).json({ erreur: 'Produit non trouve' });
 }
 produits.splice(index,1);
 res.status(201).json({message: 'Produit supprime'});
});

module.exports = router;