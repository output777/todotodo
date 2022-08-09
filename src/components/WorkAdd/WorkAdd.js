import React, {useState} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {todolist} from '../../redux/slice/todoSlice';
import {useDispatch} from 'react-redux/es/exports';

const WorkAdd = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [todo, setTodo] = useState({
    name: '',
    title: '',
    contents: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(todolist.addTodo(todo));
    setTodo({
      name: '',
      title: '',
      contents: '',
    });
    console.log(todo);
    navigate('/works');
  };
  const handleInput = (e) => {
    const {name, value} = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Text>작성자</Text>
      <Input
        type="text"
        placeholder="작성자의 이름을 입력해주세요"
        name="name"
        value={todo.name}
        onChange={handleInput}
      />
      <Text>제목</Text>
      <Input
        type="text"
        placeholder="제목을 입력해주세요"
        name="title"
        value={todo.title}
        onChange={handleInput}
      />
      <Text>내용</Text>
      <Input
        type="text"
        placeholder="내용을 입력해주세요"
        name="contents"
        value={todo.contents}
        onChange={handleInput}
      />
      <Button>추가하기</Button>
    </Form>
  );
};

export default WorkAdd;

const Form = styled.form``;
const Text = styled.h3`
  margin: 1rem 0 0 1rem;
`;
const Input = styled.input`
  width: 90%;
  height: 30px;
  padding: 1rem;
  margin: 1rem;
  border: 1px solid #eee;
  border-radius: 5px;
  outline: none;
`;

const Button = styled.button`
  border: 1px solid #eee;
  width: 90%;
  height: 50px;
  margin: 1rem 0 0 1rem;
  padding: 1rem;
  border-radius: 5px;
  cursor: pointer;
`;
