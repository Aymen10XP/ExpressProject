const express = require('express');
const router = express.Router();

// Initial todos data
let todos = [
  { id: 1, tache: 'Apprendre Express', termine: false },
  { id: 2, tache: 'Faire les courses', termine: true },
  { id: 3, tache: 'Préparer le déjeuner', termine: false },
];

// GET tous les todos
router.get('/', (req, res) => {
  res.json(todos);
});

// GET un todo par ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ erreur: 'Todo non trouvé' });
  }
  res.json(todo);
});

// POST ajouter un nouveau todo
router.post('/', (req, res) => {
  const { tache, termine } = req.body;
  
  if (!tache) {
    return res.status(400).json({ erreur: 'La tâche est requise' });
  }
  
  const nouveauTodo = {
    id: todos.length + 1,
    tache: tache,
    termine: termine || false // Default to false if not provided
  };
  
  todos.push(nouveauTodo);
  res.status(201).json(nouveauTodo);
});

// PUT modifier un todo existant
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { tache, termine } = req.body;
  
  // Find the todo index
  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ erreur: 'Todo non trouvé' });
  }
  
  // Update the todo
  if (tache !== undefined) {
    todos[todoIndex].tache = tache;
  }
  
  if (termine !== undefined) {
    todos[todoIndex].termine = termine;
  }
  
  res.json(todos[todoIndex]);
});

// DELETE supprimer un todo
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  // Find the todo index
  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ erreur: 'Todo non trouvé' });
  }
  
  // Remove the todo
  const todoSupprime = todos[todoIndex];
  todos = todos.filter(t => t.id !== id);
  
  res.json({ 
    message: 'Todo supprimé avec succès',
    todo: todoSupprime 
  });
});

module.exports = router;