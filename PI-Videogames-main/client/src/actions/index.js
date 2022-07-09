import axios from 'axios';
import { GET_VIDEOGAMES,
         GET_GENRES,
         FILTER_GENRES,
         FILTER_CREATED,
         FILTER_ALFABETICO,
         FILTER_RATING,
         DETALLE_VIDEOGAME,
         PLATFORMS,
         GAME_PARAMETER } from './constantes'

export function getVideoGames(){
    // console.log('Entro al getVideoGames del actions')
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/videogames',{})
        return dispatch({
            type: GET_VIDEOGAMES ,
            payload: json.data
        })
    }
}
export function genres(){
    // console.log('Entro al genres del actions')
    return async function(dispatch){
        
        const generos = await axios.get('http://localhost:3001/genres',{})
        return dispatch({
            type: GET_GENRES,
            payload: generos.data
        })
    }
}
export function filterGenres(payload){
//    console.log('Entro al filterGenres del actions con el payload' , payload)
    return {
            type: FILTER_GENRES,
            payload
    }
}
export function filterCreated(payload){
    // console.log('Entro al filterCreated del actions')
    return {
        type: FILTER_CREATED,
        payload
    }
}
export function filterAlfabetico(payload){
    return async function(dispatch){
        // console.log('Entro al filterAlfabetico del actions')
        dispatch({
            type: FILTER_ALFABETICO,
            payload: payload
        })
    }
}
export function filterRating(payload){
    return async function(dispatch){
        // console.log('Entro al filterRating del actions')
        dispatch({
            type: FILTER_RATING,
            payload: payload
        })
    }
}
export function detalleVideoGame(id){
    // console.log("El id antes del dispatch" , id)
    return async function(dispatch){
        try {
            const detailGame = await axios.get(`http://localhost:3001/videogames/${id}`);
            // console.log('Entro al actions y dio el id en detalleVideoGame' , detailGame.data)
            return  dispatch({
                type: DETALLE_VIDEOGAME,
                payload: detailGame.data
            })
        } catch (error) {
            return error
        }
        
    }

}

export function videoGameCreated(payload){
    return async function(){
        await axios.post('http://localhost:3001/videogames',payload)

    }
}

// export function videoGameCreated(payload){
//     return async (dispatch) =>{
//         try {
//             const creado = await axios('http://localhost:3001/videogames',payload);
//             dispatch({ 
//                 type: CREATE_VIDEOGAME, 
//                 payload: creado.data 
                
//             });console.log(payload)
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }
export function getAllPlatforms(){
    return async function(dispatch){
        const platform = await axios('http://localhost:3001/platforms',{})
        // console.log("Platform desde actions" , platform)
        const array = platform.data.map((e) => e)
        // console.log("Array de Platforms desde actions" , array)
        return dispatch({
                type: PLATFORMS,
                payload: array
        })
    }
   
}

export function gameParam(payload){
    return async (dispatch) => {
        try {
            const param = await axios(`http://localhost:3001/videogames?game=${payload}`)
            const arrayGame = param.data.map((e) => e)
        //    console.log("Data del game" , arrayGame)
           return dispatch({
                type: GAME_PARAMETER,
                payload: arrayGame
        }) 
        } catch (error) {
            return alert("Game doesn't exist")
        }
        
    }
 
}