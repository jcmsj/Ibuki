import { useRoutineContext } from "../routine/RoutineProvider"
import { Item } from "../routine/types"
import "./carousel.sass"

export default function Carousel() {
    const { state } = useRoutineContext()
    return <div id="carousel">
        {state.drill?.items.map((item, i) =>
            <Slide item={item}
                key={item.name}
                active={i == state.itemIndex}
            />)
        }
    </div>
}

export function Slide({ item, active = false }: { item?: Item, active?: boolean }) {
    return <figure>
        <img
            // @ts-ignore warns with the usage of active attribute
            active={active ? "active" : undefined}
            src={item?.media}
            alt={item?.name}
        />
    </figure>
}