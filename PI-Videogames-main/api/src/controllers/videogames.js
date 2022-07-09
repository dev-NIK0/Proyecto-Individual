const { Router } = require('express');
const router = Router();

const { gameParameter, concatAll} = require('./Logica')
// const axios = require('axios');
// const APY_KEY = '5d154c4cca764ff7bf456ba4c1daa651';

// const allVideoGames = async () => {
//     try{
        
//         let url = `https://api.rawg.io/api/games?key=${APY_KEY}`
//         let page = `&page=`
//         const juegos = []
//         let paginas = [axios(url)]
//         for (let i = 1; i < 5; i++) {
//             let elemento = axios(url + page + (i + 1))
//             paginas.push(elemento)
//         }
//         await Promise.all(paginas).then((r) => {
//             r.map((r) => {
//                 let game = r.data.results.map(e => {
//                 return {
//                         name: e.name,
//                         img: e.background_image,
//                         genres: e.genres.map((g) => g.name), 
//                     }
//                 })
//                 juegos.push(game)
//             })
//         })
//         return juegos.flat()
//     }catch(error){
//         console.log(error)
//     }
// }

// const gameParameter = async (game) => { //Busqueda exacta  -> en proceso.
//     try {
//         const apiParameter = await axios(`https://api.rawg.io/api/games?search=${game}&key=${APY_KEY}`);
//         const parameter = apiParameter.data.results.filter(el => el.name.toLowerCase().includes(game.toLowerCase())).map( el => {
//             return {
//                 name: el.name,
//                 img: el.background_image,
//                 genres: el.genres.map((g) => g.name), 
//             }
        
//         })
//         console.log(parameter)
//         if(parameter.length < 1){
//             throw new Error('Error kpo')
//         }
//         return parameter;
//     } catch (error){
//        throw new Error('Error kpo')
//     }
// }

router.get('/videogames' , async (req,res,next) =>{
    
    const {game} = req.query;
    const allGames = await concatAll();

    if(game){
        try {
            const gamesParameter = await gameParameter(game);
            res.status(202).json(gamesParameter);
        } catch (error) {
            res.status(404).send(error.message)
        }
    }else{
        try {
            res.status(202).json(allGames);
        } catch (error) {
            next(error)
        }
        
    }
})

// router.get('/:id' , async (req,res,next) =>{
    
//     const id = req.params.id // id que se pasa por parametros

//     try {
//         const juego = await gameId(id);
//         res.status(202).json(juego)
//         } catch (error) {
//         res.status(404).send(error.message)
//     }
    
// })

module.exports = router;

