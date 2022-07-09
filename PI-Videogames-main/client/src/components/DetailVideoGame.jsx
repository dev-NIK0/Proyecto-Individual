import React , {useEffect}from 'react';
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import { detalleVideoGame} from '../actions'
import './styles/DetailVideoGame.css';

export default function DetailVideoGame(){

    const {id} = useParams() 

    const dispatch = useDispatch();

    const detalle = useSelector (state => state.detailVideoGame); 
    // const [componente,setComponente] = useState(detalle)
    console.log("detalle" , detalle)
   useEffect(() => {
        dispatch(detalleVideoGame(id))
    }, [dispatch,id])

    useEffect(() => {
        return () => { detalle.pop()}
    }, [detalle])

    return(
        <div className='detailVideoGame'>
            <div>
                <Link to='/home' >
                    <button className='buttonVolverAtras'>Volver Atras</button>
                 </Link>
                 
            </div>
            
            { 
                detalle? detalle.map((e,i) => { 
                    return (
                        <div key={i}>
                            <h2 className='h2Detail'>{e.name}</h2>
                            <div className='imgDetail'>
                                <img src = {e.img} width="250px" height="250px" className='imgD' /> 
                            </div>
                            <div className='detailsGame'>
                                <div className='generos'>
                                    <h3 className='genre'>Genre</h3>
                                    {
                                    
                                        detalle.map((e,i) => e.genres.map( e =>  { return (
                                            <p className='pGen' key={i}>{e.name}</p>
                                        )}))
                                    }
                                </div>

                                 <div className='lanzamiento'>
                                     <h3 className='released'>Released</h3>
                                        <p  className='pReleased'>{e.released} </p> 
                                </div>

                                <div className='numRating'>
                                    <h3 className='rating'>Rating</h3>
                                        <p className='prating'>{e.rating}</p>
                                </div>
                                
                               
                            </div>
                            <div className='divPlataformas'>
                                <h3 className='platforms'>Platforms</h3>
                                    <div className='plataformas'>
                                    {
                                        detalle.map(e => e.platforms.map((e) =>  { return (
                                            <p className='pPlatforms'>{e}</p>
                                        )}))
                                    }
                                    </div>
                            </div>    
                                <div className='descripcion'>
                                    <h3 className='description'>Description</h3>
                                    </div>
                                <p className='pDescription'>{e.description}</p> 
                                
                        </div> 
                    )  
                }) 
                : <h2> Loading ... </h2>
            }
                
        </div>   

    )
    
}  