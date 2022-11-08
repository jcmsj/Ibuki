import { useState } from 'react'
import { InputTimer } from './counter/InputTimer'
import TopBar from './components/TopBar'
import { Theme } from './components/Theme'
import { CounterProvider } from './counter/CounterProvider'
import { InputMX } from './mx/InputMX'
import { PlayerProvider } from './counter/PlayerProvider'
import Watcher from './counter/Watcher'
import { MXProvider } from './mx/MXProvider'
import RoutineProvider from './routine/RoutineProvider'
import RoutineLoader from './routine/Loader'
import DefaultDrillNav from './routine/Drill'
import Carousel from './carousel/Carousel'
function App() {

  return <>
    <Theme>
      <RoutineProvider>
        <TopBar title="H">
          <RoutineLoader />
          <MXProvider>
            <InputMX />
          </MXProvider>
        </TopBar>
        <nav>
          <DefaultDrillNav />
        </nav>
      <main>
        <CounterProvider initial={10}>
          <PlayerProvider>
            <Watcher />
            <InputTimer />
          </PlayerProvider>
        </CounterProvider>
        <Carousel />
      </main>
      </RoutineProvider>
      <footer>F</footer>
    </Theme>
  </>
}

export default App