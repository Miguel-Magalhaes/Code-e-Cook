import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { translateText } from '../services/Translate';

const HighlightCard = ({ recipe }) => {

    const [titulo, setTitulo] = useState(recipe.strMeal);

    useEffect(() => {
        const traduzir = async () => {
            try {
                const traducao = await translateText(recipe.strMeal, 'en', 'pt');
                if (traducao) setTitulo(traducao);
            } catch (error) {
                console.warn(`Erro tradução: ${recipe.strMeal}`);
            }
        };
        traduzir();
    }, [recipe.strMeal]);

    return (
        <div className='card-recipe'>
            <Link to={`/receita/${recipe.idMeal}`}>
                <img src={recipe.strMealThumb} alt={titulo} />
                <p>{titulo.substring(0, 20) + (titulo.length > 20 ? "..." : "")}</p>
            </Link>
        </div>
    );
};

export default HighlightCard;