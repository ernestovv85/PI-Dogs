import React from 'react';
import patitasGif from '../img/loading.gif'
import lupaGif from '../img/piq-loading.gif'

export default function Loading({ setLoading }) {
  return (
    <>
      <div className='loading'>
        <div className='lupaGif'>
          <img src={lupaGif} alt='' />
        </div>
        <div className='patitaGif'>
          <img src={patitasGif} alt='' />
        </div>
        <div className='numerito'>
          {setTimeout(() => {
            setLoading(false);
          }, 2000)}
        </div>
      </div>
    </>
  );
};