import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Pokemons from './components/pokemons/Pokemons'
import ButtonLoaderMore from './components/layout/ButtonLoaderMore'

function App() {

  return (
    <>
      <div className="App">
      <Pokemons />
      </div>
    </>
  )
}

export default App
