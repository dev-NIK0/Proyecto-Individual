import React from 'react';
import './styles/Card.css';

export default function Card({img,name,genres,rating,id}){
    return (
        <div key={id} className='classCard'>
          <h2 className='h2Card'>{name}</h2> 
            <img src = {img} width="250px" height="250px" alt='imagen' className='imgCard'/>
                <h4 className='h4Genres'>Genre </h4>
                <div  className='divGenre'>    
                    {    
                        genres && genres.map((gen,i) => {
                        const genero = gen.name;
                            return(
                                <p key={i} className='pGenre'>{ genero || gen}</p>
                            )
                        })
                    } 
                </div>
            <h4 className='h4Rating'>Rating</h4>
             <p className='pRating'>{rating}</p> 
             
        </div>
    )
}  

// <div  className='divGenre'></div>