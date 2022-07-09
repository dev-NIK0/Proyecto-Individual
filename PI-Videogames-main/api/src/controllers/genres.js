const { Router } = require('express');
const { infoApiGenres  } = require('./Logica');
const router = Router();

router.get('/genres', async (req,res,next) => {
    const generos = await infoApiGenres()
    // console.log(genres)
    try {
        res.status(202).json(generos)
    } catch (error) {
         res.status(404).send("Error no hay generos")
    }
  
})


module.exports = router;