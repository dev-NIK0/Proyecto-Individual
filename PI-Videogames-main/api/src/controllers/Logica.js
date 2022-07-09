const axios = require('axios');
// const e = require('express');
const APY_KEY = '5d154c4cca764ff7bf456ba4c1daa651';

const allVideoGames = async () => {

    try{
        let url = `https://api.rawg.io/api/games?key=${APY_KEY}`
        let page = `&page=`
        const juegos = []
        let paginas = [axios(url)]
        for (let i = 1; i < 5; i++) {
            let elemento = axios(url + page + (i + 1))
            paginas.push(elemento)
        }
        await Promise.all(paginas).then((r) => {
            r.map((r) => {
                let game = r.data.results.map(e => {
                return {
                        ID: e.id,
                        name: e.name,
                        img: e.background_image,
                        genres: e.genres.map((g) => { return { name: g.name  }}),
                        rating: e.rating,
                        platforms: e.platforms.map((e) => { return { name: e.platform.name}})
                    }
                })
                juegos.push(game)
            })
        })
        return juegos.flat()
    }catch(error){
        console.log(error)
    }
}

const gameParameter = async (game) => { //Busqueda exacta  -> en proceso.

    try {
        const apiParameter = await axios(`https://api.rawg.io/api/games?search=${game}&key=${APY_KEY}`);
        const parameter = apiParameter.data.results.filter(el => el.name.toLowerCase().includes(game.toLowerCase())).map( el => {
            return {
                ID: el.id,
                name: el.name,
                img: el.background_image,
                genres: el.genres.map((g) => g.name), 
                rating: el.rating 
            }
        
        })
        console.log(parameter)
        if(parameter.length < 1){
            throw new Error('Error kpo')
        }
        
        return parameter;
    } catch (error){
       throw new Error('Error kpo')
    }
}

const gameId = async (id) => {
    // try {
        const idParam = await axios(`https://api.rawg.io/api/games/${id}?key=${APY_KEY}`);
        // console.log(idParam)
        const idGame = [idParam.data];
        const mapeo = idGame.map((e) => { return {
             ID: e.id,
            name: e.name,
            rating: e.rating,
            img: e.background_image,
            released: e.released,
            platforms: e.platforms.map((e) => { return { name: e.platform.name  + ' '}}),
            genres: e.genres.map((g) => { return { name: g.name + ' '}}), 
            description: e.description_raw 
        }})
        return mapeo 
    // } catch (error) {
    //     throw new Error('Error , no se contro el id')
    // }
}

const {Genre} = require('../db')


const infoApiGenres = async () => { //Traigo informacion de la api y la guardo
    try {
        const apiGenres = await axios(`https://api.rawg.io/api/genres?key=${APY_KEY}`)
        const genres = apiGenres.data.results.map((e) => { return { name: e.name } })
        genres.map((e) => { Genre.findOrCreate({ where: {name: e.name}})})
        
        const genresDb = await Genre.findAll({attributes: ['ID','name']})
        return genresDb
    } catch (error) {
        throw new Error('Error no hay generos en la api')
    }  
}

// const infoDbGenres = async () => { //Traigo informacion de la base de datos 
//     await infoApiGenres()
//     try {
        
//         // console.log(genresDb)
//         return genresDb;
        
//     } catch (error) {
//         throw new Error('Error no hay generos en la db')
//     }  
// }

const {Videogame} = require('../db')

const searchInDb = async () => {
    try {
        const gameCreated = await Videogame.findAll({ include: { model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            }}})
       return gameCreated
    } catch (error) {
      return error  
    }
}


const concatAll = async () => {
    const concatenado = await searchInDb();
    const infApi = await allVideoGames();
    const allInfo = infApi.concat(concatenado)
    return allInfo
}

const getPlatforms = async () => {
    const juegos = await allVideoGames()
    // console.log(juegos)
    try{
        const plataformas = juegos.map((e) => e.platforms.map((e) => e)).flat()
        let objeto = {};
        const array = plataformas.filter((e) => objeto[e.name] ? false : objeto[e.name] = true)
         console.log('el array' , array)
        return array
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    allVideoGames,
    infoApiGenres,
    gameParameter,
    gameId,
    concatAll,
    getPlatforms
} 
// infoDbGenres,