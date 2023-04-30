/* import logo from './pokeball-01.svg'; */
import './App.css';
import React, { useState, useEffect } from 'react';

const App = () => {
  /* const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }; */

  const [pokemon, setPokemon] = useState({ data: [] });
  const [pokedex, setPokedex] = useState({ data: [] });
  const [num, setNum] = useState(randomNumberInRange(1, 386));
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /* const getRandomInt = () => {
    
  }; */

  console.log(num);

  const handleClick = async () => {
    setNum(randomNumberInRange(1, 386));
    setIsLoading(true);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      const responseDex = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${num}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      const resultDex = await responseDex.json();

      setPokemon(result);
      setPokedex(resultDex);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const type1 = pokemon?.types?.[0]?.type?.name;
  const type2 = pokemon?.types?.[1]?.type?.name;
  const sprite = pokemon?.sprites?.other?.['official-artwork']?.front_default;
  const desc = pokedex?.['flavor_text_entries']?.[1]?.['flavor_text'];

  const pokeid = pokemon?.id;

  return (
    <div className='App'>
      <header className='App-header'>
        <div className='card-btn-wrapper'>
          <div className={`title-wrapper ${type1}`}>
            <h2 className='pokemon-title'>{pokemon?.name}</h2>
            <p className='pokemon-id'>#{pokeid}</p>
          </div>
          <div className='pokemon-container'>
            <div className='pokemon-card'>
              <div className='img-wrapper'>
                <img
                  className='pokemon-image'
                  src={sprite}
                  alt='default sprite of pokemon'
                ></img>
                {err && <h2>{err}</h2>}
                {isLoading && <h2>Loading...</h2>}
              </div>

              <div className='type-container'>
                <p className={`type-pill ${type1}`}>{type1}</p>
                <p className={`type-pill ${type2}`}>{type2}</p>
              </div>

              <div className='desc-wrapper'>
                <p className='desc'>{desc}</p>
              </div>
            </div>
          </div>

          <button onClick={handleClick} className='randButton'>
            fetch a new one!
          </button>
        </div>
      </header>
    </div>
  );
};

export default App;
