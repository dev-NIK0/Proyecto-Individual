import React from 'react';

export default function Paginado({videogame,juegos, paginado}){

    const numGames = [];
    for (let i = 1; i <= Math.ceil(juegos/videogame) ; i++) {
        numGames.push(i) 
    }
    return (
        <nav  className='divNavPaginado'>
            <ul  className='divUlPaginado'>
                {
                    numGames && 
                    numGames.map((r,i) => (
                        <button  key={i} onClick={() => paginado(r)} className='buttonPaginado'>{r}</button>
                    ))
                }
            </ul>
        
        </nav>
    )  
}