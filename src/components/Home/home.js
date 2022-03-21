import React from 'react';
import { useNavigate } from "react-router-dom";
import './home.css';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="main">
            <div className="button" onClick={() => navigate('/temp1')}>
                <img src={require('./image/template_1.png')} />
                <p>Template 1</p>
            </div>
            <div className="button" onClick={() => navigate('/temp2')}>
                <img src={require('./image/template_2.png')} />
                <p>Template 2</p>
            </div>
            <div className="button" onClick={() => navigate('/temp1')}>
                <img src={require('./image/template_3.png')} />
                <p>Template 3</p>
            </div>
            <div className="button" onClick={() => navigate('/temp1')}>
                <img src={require('./image/template_4.png')} />
                <p>Template 4</p>
            </div>
            <div className="button" onClick={() => navigate('/temp5')}>
                <img src={require('./image/template_4.png')} />
                <p>Template 5</p>
            </div>
        </div>
    )
}

export default Home