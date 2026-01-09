import React from 'react'
import { Link } from 'react-router-dom';
import erro404 from '../assets/404.png';

const NotFound = () => {
    return (
        <div className='page404'>
            <img src={erro404} alt="Erro 404 - Página não encontrada" />
            <div>
                <h2>Ops! Essa receita queimou.</h2>
                <p>A página que você está procurando não existe ou foi removida.</p>
            </div>
            <Link to="/"><button className='button404'>Voltar para Home</button></Link>
        </div>
    )
}

export default NotFound;