import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createVideogame, getGenres, getPlatforms } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import style from './Form.module.css'

const Form = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);

  const [form, setForm] = useState({
    name: '',
    description: '',
    background_image: '',
    released: '',
    rating: '',
    platform: [],
    genres: []
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    background_image: '',
    released: '',
    rating: '',
    platform: '',
    genres: ''
  });

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });

    validate({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSelectGenres = (event) => {
    setForm({
      ...form,
      genres: [...form.genres, event.target.value]
    });
  };

  const handleSelectPlat = (event) => {
    setForm({
      ...form,
      platform: [...form.platform, event.target.value]
    });
  };

  const handleChangeRating = (event) => {
    const { name, value } = event.target;

    if (value >= 0.0 && value <= 5.0) {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validate(form);
    if (Object.values(errors).some((error) => error !== '')) {
      return alert('Faltan datos');
    }
    dispatch(createVideogame(form));
    alert('VG creado!');
    setForm({
      name: '',
      description: '',
      background_image: '',
      released: '',
      rating: '',
      platform: [],
      genres: []
    });
  };

  const validate = (form) => {
    let newErrors = {};

    if (form.name.trim() === '') {
      newErrors.name = 'Name is missing...';
    } else {
      newErrors.name = '';
    }

    if (form.description.trim() === '') {
      newErrors.description = 'complete...';
    } else {
      newErrors.description = '';
    }

    if (form.released.trim() === '') {
      newErrors.released = 'complete...';
    } else {
      newErrors.released = '';
    }

    if (isNaN(form.rating)) {
      newErrors.rating = 'Rating should be a number';
    } else {
      newErrors.rating = '';
    }

    if (form.background_image.trim() === '') {
      newErrors.background_image = 'put an image or put some text...';
    } else {
      newErrors.background_image = '';
    }

    if (form.genres.length === 0) {
      newErrors.genres = 'Select at least one genre';
    } else {
      newErrors.genres = '';
    }

    if (form.platform.length === 0) {
      newErrors.platform = 'Select at least one platform';
    } else {
      newErrors.platform = '';
    }

    setErrors(newErrors); // Agregar esta línea para actualizar el estado de errores
  };

  return (
    <>




      <form onSubmit={handleSubmit} className={style.form}>

        <div className={style.contenido}>
          <div className={style.child}>
            <h3 className={style.titulo}> Crea tu VideoGame!</h3>
            <br></br>
            <br></br>
            <div>
              <label >Nombre:</label>
              <input className={style.campos}
                type='text'
                placeholder='Nombre de tu juego'
                value={form.name}
                onChange={handleChange}
                name='name'
              />
              {errors.name && <span>{errors.name}</span>}
            </div>
            <br></br>

            <div>
              <label>Descripción:</label>
              <input className={style.campos}
                type='text'
                placeholder='Breve descripción de tu juego'
                value={form.description}
                onChange={handleChange}
                name='description'
              />
              {errors.description && <span>{errors.description}</span>}
            </div>
            <br></br>

            <div>
              <label>Imagen:</label>
              <input className={style.campos}
                type='text'
                placeholder='Puedes poner un texto, si no tienes img'
                value={form.background_image}
                onChange={handleChange}
                name='background_image'
              />
              {errors.background_image && <span>{errors.background_image}</span>}
            </div>
            <br></br>

            <div>
              <label>Lanzamiento:</label>
              <input className={style.campos}
                type='text'
                placeholder='Pon una fecha'
                value={form.released}
                onChange={handleChange}
                name='released'
              />
              {errors.released && <span>{errors.released}</span>}
            </div>
            <br></br>

            <div>
              <label>Rating</label>
              <input className={style.campos}
                type='number'
                placeholder='min: 0.0, max: 5.0'
                value={form.rating}
                onChange={handleChangeRating}
                name='rating'
                step='0.1'
              />
              {errors.rating && <span>{errors.rating}</span>}
            </div>
            <br></br>

            <div>
              <select name='genres' onChange={handleSelectGenres} className={style.campos}>
                <option disabled selected>Genres</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              {errors.genres && <span>{errors.genres}</span>}
            </div>
            <br></br>

            <div>
              <select name='platform' onChange={handleSelectPlat} className={style.campos}>
                <option disabled selected>Platforms</option>
                {[...new Set(platforms)].map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
              {errors.platform && <span>{errors.platform}</span>}
            </div>
            <br></br>
            <div>
              <button type='submit' className={style.boton} >Crear VG</button>
            </div>
            <br></br>
            <div>
              <Link to='/home'>
                <button className={style.botonHome}>Home</button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;
