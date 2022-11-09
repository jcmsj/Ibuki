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
import Carousel from './carousel/Carousel'
import Flow from './routine/Flow'
import DrillsTab from './routine/DrillsTab'
function App() {

  return <>
    <Theme>
      <RoutineProvider>
        <TopBar title="">
          <DrillsTab />
          <RoutineLoader />
          <MXProvider>
            <InputMX />
          </MXProvider>
        </TopBar>
        <main>
          <CounterProvider initial={10}>
            <PlayerProvider>
              <Watcher />
              <InputTimer />
            </PlayerProvider>
          </CounterProvider>
          <Carousel />
        </main>
        <footer><Flow /></footer>
      </RoutineProvider>
    </Theme>
  </>
}

export default App