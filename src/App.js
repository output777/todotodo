import './App.css';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

function App() {
  let navigate = useNavigate();
  return (
    <div className="App">
      <TodoRecord onClick={() => navigate('/work/add')}>
        <p>할 일 기록하기</p>
      </TodoRecord>
      <Todolist onClick={() => navigate('/works')}>
        <p>TODO LIST</p>
      </Todolist>
    </div>
  );
}

export default App;

const TodoRecord = styled.div`
  border: 1px solid #eee;
  width: 90%;
  height: 100px;
  margin: 1rem;
  padding-top: 1rem;
  cursor: pointer;
`;

const Todolist = styled(TodoRecord)``;
