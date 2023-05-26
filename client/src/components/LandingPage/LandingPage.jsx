import React from 'react';
import { Link } from 'react-router-dom';
import style from './Landing.module.css';


const landingPage = () => {

    return (
        <div className ={style.container}>
            <h1 className ={style.title}> Explore the Exciting World of Video games </h1>
            <div>
                <Link to='/home'>
                <button className ={style.boton}>Start</button>
            </Link>
        </div>

    </div >
)


};

export default landingPage