const { Router } = require('express');
const router = Router();

const { Videogame , Genre } = require('../db');

const {gameId} = require('./Logica')

router.get('/videogames/:id' , async (req,res,next) =>{
    
    const {id} = req.params // id que se pasa por parametros

    try {
        // console.log("id de Juego" , id)
        if(id.includes('-')){
           let gameSearched = await Videogame.findByPk(id,{
            include: {
                model: Genre,
                attributes: ['name'],
                through: {
                  attributes: []
                }
            }})

        //    console.log(gameSearched)
           let gameOnArray = [gameSearched]
           return res.status(202).json(gameOnArray)
        }else{
            const juego = await gameId(id);
            res.status(202).json(juego)
        }
       
    } catch (error) {
        res.status(404).send(error.message)
    }
    
})

module.exports = router;

