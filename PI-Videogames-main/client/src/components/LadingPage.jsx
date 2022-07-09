import React from 'react';
import {Link} from 'react-router-dom';
import  './styles/LandingPage.css'

export default function LandingPage(){
    return(
        <div className="divLanding">
            <h1 className="landing">VideoGames</h1>
            <Link to='/home'> 
                <button  className="botonLanding">Entrar</button>
            </Link>
        </div>
    )
}

// function Product(props) {
//   console.log('esto es s:', s);
//   return (
//     <div className={`${s.producto} ${s.hola}`}>
//       <h3 className={s.hola}>{props.title}</h3>
//       <p>{props.price}</p>
//     </div>
//   );
// }
