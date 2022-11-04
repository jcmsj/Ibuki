import { useState } from 'react'
import { InputTimer } from './counter/InputTimer'
import TopBar from './components/TopBar'
import { Theme } from './components/Theme'
import { CounterProvider } from './counter/CounterProvider'
import { MusicNote } from "@mui/icons-material"
import { IconButton } from '@mui/material'
function App() {

  return <>
    <Theme>
      <TopBar title="H">
        <IconButton>
          <MusicNote />
        </IconButton>
      </TopBar>
      <nav>N</nav>
      <main>
        <CounterProvider>
          <InputTimer />
        </CounterProvider>
      </main>
      <footer>F</footer>
    </Theme>
  </>
}

export default App
