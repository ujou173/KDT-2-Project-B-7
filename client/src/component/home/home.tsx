import React from 'react';
import { NavigateFunction, useNavigate, useLocation, Location } from 'react-router-dom';
import './home.css';

interface Props {}
const Home: React.FC<Props> = () => {

  const navigate:NavigateFunction = useNavigate();
  const location:Location = useLocation();

  const currentLocation = location.pathname

  React.useEffect(()=>{
    const html = document.querySelector('html');
    if (currentLocation === '/') {
      if (html) {
        html.style.overflow = 'hidden';
        document.title = 'welcome CSS!'
      }
    }

    // clean-up code
    return () => {
      if (html) {
        html.style.overflow = '';
      }
    }
  }, [currentLocation])

  return (
    <div className='home'>
      <button onClick={()=>{navigate('/entry')}}>시작하기</button>
    </div>
  )
}
export default Home