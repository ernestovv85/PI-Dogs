import React from 'react';
import './pagination.css'

export default function Paginado({ dogsOnPage, allDogs, pagina }) {
  const pageNumbers = []

  for (let i = 0; i < Math.ceil(allDogs / dogsOnPage); i++) {
    pageNumbers.push(i + 1)
  }

  return (
    <div>
      <ul className='paginationUl'>
        {pageNumbers?.map(n => (
          <button
            className='paginationButton'
            key={n}
            onClick={() => pagina(n)}>
            {n}
          </button>
        ))}
      </ul>
    </div>
  )
}