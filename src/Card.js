import React from 'react';
import { useState } from 'react';

import './style.css';
import './App.css';

const Card = ({ pokemon, loading }) => {
  let [pokeName, setPokeName] = useState('');
  const [pokeHeight, setPokeHeight] = useState('');
  const [pokeWeight, setPokeWeight] = useState('');
  const [pokeImg, setPokeImg] = useState();
  const [pokeId, setPokeId] = useState();
  const [type1, setType1] = useState('');
  const [type2, setType2] = useState('');
  const [ability1, setAbility1] = useState('');
  const [ability2, setAbility2] = useState('');
  const [hpStat, setHpStat] = useState('');
  const [atkStat, setAtkStat] = useState('');
  const [defStat, setDefStat] = useState('');
  const [spaStat, setSpaStat] = useState('');
  const [spdStat, setSpdStat] = useState('');
  const [speedStat, setSpeedStat] = useState('');
  const [totalStat, setTotalStat] = useState('');

  const openPokeInfo = async (res) => {
    const hp = res.stats?.[0]?.base_stat;
    const atk = res.stats?.[1]?.base_stat;
    const def = res.stats?.[2]?.base_stat;
    const spa = res.stats?.[3]?.base_stat;
    const spd = res.stats?.[4]?.base_stat;
    const speed = res.stats?.[5]?.base_stat;
    const total = hp + atk + def + spa + spd + speed;

    setPokeName(res.name);
    setPokeId(res.id);
    setPokeHeight(res.height / 10);
    setPokeWeight(res.weight / 10);
    setPokeImg(
      res.sprites?.versions?.['generation-v']?.['black-white']?.animated
        .front_default
    );
    setType1(res.types?.[0]?.type?.name);
    setType2(res.types?.[1]?.type?.name);
    setAbility1(res.abilities?.[0]?.ability?.name);
    setAbility2(res.abilities?.[1]?.ability?.name);
    setHpStat(hp);
    setAtkStat(atk);
    setDefStat(def);
    setSpaStat(spa);
    setSpdStat(spd);
    setSpeedStat(speed);
    setTotalStat(total);

    openNav();
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
              /* .filter((el, i) => i % 2 !== 0) */
              .map((item) => {
                return (
                  <div
                    key={item.id}
                    className='poke-card'
                    onClick={() => openPokeInfo(item)}
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
        <div className='modal-wrapper'>
          <img src={pokeImg} className='modal-img' alt=''></img>

          <div className='name-id-wrapper'>
            <h2 className='modal-poke-name'>{pokeName}</h2>

            <p className='modal-id'>#{pokeId}</p>
          </div>
          <div className='modal-type-container'>
            <p className={`modal-type-pill ${type1}`}>{type1}</p>
            <p className={`modal-type-pill ${type2}`}>{type2}</p>
          </div>

          <div className='wh-wrapper'>
            <div className='wh-div'>
              <p>
                <strong>Weight</strong>
              </p>
              <p>{pokeWeight}kg</p>
            </div>
            <div className='wh-div'>
              <p>
                <strong>Height</strong>
              </p>
              <p>{pokeHeight}m</p>
            </div>
          </div>
          <div className='abilities-wrapper'>
            <p>
              <strong>Abilities</strong>
            </p>
            <div className='abilities-names'>
              <p>{ability1}</p>
              <p>{ability2}</p>
            </div>
          </div>
          <div className='stats-wrapper'>
            <div className='stat-wrapper'>
              <p className='stat-name'>
                <strong>HP</strong>
              </p>
              <p className='stat-number'>{hpStat}</p>
            </div>
            <div className='stat-wrapper'>
              <p className='stat-name'>
                <strong>ATK</strong>
              </p>
              <p className='stat-number'>{atkStat}</p>
            </div>
            <div className='stat-wrapper'>
              <p className='stat-name'>
                <strong>DEF</strong>
              </p>
              <p className='stat-number'>{defStat}</p>
            </div>
            <div className='stat-wrapper'>
              <p className='stat-name'>
                <strong>SpA</strong>
              </p>
              <p className='stat-number'>{spaStat}</p>
            </div>
            <div className='stat-wrapper'>
              <p className='stat-name'>
                <strong>SpD</strong>
              </p>
              <p className='stat-number'>{spdStat}</p>
            </div>
            <div className='stat-wrapper'>
              <p className='stat-name'>
                <strong>SPD</strong>
              </p>
              <p className='stat-number'>{speedStat}</p>
            </div>
            <div className='stat-wrapper'>
              <p className='stat-name'>
                <strong>TOT</strong>
              </p>
              <p className='stat-number'>{totalStat}</p>
            </div>
          </div>
          {/* eslint-disable-next-line */}
          <a className='modal-closebtn' onClick={closeNav}>
            close
          </a>
        </div>
      </div>
    </>
  );
};

export default Card;
