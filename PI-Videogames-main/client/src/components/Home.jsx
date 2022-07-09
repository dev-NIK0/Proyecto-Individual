import React from 'react';
import {useState, useEffect } from 'react';
import {useDispatch , useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

import { getVideoGames, genres , filterGenres, filterCreated , filterAlfabetico , filterRating } from '../actions';
import Card from './Card';
import Paginado from './Paginado'
import SearchBar from './SearchBar';

import './styles/Home.css';
import './styles/SearchBar.css';
import './styles/Card.css';


function Home(){
    const dispatch = useDispatch();
    const juegos = useSelector(state => state.copyVideoGames);
    // console.log(juegos)
    const generos = useSelector(state => state.genres);
    // console.log(generos)

    const [pagina,setPagina] = useState(1)
    const [videogame, setGame] = useState(15)

    const indexUltimo = pagina * videogame;
    const indexPrimero = indexUltimo - videogame;
    const game = juegos.slice(indexPrimero,indexUltimo) 

    const paginado = (numP) => {
        setPagina(numP)
    }

    function filterAlfabetic(event){
        event.preventDefault()
        if(event.target.value === 'Ninguno'){
            dispatch(getVideoGames(event.target.value))
        }else{
            dispatch(filterAlfabetico (event.target.value))
        }
    }

    function filterRate(event){
        event.preventDefault()
        if(event.target.value === 'Sin Diferencia'){
            dispatch(getVideoGames(event.target.value))
        }else{
            dispatch(filterRating (event.target.value))
        }
    }

    function filterCreado (event){
        event.preventDefault()
        dispatch(filterCreated (event.target.value))
        
    }


    function filterGenero(event){
        event.preventDefault()
        if(event.target.value === 'Ninguno'){
            dispatch(getVideoGames())
        }else{
            dispatch(filterGenres(event.target.value))
        }
    }

    useEffect( () => {
        dispatch(getVideoGames())
        dispatch(genres())
    },[dispatch])

    const gameParameter = useSelector(state => state.gameParam);

    return (
        <div className='divHome'> 
        <SearchBar/> 
        <div className='divbuttonToCreate'>
                    <Link to = '/home/crear-juego'>
                         <button  className='buttonToCreateGame'>
                         Create Video Game
                        </button>   
                    </Link>
        </div>
           
            
         <div className='filters'>
            <div >
                <h4>Alphabetic Order</h4>
                    <select onChange={ event => { filterAlfabetic(event)}} className='filterAlfabetic'>
                        <option value ='Ninguno'> Ninguno </option>
                        <option value ='Ascendente'> A-Z </option>
                        <option value ='Descendente' > Z-A </option>
                     </select>
                </div>

            <div>
                <h4>Rating Order</h4>
                    <select onChange={ event => { filterRate(event)}} className='filterRate'>
                        <option value ='Sin Diferencia'> Sin Diferencia </option>
                        <option value ='Mayor'> Por Mayor Rating </option>
                        <option value ='Menor' > Por Menor Rating </option>
                    </select>
            </div>

            <div>
                    <h4>All or Created Order</h4>
                    <select onChange={ event => { filterCreado(event)}} className='filterCreado'> 
                        <option value ='Todos'>Todos</option>
                        <option value ='Creados' >Creados</option>
                    </select>
            </div>

            <div>
                <h4>Genre Order</h4>
                    <select onChange={event => filterGenero(event)} className='filterGenero'>
                        <option value ='Ninguno' > Ninguno </option>
                        {
                            generos.map((e,i) => { 
                                return(
                                    <option value={e.name} key={i}> {e.name} </option>
                                )
                            }) 
                        }
                    </select>
            </div>
         
        </div>
            <br/>
                <div className='divGames'>
                    {
                        gameParameter.length? gameParameter.map((e,i) => {
                            return(
                                <Card img = {e.img} name = {e.name} genres ={e.genres} rating={e.rating} key={e.id}/>
                            )
                        }): game?.map((g,i) => {
                        // console.log(g.ID)
                        return (
                            <div key={i}>
                                <Link to ={`/home/${g.ID}`}>
                                <Card img = {g.img} name = {g.name} genres ={g.genres} rating={g.rating} key={g.id} className='homeCard'/>
                                </Link>
                            </div>
                        )
                    }) 
                    }
                </div>
            <div  className='divPaginado'>
                <Paginado videogame = {videogame} juegos ={juegos.length} paginado = {paginado} />
            </div>
                
        </div>
          
    )
}

export default Home; 
 
