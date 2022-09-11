import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, clearDetail } from '../../actions/index.js';
import { Link } from 'react-router-dom';
import img from '../img/back.png'
import './dogDetails.css'
import cargando from '../img/piq-loading.gif'


export default function DogDetail() {
  const dispatch = useDispatch()
  const selectedDog = useSelector((state) => state.detailsDog)
  let { id } = useParams()

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(clearDetail())
    }
  }, [dispatch, id])

  return (
    <div className='walpaperDetalle'>
      {(selectedDog.length > 0) ? (
        <div className='card-contenedor'>
          <div className='card-content'>
            <Link to='/home'>
              <img
                src={img}
                alt=""
                className='imgBackDetail'
              />
            </Link>
            <h1 className='name'>{selectedDog[0].name}</h1>
            <div className='wightHeight'>
              <h3 className='wightHeightLifeSpan'>Peso: {
                selectedDog[0].weight[0] === selectedDog[0].weight[1] ?
                  (`${selectedDog[0].weight[0]} - NaN `) :
                  (`${selectedDog[0].weight[0]} - ${selectedDog[0].weight[1]} Kg`)}</h3>
              <h3 className='wightHeightLifeSpan'>Tamaño: {
                selectedDog[0].height[0] === selectedDog[0].height[1] ?
                  (`${selectedDog[0].height[0]} - NaN `) :
                  (`${selectedDog[0].height[0]} - ${selectedDog[0].height[1]} cm`)}</h3>
            </div>
            <h3 className='wightHeightLifeSpan'>
              Esperanza de vida: {
                selectedDog[0].lifeSpan[0] === selectedDog[0].lifeSpan[1] ?
                  (`${selectedDog[0].lifeSpan[0]} - NaN`) :
                  (`${selectedDog[0].lifeSpan[0]} - ${selectedDog[0].lifeSpan[1]} años`)
              } </h3>
            <h3 className='wightHeightLifeSpan'>
              Origen: {
                selectedDog[0].origin ? selectedDog[0].origin : 'Not a info'
              } </h3>
            <h2 className='temperamentDetalle'>Temperamentos: {
              selectedDog[0].temperament
            }</h2>
            <div className='divImgDetail'>
              <img
                src={selectedDog[0].image}
                alt=''
                className='pictureDetalle'
              />
            </div>
          </div>
        </div>) : (
        <div>
          <img
            src={cargando}
            alt='cargando...'
            className='cargando'
          />
          <Link to='/home'>
            <button className='volver'>Pantalla anterior</button>
          </Link>
        </div>
      )
      }
    </div>
  )
}