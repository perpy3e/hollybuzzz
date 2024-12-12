import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './pages/Profile'
import Footer from './components/Footer'
import Reward from './pages/Reward.jsx'
import Leaderboard from './pages/Leaderboard.jsx'


import Games from './components/Games/Games.jsx'
import MemoGame from './components/Games/MemoGame.jsx'
import TwoZeroFourEightGames from './components/Games/TwoZeroFourEightGames.jsx'
import FloppyBird from './components/Games/floppy-bird.jsx'
import PacMan from './components/Games/PacMan.jsx'
import TicTacToe from './components/Games/TicTacToe.jsx'
import WhackAMole from './components/Games/WhackAMole.jsx'


const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/reward" element={<Reward />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        
        <Route path="/games" element={<Games />} />
        <Route path="/games/memo-game" element={<MemoGame />} />
        <Route path="/games/2048-games" element={<TwoZeroFourEightGames />} />
        <Route path="/games/floppy-bird" element={<FloppyBird />} />
        <Route path="/games/PacMan" element={<PacMan />} />
        <Route path="/games/Tic-Tac-Toe" element={<TicTacToe />} />
        <Route path="/games/WhackAMole" element={<WhackAMole />} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App