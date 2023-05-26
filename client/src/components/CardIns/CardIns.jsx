import React  from 'react';
import { Link } from 'react-router-dom';
import style from './CardIns.module.css'

const CardIns = ({ background_image, name, genres, id }) =>{
    return (
        <>
        <div className={style.contenedor}>

        <Link to={`/detail/${id}`}>
            <h4>{name}</h4>
        </Link>
            <h4>{genres}</h4>
            <img src={background_image} alt='img not found' width="100px" height='100px' />
        </div>
        
        </>
    )
};

export default CardIns;