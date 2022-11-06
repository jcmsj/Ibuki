import { MusicNote } from "@mui/icons-material";
import { IconButton } from '@mui/material';
import { ChangeEvent } from "react";
import { useMXContext } from "./MXProvider";
import Controller from "./Controller";

export function InputMX() {
  let inputter!: HTMLInputElement;
  const audio = useMXContext();

  function revoke(a?: HTMLAudioElement) {
    if (a && a.src)
      URL.revokeObjectURL(
        a.src
      )
  }
  function setBGM(file: File) {
    const src = URL.createObjectURL(file)
    audio.current = new Audio(src)
  }
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.files?.length) {
      //Free current URL Object 
      revoke(audio.current)
      setBGM(e.currentTarget.files[0])
    }
  }

  function onTap() {
    inputter.click()
  }
  return <>
    <Controller />
    <span>
      <input
        type="file"
        id="music-picker"
        accept="audio/*"
        style={{ display: "none" }}
        ref={me => { if (me) inputter = me }}
        onChange={onChange}
      />
      <IconButton
        onClick={onTap}
      >
        <MusicNote />
      </IconButton>
    </span>
  </>
}