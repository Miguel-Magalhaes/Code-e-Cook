import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Loading from '../components/Loading';

const categoryMap = {
    'frangos': 'Chicken',
    'carnes': 'Beef',
    'café': 'Breakfast',
    'sobremesas': 'Dessert',
    'massas': 'Pasta',
    'peixes': 'Seafood',
    'vegetarianos': 'Vegetarian'
};

const CategoryPage = () => {
    const { nomeCategoria } = useParams();
    const [receitas, setReceitas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const buscarCategoria = async () => {
            setLoading(true);
            try {
                const categoriaIngles = categoryMap[nomeCategoria.toLocaleLowerCase()] || nomeCategoria;

                const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoriaIngles}`;

                const response = await fetch(url);
                const data = await response.json();

                setReceitas(data.meals || []);
            } catch (error) {
                console.error("Erro ao buscar categoria:", error);
            } finally {
                setLoading(false);
            };
        };
        buscarCategoria();
    }, [nomeCategoria]);


    return (
        <div>
            <div className='page-results'>

                <h1>Categoria: <span>{nomeCategoria[0].toUpperCase() + nomeCategoria.substring(1)}</span></h1>

                <Link to="/"><i class="fa-solid fa-arrow-left"></i> Voltar para Home</Link>

                {loading && <Loading />}

                {!loading && receitas.length > 0 ? (
                    <div className='cards-results'>
                        {receitas.map((receita) => (
                            <RecipeCard key={receita.idMeal} recipe={receita} />
                        ))}
                    </div>
                ) : (
                    !loading && <p>Nenhuma receita encontrada para essa categoria.</p>
                )}
            </div>
        </div>
    );
}

export default CategoryPage;