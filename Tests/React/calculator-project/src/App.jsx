import { useState } from 'react'
import './App.css'
import Display from './components/Display/Display'
import Buttons from './components/Button/Button'

function App() {

  return (
      <main id="App">
        <Display />
        <section className='grid grid-buttons'>
          <div className='row row-1'>
            <Buttons value={7} />
            <Buttons value={8} />
            <Buttons value={9} />
            <Buttons value={'DEL'} />
          </div>
          <div className='row row-2'>
            <Buttons value={1} />
            <Buttons value={1} />
            <Buttons value={1} />
            <Buttons value={1} />
          </div>
          <div className='row row-3'>
            <Buttons value={1} />
            <Buttons value={1} />
            <Buttons value={1} />
            <Buttons value={1} />
          </div>
          <div className='row row-4'>
            <Buttons value={1} />
            <Buttons value={1} />
            <Buttons value={1} />
            <Buttons value={1} />
          </div>
        </section>
      </main>
  )
}

export default App
