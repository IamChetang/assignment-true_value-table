import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Table from './components/Table';
import Profile from './components/Profile';

import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(13);
  const [order, setOrder] = useState('ASC');

  let url =
    'https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json';
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // get the current users
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = user.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // sort function
  const sorting = (col) => {
    if (order === 'ASC') {
      const sorted = [...user].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setUser(sorted);
      setOrder('DSC');
    }
    if (order === 'DSC') {
      const sorted = [...user].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setUser(sorted);
      setOrder('ASC');
    }
  };

  const sortNumber = (col) => {
    if (order === 'ASC') {
      const sorted = [...user].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setUser(sorted);
      setOrder('DSC');
    }
    if (order === 'DSC') {
      const sorted = [...user].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setUser(sorted);
      setOrder('ASC');
    }
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route
          path='/users'
          element={
            <Table
              computedUser={currentPosts}
              totalPosts={user.length}
              postPerPage={postPerPage}
              paginate={paginate}
              sorting={sorting}
              sortNumber={sortNumber}
            />
          }
        ></Route>
        <Route path='/users/:id' element={<Profile user={user} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
