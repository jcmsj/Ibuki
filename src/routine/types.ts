export interface Item {
    name:string,
    media:string,
    span?:number,//TODO: Include span
}

export interface Drill {
    sets:number,
    name:string
    items:Item[],
}

export interface Routine {
    name:string,
    description:string,

    //Global timer
    //TODO Chan
    timer:{
        action:number,
        break:number,
        prep:number,
    },
    drills:Drill[]
}
