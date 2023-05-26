import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import style from './Detail.module.css'

const Detail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const myVideoG = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(params.id));
  }, [dispatch, params.id]);

  console.log(myVideoG.genres);

  return (
    <div className={style.Fondo}>

    <div className={style.informacion}>
      {Object.keys(myVideoG).length > 0 ? (
        <div>
          <h3 className={style.titulo}>name: {myVideoG.name}</h3>

          <img className={style.img}
            src={myVideoG.background_image}
            alt=""
            
          />

          <h3 className={style.texto}>description: {myVideoG.description?.replace(/<[^>]*>/g, "")}</h3>

          <h4>released: {myVideoG.released}</h4>

          <h4>rating: {myVideoG.rating}</h4>

          <h4>
          genres:{" "}
          {Array.isArray(myVideoG.genres)
            ? myVideoG.genres.map((genre) => genre).join(", ")
            : myVideoG.genres}
        </h4>

        <h4>
          platforms:{" "}
          {Array.isArray(myVideoG.platform)
            ? myVideoG.platform.map((platform) => platform).join(", ")
            : myVideoG.platform}
        </h4>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/home" >
        <button className={style.botonHome}>Volver</button>
      </Link>
    </div>
    </div>
  );
};

export default Detail;
