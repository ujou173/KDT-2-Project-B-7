import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

interface Props {}
const Home: React.FC<Props> = () => {
  return (
    <div className='home'>
      <Link to="/entry">시작하기</Link>
    </div>
  )
}
export default Home