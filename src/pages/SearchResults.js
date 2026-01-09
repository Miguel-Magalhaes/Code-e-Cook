import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { translateText } from '../services/Translate';
import RecipeCard from '../components/RecipeCard';
import Loading from '../components/Loading';

const SearchResults = () => {
    const { termo } = useParams();
    const [receitas, setReceitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [termoTraduzido, setTermoTraduzido] = useState('');
    const [erroTraducao, setErroTraducao] = useState(false);

    useEffect(() => {
        const buscarNaApi = async () => {
            setLoading(true);
            setErroTraducao(false);
            setTermoTraduzido('');

            try {
                let termoParaBusca = termo;

                const traducao = await translateText(termo, 'pt', 'en');

                if (traducao) {
                    termoParaBusca = traducao;
                    setTermoTraduzido(traducao);
                } else {
                    setErroTraducao(true);
                }

                const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${termoParaBusca}`;
                const response = await fetch(url);
                const data = await response.json();
                
                setReceitas(data.meals || []);
            } catch (error) {
                console.error("Erro:", error);
            } finally {
                setLoading(false);
            }
        };

        buscarNaApi();
    }, [termo]);

    return (
        <div>
            <div className='page-results'>
                
                <h1>Resultados para: <span>"{termo}"</span></h1>
                
                <Link to="/"><i class="fa-solid fa-arrow-left"></i> Voltar para Home</Link>

                {loading && <Loading />}

                {!loading && receitas.length > 0 ? (
                    <div className='cards-results'>
                        {receitas.map((receita) => (
                            <RecipeCard key={receita.idMeal} recipe={receita} />
                        ))}
                    </div>
                ) : (
                    !loading && (
                        <div className='page-results-texts'>
                            <p>Nenhuma receita encontrada para "{termo}".</p>
                            {termoTraduzido && (
                                <p><small>Tentamos buscar por: {termoTraduzido}</small></p>
                            )}
                            {erroTraducao && (
                                <div className='page-results-error-translate'>
                                    <p>
                                        <i className="fa-solid fa-triangle-exclamation"></i> Dica do Chef:
                                    </p>
                                    <p>
                                        Nossos serviços de tradução estão temporariamente indisponíveis. 
                                        Experimente pesquisar o termo em inglês (ex: <em>"Pie"</em>, <em>"Cake"</em>, <em>"Chicken"</em>) para ver mais resultados.
                                    </p>
                                </div>
                            )}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default SearchResults;