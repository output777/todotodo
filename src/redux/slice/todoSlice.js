import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  todo: [],
  comment: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const addTodoData = async () => {
        try {
          await axios.post('http://localhost:3001/todos', action.payload);
        } catch (error) {
          console.log(error);
        }
      };
      addTodoData();
      state.todo = [...state.todo, action.payload];
    },
    loadTodo: (state, action) => {
      state.todo = action.payload;
    },
    deleteTodo: (state, action) => {
      const deleteTodoData = async () => {
        try {
          await axios.delete(`http://localhost:3001/todos/${action.payload}`);
        } catch (error) {
          console.log(error);
        }
      };
      deleteTodoData();
      state.todo = state.todo.filter((data) => data.id !== action.payload);
    },
    addComment: (state, action) => {
      // console.log(
      //   'state.comment',
      //   state.comment,
      //   'Boolean',
      //   Boolean(state.comment),
      //   'action.payload',
      //   action.payload
      // );
      state.comment = [...state.comment, action.payload];
      // console.log('state.comment', state.comment);
      const addCommentData = async () => {
        await axios
          .patch(`http://localhost:3001/todos/${action.payload.param}`, {
            comments: state.comment,
          })
          .then((res) => {
            // console.log('res.data2', res.data);
          })
          .catch((err) => console.log(err));
      };
      addCommentData();
      // console.log('state', state.comment, 'action', action.payload);
    },
    loadComment: (state, action) => {
      console.log('state', state.comment, 'action.payload', action.payload);
      state.comment = [];
      if (action.payload) {
        state.comment = action.payload;
      }
    },
    deleteComment: (state, action) => {
      // console.log('state', state.comment, 'action.payload', action.payload);
    },
  },
});
export const todolist = todoSlice.actions;

export default todoSlice.reducer;
