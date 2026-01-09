import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HighlightCard from '../components/HighlightCard';

import frangoImg from '../assets/frango.jpg';
import carneImg from '../assets/carne.jpg';
import camaraoImg from '../assets/camarão.jpg';
import massasImg from '../assets/massas.jpg';
import vegetarianoImg from '../assets/vegetariano.jpg';
import croissantImg from '../assets/croissant.jpg';
import boloImg from '../assets/bolo.jpg';
import Lottie from "lottie-react";
import cookAnimation from "../assets/cooking.json";

const categories = [
    { id: 1, title: 'Frangos', image: frangoImg, path: '/categoria/frangos' },
    { id: 2, title: 'Carnes', image: carneImg, path: '/categoria/carnes' },
    { id: 3, title: 'Peixes', image: camaraoImg, path: '/categoria/peixes' },
    { id: 4, title: 'Massas', image: massasImg, path: '/categoria/massas' },
    { id: 5, title: 'Vegetarianos', image: vegetarianoImg, path: '/categoria/vegetarianos' },
    { id: 6, title: 'Café da Manhã', image: croissantImg, path: '/categoria/café' },
    { id: 7, title: 'Sobremesas', image: boloImg, path: '/categoria/sobremesas' }
];

const Home = () => {

    const [busca, setBusca] = useState('');

    const [receitasDestaque, setReceitasDestaque] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const carregarDestaques = async () => {
            try {
                const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=American';

                const response = await fetch(url);
                const data = await response.json();

                const listaLimitada = data.meals.slice(0, 5);

                setReceitasDestaque(listaLimitada);
            } catch (error) {
                console.error("Erro ao buscar destaques:", error);
            }
        };

        carregarDestaques();
    }, []);

    const handleSearch = () => {
        if (busca.trim() !== "") {
            navigate(`/busca/${busca}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    const handleRandomMeal = async () => {
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const data = await response.json();

            if (data.meals && data.meals.length > 0) {
                const randomId = data.meals[0].idMeal;
                navigate(`/receita/${randomId}`);
            }
        } catch (error) {
            console.error("Erro ao buscar receita aleatória:", error);
        }
    }

    return (
        <>
            <div>
                <div className='first-section'>
                    <h1>O que deseja explorar hoje?</h1>

                    <div className='searchBar'>
                        <input
                            type='text'
                            placeholder='Buscar receita...'
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button onClick={handleSearch}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>

                    <div className='cards'>
                        {categories.map((category) => (
                            <div className='card-category' key={category.id}>
                                <Link to={category.path}>
                                    <img src={category.image} alt={category.title} />
                                    <p>{category.title}</p>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {receitasDestaque.length > 0 && (
                        <div className='cards-recipes'>
                            <h2>Receitas em alta</h2>

                            <div className='cards-recipes-scroll'>
                                {receitasDestaque.map((item) => (
                                    <HighlightCard key={item.idMeal} recipe={item} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className='second-section'>
                    <div className='second-section-text'>
                        <h2>Sobre o Code & Cook</h2>
                        <p>Este é um projeto pessoal desenvolvido com um objetivo claro: transformar linhas de código em experiências deliciosas. O foco principal foi aprofundar os conhecimentos em React e consumo de APIs reais. Aqui, a tecnologia se mistura com a curiosidade e o amor pela gastronomia, criando um espaço onde aprender é o prato principal.</p>
                    </div>
                    <div className='lottie-wrapper'>
                        <Lottie animationData={cookAnimation} loop={true} autoPlay={true} />
                    </div>
                </div>
                <div className='third-section'>
                    <div>
                        <h2>Não sabe o que cozinhar hoje?</h2>
                        <p>Deixe o nosso chef virtual escolher por você!</p>
                    </div>
                    <button onClick={handleRandomMeal}>Surpreenda-me</button>
                </div>
            </div>
        </>
    )
}

export default Home;