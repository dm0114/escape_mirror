import React from 'react';
import logo from './logo.svg';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from '@components/Header';
import Admin from '@pages/Admin';
import Login from '@pages/Login';
import Reservation from '@pages/Reservation';
import Theme from '@pages/Theme';
import Home from '@pages/Home';
import { css } from '@emotion/react';
import NotFound from '@pages/NotFound';
import UnityMainBook from './Unity/UnityMainBook';
import UnityTest from './Unity/UnityTest';
import UnityBookTest from './Unity/UnityBookTest';
import UnityMainMypage from './Unity/UnityMainMypage';

const style = css`
  color:pink;
`

function App() {

  return (
    <>
      <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/theme" element={<Theme />} />
          <Route path="/admin/reservation" element={<Reservation />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />}/>
          <Route path="/unity/main/book" element={<UnityMainBook />}/>
          <Route path="/unity/test" element={<UnityTest />}/>
          <Route path="/unity/main/test" element={<UnityBookTest />}/>
          <Route path="/unity/main/mypage" element={<UnityMainMypage />}/>
        </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
