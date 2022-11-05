import { useState } from 'react'
import { InputTimer } from './counter/InputTimer'
import TopBar from './components/TopBar'
import { Theme } from './components/Theme'
import { CounterProvider } from './counter/CounterProvider'
import { InputMusic } from './bgm/InputMusic'
import { PlayerProvider } from './counter/PlayerProvider'
function App() {

  return <>
    <Theme>
      <TopBar title="H">
        {InputMusic()}
      </TopBar>
      <nav>N</nav>
      <main>
        <CounterProvider>
          <PlayerProvider>
            <InputTimer />
          </PlayerProvider>
        </CounterProvider>
      </main>
      <footer>F</footer>
    </Theme>
  </>
}

export default App