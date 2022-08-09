import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {todolist} from '../../redux/slice/todoSlice';
import {useDispatch} from 'react-redux/es/hooks/useDispatch';
import axios from 'axios';
import styled from 'styled-components';

const Detail = () => {
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [detail, setDetail] = useState([]);
  const [edit, setEdit] = useState(false);
  const [turn, setTurn] = useState(false);
  const [commentId, setCommentId] = useState(0);
  const [comment, setComment] = useState({
    commentid: commentId,
    param: param.id,
    user: '',
    comment: '',
  });

  const todos = async function todoData() {
    await axios
      .get('http://localhost:3001/todos')
      .then((res) => {
        setDetail(res.data.filter((data) => data.id === parseInt(param.id)));
      })
      .catch((e) => {
        return console.log(e);
      });
  };

  const loadCommentDate = async () => {
    await axios
      .get(`http://localhost:3001/todos/`)
      .then((res) => {
        const data = res.data.filter((data) => {
          if (data.id === parseInt(param.id)) {
            console.log('data', data);
            return data;
          }
        });
        console.log(Boolean(data), data, data[0].comments, Boolean(data[0].comments));
        // console.log('data[0].comments', data[0].comments);
        // setCommentId(data[0].comments.length);
        if (data[0].comments) {
          dispatch(todolist.loadComment(data[0].comments));
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    todos();
    loadCommentDate();
  }, [turn]);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSeve = async () => {
    await axios.patch(`http://localhost:3001/todos/${param.id}`, detail[0]);
    setEdit(false);
  };

  const handleInput = (e) => {
    const {value} = e.target;
    setDetail((todo) => [
      {
        ...todo[0],
        contents: value,
      },
    ]);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    console.log('comment', comment);
    dispatch(todolist.addComment(comment));
    setComment({
      ...comment,
      user: '',
      comment: '',
    });
    setTurn((prev) => !prev);
  };

  const handleComment = (e) => {
    const {value, name} = e.target;
    setComment({
      ...comment,
      commentid: commentId,
      [name]: value,
    });
  };

  const handleCommentDelete = (e) => {
    console.dir(e);
  };

  if (!edit) {
    return (
      <div>
        {/* detail.length > 0 조건이 없으면 에러남 */}
        {detail.length > 0 && (
          <div style={{position: 'relative', height: '100vh'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', padding: '1rem'}}>
              <p>id: ({detail[0].id})</p>
              <p
                style={{cursor: 'pointer'}}
                onClick={() => {
                  navigate('/works');
                }}
              >
                이전으로
              </p>
            </div>
            <div style={{padding: '1rem'}}>
              <h2>{detail[0].title}</h2>
              <div>
                <p>{detail[0].contents}</p>
              </div>
            </div>
            <div>
              <button style={{padding: '1rem'}} onClick={handleEdit}>
                수정하기
              </button>
            </div>
            <CommnetContainer>
              <p>눌러서 댓글보기</p>
              <form
                style={{display: 'flex', justifyContent: 'space-between'}}
                onSubmit={handleCommentSubmit}
              >
                <div>
                  <input
                    type="text"
                    placeholder="이름 (5자 이내)"
                    value={comment.user}
                    name="user"
                    onChange={handleComment}
                  />
                  <input
                    type="text"
                    placeholder="댓글을 추가하세요(100자 이내)"
                    value={comment.comment}
                    name="comment"
                    onChange={handleComment}
                  />
                </div>
                <div>
                  <button>추가하기</button>
                </div>
              </form>
              <div
                style={{
                  overflowY: 'scroll',
                  border: '1px solid blue',
                  width: '100%',
                  height: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {detail[0].comments &&
                  detail[0].comments.map((data, index) => {
                    return (
                      <div key={index}>
                        <p>
                          작성자: {data.user} 댓글: {data.comment}
                        </p>
                        <button onClick={handleCommentDelete}>삭제</button>
                      </div>
                    );
                  })}
              </div>
            </CommnetContainer>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        {/* detail.length > 0 조건이 없으면 에러남 */}

        {detail.length > 0 && (
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', padding: '1rem'}}>
              <p>id: ({detail[0].id})</p>
              <p
                style={{cursor: 'pointer'}}
                onClick={() => {
                  navigate('/works');
                }}
              >
                이전으로
              </p>
            </div>
            <div style={{padding: '1rem'}}>
              <h2>{detail[0].title}</h2>
              <div>
                <input type="text" value={detail[0].contents} onChange={handleInput} />
              </div>
            </div>
            <div>
              <button style={{padding: '1rem'}} onClick={handleSeve}>
                저장하기
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default Detail;

const CommnetContainer = styled.div`
  width: 100%;
  height: 500px;
  position: absolute;
  border: 1px solid green;
  padding: 0.5rem;
  box-sizing: border-box;
  bottom: 0px;
  transition: all 1s ease;
`;
