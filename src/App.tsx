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
import ShouldLoop from './mx/ShouldLoop'
function App() {

  return <>
    <Theme>
      <RoutineProvider>
        <PlayerProvider>
          <TopBar title="">
            <DrillsTab />
            <RoutineLoader />
            <MXProvider>
              <InputMX />
              <ShouldLoop />
            </MXProvider>
          </TopBar>
          <main>
            <CounterProvider initial={10}>
              <Watcher />
              <InputTimer />
            </CounterProvider>
            <Carousel />
          </main>
          <footer><Flow /></footer>
        </PlayerProvider>
      </RoutineProvider>
    </Theme>
  </>
}

export default App