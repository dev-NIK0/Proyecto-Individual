import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';

import {gameParam} from '../actions';
import './styles/SearchBar.css'

export default function SearchBar(){
    const dispatch = useDispatch();

    const [entrada,cambiarEntrada] = useState('')

    function handleChange(e){
        e.preventDefault()
        cambiarEntrada(entrada)
        // cambiarEntrada( e.target.value ) 
    }
    function handleSearch(e){
        e.preventDefault()
        dispatch(gameParam(entrada))
        
        
    }    
  // value={entrada}
    return (
        <div className='searchBar'>
            <button type='submit' className='buttonSearchBar' onClick={ e => handleSearch(e)}> Search Game</button>
            <input type='text'  placeholder='Search the Game' onChange={ e => handleChange(e)} id='inputSearch'/> 
          
        </div>
    )
}