import React from 'react';

const HomePage = ({ navigateTo }) => {
    const handleClick = () => {
        console.log('Botón clicado');
        navigateTo('create');
    };

    return (
        <div className="container">
            <header>
                <h1>Bienvenido a My Story Creator</h1>
            </header>
            <main>
                <p>Ofrecemos cuentos infantiles únicos y 100% personalizados. Añade varios personajes y decide si son protagonistas o personajes secundarios.</p>
                <img src="images/bookCatalog/example3.png" alt="Sample Book" style={{ width: '100%', height: 'auto', borderRadius: '8px', margin: '20px 0' }} />
                <section>
                    <h2>¿Por qué elegirnos?</h2>
                    <ul>
                        <li>Historias completamente personalizadas.</li>
                        <li>Añade varios personajes y elige sus roles.</li>
                        <li>Fácil de usar y crear cuentos en minutos.</li>
                        <li>Historias únicas que fomentan la imaginación.</li>
                    </ul>
                </section>
                <section>
                    <h2>Ejemplos de nuestras historias</h2>
                    <div>
                        <img src="images/bookcatalog/example1.png" alt="Example 1" style={{ width: '30%', height: 'auto', margin: '0 10px' }} />
                        <img src="images/bookcatalog/example2.png" alt="Example 2" style={{ width: '30%', height: 'auto', margin: '0 10px' }} />
                    </div>
                </section>
                <div className="buttons">
                    <button className="button" onClick={handleClick}>Crea tu cuento personalizado</button>
                </div>
            </main>
            <footer>
                <p>© 2024 My Story Creator. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export { HomePage };
