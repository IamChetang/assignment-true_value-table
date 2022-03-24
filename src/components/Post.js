import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Post = ({ user }) => {
  let navigate = useNavigate();
  let { id } = useParams();
  return (
    <>
      <tr
        onClick={() => {
          navigate(`/users/${user.id}`);
        }}
      >
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.age}</td>
        <td>{user.email}</td>
        <td>
          <a href='!#'>{user.web}</a>
        </td>
      </tr>
    </>
  );
};

export default Post;
