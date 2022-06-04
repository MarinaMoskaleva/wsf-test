import React, { useState } from 'react';
import './Navigation.css';

function Navigation({togglePeriod}) {
    const [isCurrentActive, setCurrentActive] = useState(true);
    function toggleButtonActive(){
        setCurrentActive(!isCurrentActive);
        togglePeriod(!isCurrentActive);
    }
    return (
        <div className="navigation">
            <button className={`navigation__button ${isCurrentActive && 'navigation__button_active'}`} onClick={toggleButtonActive}>Current</button>
            <button className={`navigation__button ${!isCurrentActive && 'navigation__button_active'}`} onClick={toggleButtonActive}>7 days forecast</button>
        </div>
    );
}

export default Navigation;