import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { translateText } from '../services/Translate';
import Loading from '../components/Loading';

const Recipe = () => {
    const { id } = useParams();
    const [receita, setReceita] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tituloTraduzido, setTituloTraduzido] = useState('');

    useEffect(() => {
        const buscaReceita = async () => {
            setLoading(true);
            try {
                const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
                const response = await fetch(url);
                const data = await response.json();

                const dadosReceita = data.meals ? data.meals[0] : null;
                setReceita(dadosReceita);

                if (dadosReceita) {
                    setTituloTraduzido(dadosReceita.strMeal);
                    const traducao = await translateText(dadosReceita.strMeal, 'en', 'pt');
                    if (traducao) {
                        setTituloTraduzido(traducao);
                    }
                }

            } catch (error) {
                console.error("Erro:", error);
            } finally {
                setLoading(false);
            }
        };

        buscaReceita();
    }, [id]);

    const renderIngredientes = () => {
        let ingredientes = [];

        for (let i = 1; i <= 20; i++) {

            const ingrediente = receita[`strIngredient${i}`];
            const medida = receita[`strMeasure${i}`];

            if (ingrediente && ingrediente.trim() !== "") {
                ingredientes.push(
                    <li key={i}>
                        {ingrediente} - <span className='measures'>{medida}</span>
                    </li>
                );
            }
        }
        return ingredientes;
    };

    if (loading) return <Loading />;
    if (!receita) return <p>Receita não encontrada.</p>;

    return (
        <div className='page-recipe'>
            <h1>{tituloTraduzido || receita.strMeal}</h1>
            <Link to="/"><i class="fa-solid fa-arrow-left"></i> Voltar para Home</Link>
            <div className='page-recipe-details'>
                <img src={receita.strMealThumb} />
                <div>
                    <h2>Ingredientes</h2>
                    <ul>{renderIngredientes()}</ul>
                </div>
            </div>
            <div className="instructions">
                <h3>Modo de Preparo</h3>
                <p>
                    {receita.strInstructions}
                </p>
            </div>
        </div>
    );
}

export default Recipe;