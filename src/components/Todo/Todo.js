import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux/es/hooks/useDispatch';
import {todolist} from '../../redux/slice/todoSlice';

const Todo = ({id, name, title, content}) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  return (
    <TodoBox>
      <div onClick={() => navigate(`/worksDetail/${id}`)} style={{width: '90%'}}>
        <p>{title}</p>
        <p>작성자: {name}</p>
      </div>

      <button
        onClick={() => {
          dispatch(todolist.deleteTodo(id));
        }}
      >
        삭제
      </button>
    </TodoBox>
  );
};

export default Todo;

const TodoBox = styled.div`
  width: 90%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 0.5rem 0 0.5rem 1rem;
  padding: 0.3rem;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    border: 2px solid green;
  }
`;
