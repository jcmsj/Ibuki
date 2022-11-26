import { reducer, nextFlow, jumpTo, RoutineState } from "../src/routine/RoutineProvider"
import sample from "../src/sample/routine.json";

let next:RoutineState;
describe("Reducer works correctly", () => {
    beforeEach(() => {
        next = reducer({}, { routine: sample })
    })
    it("Can set routine", () => {
        expect(next.routine).toEqual(sample)
    })

    it("Selects 1st drill after setting routine", () => {
        expect(next).not.toHaveProperty("drill", undefined)
    })

    it("Selects first item in drill", () => {
        expect(next).not.toHaveProperty("item", undefined)
    })
})