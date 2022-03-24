import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  let navigate = useNavigate();
  return (
    <>
      <div className='home_page'>
        <h1>This is home page</h1>
        <h1>Click down for redirect to table of contents</h1>
        <a
          href='#'
          onClick={() => {
            navigate(`/users`);
          }}
        >
          Click here
        </a>
      </div>
    </>
  );
};

export default Home;
