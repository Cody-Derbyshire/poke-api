import React from 'react';
import { useState } from 'react';

import './style.css';
import './App.css';

const Card = ({ pokemon, loading }) => {
  let [pokeName, setPokeName] = useState('');
  const [pokeHeight, setPokeHeight] = useState('');
  const [pokeWeight, setPokeWeight] = useState('');
  const [pokeImg, setPokeImg] = useState();
  const [type1, setType1] = useState('');
  const [type2, setType2] = useState('');

  const openPokeInfo = async (res) => {
    setPokeName(res.name);
    setPokeHeight(res.height / 10);
    setPokeWeight(res.weight / 10);
    setPokeImg(
      res.sprites?.versions?.['generation-v']?.['black-white']?.animated
        .front_default
    );
    setType1(res.types?.[0]?.type?.name);
    setType2(res.types?.[1]?.type?.name);
  };

  /* Open when someone clicks on the span element */
  const openNav = () => {
    document.getElementById('myNav').style.width = '100%';
  };

  /* Close when someone clicks on the "x" symbol inside the overlay */
  const closeNav = () => {
    document.getElementById('myNav').style.width = '0%';
  };

  return (
    <>
      <div className='left'>
        <div className='card-wrapper'>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            pokemon
              .filter((el, i) => i % 2 !== 0)
              .map((item) => {
                return (
                  <div
                    key={item.id}
                    className='poke-card'
                    onClick={() => {
                      openNav();
                      openPokeInfo(item);
                    }}
                  >
                    <img
                      className='card-img'
                      src={item.sprites.front_default}
                      alt='pokemon sprite'
                    />
                    <div
                      className={`shape ${item.types?.[0]?.type?.name}`}
                    ></div>
                    <div className='card-body'>
                      <p className='card-id'>#{item.id}</p>
                      <h5 className='poke-name'>{item.name}</h5>
                      <div className='type-container'>
                        <p
                          className={`type-pill ${item.types?.[0]?.type?.name}`}
                        >
                          {item.types?.[0]?.type?.name}
                        </p>
                        <p
                          className={`type-pill ${item.types?.[1]?.type?.name}`}
                        >
                          {item.types?.[1]?.type?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>
      <div className='right' id='myNav'>
        <img src={pokeImg} className='modal-img' alt=''></img>
        <h2 className='modal-title'>{pokeName}</h2>
        <p>
          <strong>Height</strong> {pokeHeight}m
        </p>
        <p>
          <strong>Weight</strong> {pokeWeight}kg
        </p>
        <div className='type-container'>
          <p className={`modal-type-pill ${type1}`}>{type1}</p>
          <p className={`modal-type-pill ${type2}`}>{type2}</p>
        </div>
        {/* eslint-disable-next-line */}
        <a className='closebtn' onClick={closeNav}>
          close
        </a>
      </div>
    </>
  );
};

export default Card;
