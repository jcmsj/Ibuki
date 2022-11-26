export enum TimerEV {
    PLAY="play",
    PAUSE="pause",
    TOGGLE="toggle",
    STOP="stop",
    NEXT="next"
}

export const TimerEVList = Object.values(TimerEV);
export interface TimerEvent extends CustomEvent{
    detail: {
        type:TimerEV
    }
}
export const name ="timer";

export function send(type:TimerEV=TimerEV.TOGGLE, target:EventTarget=window) {
    target.dispatchEvent(new CustomEvent(name, {detail:{type}}))
}