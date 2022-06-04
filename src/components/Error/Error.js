import React from 'react';
import './Error.css';

function Error() {
    return (
        <section className="error">
            <h3 className="error__title">Ошибка</h3>
            <p className="error__text">Во время запроса данных произошла ошибка.</p>
            <p className="error__text">Попробуйте еще раз.</p>
            
        </section>
    );
}

export default Error;