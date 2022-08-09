import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import WorkAdd from './components/WorkAdd/WorkAdd';
import Works from './components/Works/Works';
import {store} from './redux/store/store';
import {Provider} from 'react-redux';
import Detail from './components/Detail/Detail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={[<App />]} />
          <Route path="/work/add" element={[<WorkAdd />]} />
          <Route path="/works" element={[<Works />]} />
          <Route path="/worksDetail/:id" element={[<Detail />]} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
