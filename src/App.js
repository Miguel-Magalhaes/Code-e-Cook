import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import SearchResults from './pages/SearchResults';
import Footer from './components/Footer';
import CategoryPage from './pages/CategoryPage';
import Recipe from './pages/Recipe';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/busca/:termo' element={<SearchResults />} />
          <Route path='/categoria/:nomeCategoria' element={<CategoryPage />} />
          <Route path='/receita/:id' element={<Recipe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;