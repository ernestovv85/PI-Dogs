import React from 'react';
import { Link } from 'react-router-dom';
import './landingPage.css';

export default function LandingPage() {
  return (
    <div className='background'>
      <h1 className='welcomeText'> Bienvenidos a Lomitos App </h1>
      <Link to='/home'>
        <button className='button'>Ingresar</button>
      </Link>
    </div>
  )
}