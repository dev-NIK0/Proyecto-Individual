const { Router } = require('express');
const router = Router();

const {Videogame,Genre} = require('../db')

router.post('/videogames', async (req,res) => {
   const {name,description,released,rating,genres,platforms,img} = req.body;
   const generos = await Genre.findAll({where: { name: genres}})
    if(!name || !description || !released || !rating || !platforms){
         console.log("Faltan Datos")
        return res.status(404).send('Faltan Datos')
    }

    try {
        
        const videoGameCreated = await Videogame.create({ ...req.body})
        videoGameCreated.addGenre(generos)

        return res.status(202).json(videoGameCreated)

    } catch (error) {
        return res.status(404).send(error.message)
    } 
})  

module.exports = router