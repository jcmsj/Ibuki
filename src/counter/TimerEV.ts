export enum TimerEV {
    play,
    pause,
    toggle,
    stop
}

export interface TimerEvent extends CustomEvent{
    detail: {
        type:TimerEV
    }
}
export const name ="timer";

export function send(type:TimerEV=TimerEV.toggle, target:EventTarget=window) {
    target.dispatchEvent(new CustomEvent(name, {detail:{type}}))
}