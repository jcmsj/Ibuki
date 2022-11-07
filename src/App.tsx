import { useState } from 'react'
import { InputTimer } from './counter/InputTimer'
import TopBar from './components/TopBar'
import { Theme } from './components/Theme'
import { CounterProvider } from './counter/CounterProvider'
import { InputMX } from './mx/InputMX'
import { PlayerProvider } from './counter/PlayerProvider'
import Watcher from './counter/Watcher'
import { MXProvider } from './mx/MXProvider'
function App() {

  return <>
    <Theme>
      <TopBar title="H">
        <MXProvider>
          <InputMX />
        </MXProvider>
      </TopBar>
      <nav>N</nav>
      <main>
        <CounterProvider initial={10}>
          <PlayerProvider>
            <Watcher />
            <InputTimer />
          </PlayerProvider>
        </CounterProvider>
      </main>
      <footer>F</footer>
    </Theme>
  </>
}

export default App