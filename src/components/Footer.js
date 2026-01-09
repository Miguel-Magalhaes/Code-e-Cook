import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='site-footer'>
            <div className='footer-content'>
                <div className='footer-section'>
                    <h3>Code & Cook</h3>
                    <p>Onde o código encontra o sabor. <br /> Projeto desenvolvido para fins de aprendizado.</p>
                </div>
                <div className="footer-section">
                    <h4>Explore</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/categoria/frangos">Frangos</Link></li>
                        <li><Link to="/categoria/carnes">Carnes</Link></li>
                        <li><Link to="/categoria/peixes">Peixes</Link></li>
                        <li><Link to="/categoria/massas">Massas</Link></li>
                        <li><Link to="/categoria/sobremesas">Sobremesas</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Contato</h4>
                    <p>
                        <a href="https://github.com/Miguel-Magalhaes" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-github"></i> GitHub
                        </a>
                    </p>
                    <p>
                        <a href="https://linkedin.com/in/miguel-magalhães-ads" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-linkedin"></i> LinkedIn
                        </a>
                    </p>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} Code & Cook. Desenvolvido com React.
            </div>
        </footer>
    )
}

export default Footer;