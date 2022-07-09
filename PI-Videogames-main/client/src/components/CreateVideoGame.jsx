import {useState , useEffect} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import {videoGameCreated, getAllPlatforms, genres} from '../actions';
import {Link} from 'react-router-dom';

import './styles/CreateVideoGame.css';

export default function CreateVideoGame(){

    const dispatch = useDispatch();
    const genero = useSelector(state => state.genres)
    // console.log("Los generos" , genero)
    const platforms = useSelector(state => state.plataformas)
    // console.log("Las plataformas" , platforms)

    useEffect(() => {
        dispatch(getAllPlatforms())
        dispatch(genres())
    }, [dispatch]);
    
    const [juego,setjuego] = useState({
        name: '',
        description: '' ,
        rating: 0,
        released: '',
        img: '',
        genres: [],
        platforms: [] 
    })

    function handleChange(event){
        event.preventDefault()
        setjuego({
            ...juego,
            [event.target.name] : event.target.value
        })
    }

    function handleSelect(event){
        event.preventDefault()
        setjuego({
            ...juego,
            genres: [...juego.genres,event.target.value]
        })
    }

    function handleSelected(event){
        event.preventDefault()
        setjuego({
            ...juego,
            platforms: [...juego.platforms,event.target.value]
        })
    }

    function handleSubmit(event){
        // event.preventDefault();
        console.log(event)
       dispatch(videoGameCreated(juego))
       setjuego({ 
        name: '',
       description: '' ,
       rating: 0,
       released: '',
       img: '',
       genres: [],
       platforms: []})
      
    
    }
    return (
        <div className='divCreateGame'>
            <div className='linkHome'>
                <Link to='/home'>
                    <button className='goHome'>Home</button>
                </Link>
            </div>
            
            <div className='h1Videogames'>
                 <h1 className='h1'>Create Video Game</h1>
            </div>
                <form onSubmit={(event) => {handleSubmit(event)}} className='classFormCreate'>
                 <br/>
                 <label className='labelCreate'> 
                    <div className='nombreCreate'>
                        <h3 className='h3' >Name</h3><input onChange={(event)=>{handleChange(event)}} type='text' value={juego.name} name='name'  placeholder='Name' className='inputGame'/>
                    </div>
                    <div className='descripcionCreate'>
                        <h3 className='h3'>Description </h3> <input onChange={(event)=>{handleChange(event)}} type='text' value={juego.description} name='description' placeholder='Description' className='inputGame'/>
                    </div>
                    <div className='ratingCreate'>
                        <h3 className='h3'>Rating</h3> <input onChange={(event)=>{handleChange(event)}} type='float' min={'1'} max={'6'} value={juego.rating} name='rating' placeholder='Rating' className='inputGame'/>
                    </div>
                    <div className='releasedCrate'>
                        <h3 className='h3'>Released </h3><input onChange={(event)=>{handleChange(event)}}  value={juego.released} name='released' placeholder='Released' className='inputGame'/>
                    </div>
                    <div className='imageCrate'>
                        <h3 className='h3'>Image</h3><input onChange={(event)=>{handleChange(event)}} src = {juego.img} width="250px" height="250px" value={juego.img} name='img' placeholder='Link Image' className='inputGame'/>
                    </div>
                </label>
                </form>
                 <br/>

                <div className='then'>
                 <label className='labelFormGenres'> <h3  className='h3Generos'>Genres</h3>
                <select onChange={(event)=>{handleSelect(event)}} key= {genero.name}  className='select' >
                {
                    genero.map((t,a)=>{
                        return(
                            <option value = {t.name} key= {a}> {t.name} </option>
                            
                        ) 
                    })
                }
                </select>
                    { 
                        juego.genres && juego.genres?.map( e => <p className='pSearched'>{e} </p>) 
                        
                    }
                </label>
                 <br/>
                 <div>
                  
                 </div>
                
                <br/>

                <label className='labelFormPlatforms' > <h3 className='h3Platforms'>Platforms</h3>
                    <select onChange={(event)=>{handleSelected(event)}} value= {platforms.name} className='select'>
                    {
                        platforms.map((p,i)=>{
                            return(
                                <option value = {p.name} key= {i}> {p.name} </option>
                            )
                        })
                    }
                    </select><br/>
                    {
                    juego.platforms && juego.platforms?.map( e => <p className='pSearched'>{e}</p>)
                    }
                </label><br/>
                
            </div>
            <br/>
                <div className='divButtonForm'>
                    <button type = 'submit' onClick={e => handleSubmit(e)} className='buttonForm' >
                        Create Video Game
                    </button>
                 </div>
            </div>
                
      
        
    )

} 
