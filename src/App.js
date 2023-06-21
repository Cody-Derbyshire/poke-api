/* import logo from './pokeball-01.svg'; */
import './App.css';
import React, { useState, useEffect } from 'react';
import Card from './Card';

import axios from 'axios';
import './style.css';

const App = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url] = useState('https://pokeapi.co/api/v2/pokemon?limit=151');

  const pokeFunc = async () => {
    const res = await axios.get(url);
    getPokemonData(res.data.results);
    setLoading(false);
  };

  const getPokemonData = async (res) => {
    res
      .filter((v, i, a) => a.indexOf(v) === i)
      .map(async (item) => {
        const result = await axios.get(item.url);

        setPokeData((state) => {
          state = [...state, result.data];
          state.sort((a, b) => (a.id > b.id ? 1 : -1));
          return state;
        });
      });
  };

  useEffect(() => {
    pokeFunc();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className='main'>
        <Card pokemon={pokeData} loading={loading}></Card>
      </div>
    </>
  );
};

export default App;
