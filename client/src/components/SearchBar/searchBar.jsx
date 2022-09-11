import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogName, resetPagination } from '../../actions/index';
import lupa from '../img/lupa.png'
import './searchBar.css'


export default function SearchBar() {

  const dispatch = useDispatch()
  const [name, setName] = useState('')


  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name.length === 0) {
      return alert('Ingresa un valor para buscar')
    } else {
      dispatch(getDogName(name));
      dispatch(resetPagination({ current: 1 }));
      setName("")

    }
  }

  return (
    <div className='buscador'>
      <div>
        <input
          type='text'
          placeholder='Buscar...'
          onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
          onChange={e => handleInputChange(e)}
          value={name}
          className='campoBuscar'
        />
        <button
          type='submit'
          onClick={(e) => handleSubmit(e)}
          className='botonBuscar'>
          <img
            src={lupa}
            alt=''
            className='iconBuscar'
          />
        </button>
      </div>
    </div>
  )
};