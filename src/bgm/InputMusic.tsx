import { MusicNote } from "@mui/icons-material";
import { IconButton } from '@mui/material';
import { ChangeEvent } from "react";
import { useAudio, useMedia } from "react-use";
export function InputMusic() {
  let inputter!: HTMLInputElement;

  /* const [audio, state, controls] = useAudio({
    src: "",
    autoPlay: false
  }) */

  function setPlayback(e:ChangeEvent<HTMLInputElement>) {
    //Todo check empty
    const [file] = e.currentTarget.files!;
    // Create a blob that we can use as an src for our audio element
    const urlObj = URL.createObjectURL(file);

    const root = new Audio(urlObj)

    // Clean up the URL Object when done with it
    root.addEventListener("load", () => {
      URL.revokeObjectURL(urlObj);
    });
  }
  return <span>
    <input
      type="file"
      id="music-picker"
      accept="audio/*"
      hidden
      ref={me => { if (me) inputter = me }}
      onChange={e => {
        e.target.files
      }}
    />
    <IconButton
      onClick={inputter?.click}
    >
      <MusicNote />
    </IconButton>;
  </span>
}
