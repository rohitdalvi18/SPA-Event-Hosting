import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/san-francisco-events'); 
  }, [navigate]);

  return <h1>Coming Soon</h1>; 
};

export default Home;