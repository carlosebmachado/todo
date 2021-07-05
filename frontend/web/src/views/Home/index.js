import React, { useState } from 'react';
import * as S from './styles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FilterCard from '../../components/FilterCard';


function Home() {
  const [filterActivated, setFilterActivated] = useState('');
  return (
    <S.Container>
      <Header />
      <S.FilterWrapper>
        <FilterCard title="All" actived={filterActivated === 'all'} onClick={() => setFilterActivated('all')} />
        <FilterCard title="Today" actived={filterActivated === 'today'} onClick={() => setFilterActivated('today')} />
        <FilterCard title="Week" actived={filterActivated === 'week'} onClick={() => setFilterActivated('week')} />
        <FilterCard title="Month" actived={filterActivated === 'month'} onClick={() => setFilterActivated('month')} />
        <FilterCard title="Year" actived={filterActivated === 'year'} onClick={() => setFilterActivated('year')} />
      </S.FilterWrapper>
      <Footer />
    </S.Container>
  );
}

export default Home;
