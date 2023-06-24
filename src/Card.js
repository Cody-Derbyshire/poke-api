import React from 'react';
import { useState } from 'react';

import styled from 'styled-components';

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
    const id = res.id;
    const hp = res.stats?.[0]?.base_stat;
    const atk = res.stats?.[1]?.base_stat;
    const def = res.stats?.[2]?.base_stat;
    const spa = res.stats?.[3]?.base_stat;
    const spd = res.stats?.[4]?.base_stat;
    const speed = res.stats?.[5]?.base_stat;
    const total = hp + atk + def + spa + spd + speed;
    const img =
      res.sprites?.versions?.['generation-v']?.['black-white']?.animated
        .front_default;

    const t1 = res.types?.[0]?.type?.name;
    const t2 = res.types?.[1]?.type?.name;

    setPokeName(res.name);
    setPokeId(id);
    setPokeHeight(res.height / 10);
    setPokeWeight(res.weight / 10);

    setPokeImg(img);

    setType1(t1);

    setType2(t2);

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

  const openNav = () => {
    document.getElementById('myNav').style.width = '100%';
    document.getElementById('info-btn').style.color = 'white';
  };

  const closeNav = () => {
    document.getElementById('myNav').style.width = '0%';
    document.getElementById('info-wrapper').style.display = 'flex';
    document.getElementById('stats-wrapper').style.display = 'none';

    document.getElementById('stats-btn').classList.remove(`${type1}`);
  };

  const openStats = () => {
    document.getElementById('info-wrapper').style.display = 'none';
    document.getElementById('stats-wrapper').style.display = 'flex';
    document.getElementById('info-btn').classList.toggle(`${type1}`);
    document.getElementById('stats-btn').classList.toggle(`${type1}`);
    document.getElementById('stats-btn').style.color = 'white';
    document.getElementById('info-btn').style.color = 'black';
  };

  const openInfo = () => {
    document.getElementById('info-wrapper').style.display = 'flex';
    document.getElementById('stats-wrapper').style.display = 'none';
    document.getElementById('info-btn').classList.toggle(`${type1}`);
    document.getElementById('stats-btn').classList.toggle(`${type1}`);
    document.getElementById('stats-btn').style.color = 'black';
    document.getElementById('info-btn').style.color = 'white';
  };

  const HPBar = styled.div`
    width: ${hpStat / 1.5}%;
    height: 0.5rem;
  `;
  const ATKBar = styled.div`
    width: ${atkStat / 1.5}%;
    height: 0.5rem;
  `;
  const DEFBar = styled.div`
    width: ${defStat / 1.5}%;
    height: 0.5rem;
  `;
  const SPABar = styled.div`
    width: ${spaStat / 1.5}%;
    height: 0.5rem;
  `;
  const SPDBar = styled.div`
    width: ${spdStat / 1.5}%;
    height: 0.5rem;
  `;
  const SPEEDBar = styled.div`
    width: ${speedStat / 1.5}%;
    height: 0.5rem;
  `;

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
                    <div
                      className={`shape2 ${item.types?.[1]?.type?.name}`}
                    ></div>
                    <div className='card-body'>
                      <div className='name-id-container'>
                        <p className='card-id'>#{item.id}</p>
                        <h5 className='poke-name'>{item.name}</h5>
                      </div>
                      <div className='type-container'>
                        <p
                          className={`type-pill type1 ${item.types?.[0]?.type?.name}`}
                        >
                          {item.types?.[0]?.type?.name}
                        </p>
                        <p
                          id='type2'
                          className={`type-pill type2 ${item.types?.[1]?.type?.name}`}
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
          <img src={pokeImg} className='modal-img' id='modal-img' alt=''></img>

          <div className='name-id-wrapper'>
            <h2 className='modal-poke-name'>{pokeName}</h2>

            <p className='modal-id'>#{pokeId}</p>
          </div>
          <div className='modal-type-container'>
            <p className={`modal-type-pill ${type1}`}>{type1}</p>
            <p className={`modal-type-pill ${type2}`}>{type2}</p>
          </div>
          <div className='btn-div'>
            <button
              id='info-btn'
              className={`modal-btn-1 ${type1}`}
              onClick={openInfo}
            >
              info
            </button>
            <button
              id='stats-btn'
              className={`modal-btn-2 .modal-btn-bg`}
              onClick={openStats}
            >
              stats
            </button>
          </div>

          <div id='info-wrapper' className='wh-abilities-wrapper'>
            <div className='wh-wrapper'>
              <div className='wh-div'>
                <p className='wh-strong'>
                  <strong>Weight</strong>
                </p>
                <p>{pokeWeight}kg</p>
              </div>
              <div className='wh-div'>
                <p className='wh-strong'>
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
                <p className='ability-name abn-left'>{ability1}</p>
                <p className='ability-name'>{ability2}</p>
              </div>
            </div>
          </div>
          <div id='stats-wrapper' className='stats-wrapper'>
            <div className='stats-top'>
              <div className='stat-wrapper'>
                <p className='stat-name'>
                  <strong>HP</strong>
                </p>
                <p className='stat-name'>
                  <strong>ATK</strong>
                </p>
                <p className='stat-name'>
                  <strong>DEF</strong>
                </p>
                <p className='stat-name'>
                  <strong>SpA</strong>
                </p>
                <p className='stat-name'>
                  <strong>SpD</strong>
                </p>
                <p className='stat-name'>
                  <strong>SPD</strong>
                </p>
              </div>
              <div className='stat-wrapper'>
                <p className='stat-number'>{hpStat}</p>
                <p className='stat-number'>{atkStat}</p>
                <p className='stat-number'>{defStat}</p>
                <p className='stat-number'>{spaStat}</p>
                <p className='stat-number'>{spdStat}</p>
                <p className='stat-number'>{speedStat}</p>
              </div>
              <div className='statbar-stack'>
                <div className='stat-bar-wrapper'>
                  <HPBar className={`stat-bar ${type1}`} />
                  <div className='stat-bar-empty'></div>
                </div>
                <div className='stat-bar-wrapper'>
                  <ATKBar className={`stat-bar ${type1}`} />
                  <div className='stat-bar-empty'></div>
                </div>
                <div className='stat-bar-wrapper'>
                  <DEFBar className={`stat-bar ${type1}`} />
                  <div className='stat-bar-empty'></div>
                </div>
                <div className='stat-bar-wrapper'>
                  <SPABar className={`stat-bar ${type1}`} />
                  <div className='stat-bar-empty'></div>
                </div>
                <div className='stat-bar-wrapper'>
                  <SPDBar className={`stat-bar ${type1}`} />
                  <div className='stat-bar-empty'></div>
                </div>
                <div className='stat-bar-wrapper'>
                  <SPEEDBar className={`stat-bar ${type1}`} />
                  <div className='stat-bar-empty'></div>
                </div>
              </div>
            </div>
            <div className='total-wrapper'>
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
