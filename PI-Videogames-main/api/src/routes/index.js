const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogames = require('../controllers/videogames');
const detail = require('../controllers/detail');
const newVideoGame = require('../controllers/newVideoGame');
const genres = require('../controllers/genres');
const plataformas = require('../controllers/plataformas')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(videogames);
router.use(detail);
router.use(newVideoGame);
router.use(genres);
router.use(plataformas);


module.exports = router;
