import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Todo from '../Todo/Todo';
import {useDispatch} from 'react-redux/es/hooks/useDispatch';
import {useSelector} from 'react-redux/es/hooks/useSelector';
import {todolist} from '../../redux/slice/todoSlice';

const Works = () => {
  // const param = useParams();
  // console.log('param', param);
  const dispatch = useDispatch();
  const todosList = useSelector((state) => state.todo.todo);
  const todos = async function todoData() {
    await axios
      .get('http://localhost:3001/todos')
      .then((res) => {
        return dispatch(todolist.loadTodo(res.data));
      })
      .catch((e) => {
        return console.log(e);
      });
  };

  useEffect(() => {
    todos();
  }, []);

  return (
    <Container>
      <h2>내 할일</h2>
      {todosList.map((data) => (
        <Todo
          key={data.id}
          id={data.id}
          name={data.name}
          title={data.title}
          content={data.contents}
        />
      ))}
    </Container>
  );
};

export default Works;

const Container = styled.div``;
