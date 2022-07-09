const initialState = {
    videoGames: [],
    copyVideoGames: [],
    genres: [],
    detailVideoGame: [],
    plataformas: [],
    gameParam: []
}

const rootReducer = (state = initialState , action) =>{
    switch(action.type){
        case 'GET_VIDEOGAMES':
            // console.log('Entro al get_videogames de reducer')
            return { ...state , videoGames: action.payload , copyVideoGames: action.payload}
        case 'GET_GENRES':
            // console.log('Entro al get_genres de reducer')
            return { ...state , genres: action.payload}
        case 'FILTER_GENRES':
            // console.log('Entro al filter_genres de reducer')
            const copia = state.videoGames;
            // console.log('Copia antes del filtrado: ',copia)
            const generoFiltrado =  action.payload === 'Ninguno' ? copia : copia.filter( (e) =>  e.genres?.some(g => g.name === action.payload ))
            // console.log('Copia despues del Genero filtrado: ' ,generoFiltrado)
            return { ...state , copyVideoGames: generoFiltrado }
        case 'FILTER_CREATED':
            const copiaUno = state.videoGames
            // console.log('Entro al filter_created de reducer con copia uno: ' , copiaUno)
            const created = action.payload === 'Creados' ? copiaUno.filter(e => e.createdDb) 
                    : copiaUno.filter(e => !e.createdDb)
            // console.log('Filtro el juego creado: ' , created)
            return { ...state , copyVideoGames: created } //action.payload === 'Todos' ? state.copyVideoGames : /// action.payload === 'Todos' ? copiaUno : created
        case 'FILTER_ALFABETICO':
            // console.log('Entro al filter_alfabetico de reducer')
            let copyTwo = state.videoGames;
            // console.log('segunda Copia en FAlfabetico' , copyTwo)
            if(action.payload === 'Ninguno'){
                return {...state ,copyVideoGames: copyTwo }
            }else if(action.payload === 'Descendente'){
                copyTwo = state.copyVideoGames.flat(2).sort((a,b) =>{
                    if(a.name < b.name) return   1
                    if(a.name > b.name) return  -1
                    return 0
                })  
                // console.log('Copia descendente: ',copyTwo)
            }else if (action.payload === 'Ascendente'){
                copyTwo = state.copyVideoGames.flat(2).sort((a,b) =>{
                    if(a.name < b.name) return -1
                    if(a.name > b.name) return  1
                    return 0
                })
                // console.log('Copia Ascendente: ',copyTwo)
            }
            // console.log('La copiaTwo antes del return' , copyTwo)
            return {...state ,copyVideoGames: copyTwo }

            case 'FILTER_RATING':
            // console.log('Entro al filter_rating de reducer')
            let copyRating = state.videoGames;
            if(action.payload === 'Sin Diferencia'){
                return {...state , copyVideoGames: copyRating }
            }else if(action.payload === 'Menor'){
                copyRating = state.copyVideoGames.flat(2).sort((a,b) =>{
                    if(a.rating < b.rating) return  -1
                    if(a.rating > b.rating) return   1
                    return 0
                })  
            }else if (action.payload === 'Mayor'){
                copyRating = state.copyVideoGames.flat(2).sort((a,b) =>{
                    if(a.rating > b.rating) return  -1
                    if(a.rating < b.rating) return   1
                    return 0
                })  
            }
            return {...state , copyVideoGames: copyRating }
            case 'DETALLE_VIDEOGAME':
                // console.log('El payload',action.payload)
                return {...state , detailVideoGame: action.payload} 
            case 'PLATFORMS':
                // console.log("El action payload",action.payload)
                return {...state, plataformas: action.payload}
            case 'GAME_PARAMETER':
                return {...state , gameParam: action.payload}
            // case 'CREATE_VIDEOGAME':
            //         return {...state, videoGames: action.payload};    
        default:
             return state;
    }
}

export default rootReducer;