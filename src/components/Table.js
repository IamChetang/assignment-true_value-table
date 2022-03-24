import React, { useState } from 'react';

import Post from './Post';
import Pagination from './Pagination';
import { FaSort } from 'react-icons/fa';

const Table = ({
  computedUser,
  postPerPage,
  totalPosts,
  paginate,
  sorting,
  sortNumber,
}) => {
  const [search, setSearch] = useState('');

  return (
    <>
      <div className='heading'>
        <h1>Users</h1>
        <form className='d-flex input-group w-auto'>
          <input
            type='text'
            placeholder='Search for first name and last name'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      <div className='row w-100'>
        <div className='col mb-3 col-12 text-center'>
          <table className='table table-striped'>
            <thead>
              <th>
                First Name
                <button onClick={() => sorting('first_name')}>
                  <FaSort />
                </button>
              </th>
              <th>
                Last Name
                <button onClick={() => sorting('last_name')}>
                  <FaSort />
                </button>
              </th>
              <th>
                Age
                <button onClick={() => sortNumber('age')}>
                  <FaSort />
                </button>
              </th>
              <th>
                Email
                <button onClick={() => sorting('email')}>
                  <FaSort />
                </button>
              </th>
              <th>Web</th>
            </thead>

            <tbody>
              {computedUser
                .filter((value) => {
                  if (search === '') {
                    return value;
                  } else if (
                    value.first_name
                      .toLowerCase()
                      .includes(search.toLocaleLowerCase()) ||
                    value.last_name
                      .toLowerCase()
                      .includes(search.toLocaleLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((data) => {
                  return <Post key={data.id} user={data} />;
                })}
            </tbody>
          </table>
        </div>
        <Pagination
          postPerPage={postPerPage}
          totalPosts={totalPosts}
          paginate={paginate}
        />
      </div>
    </>
  );
};

export default Table;
