import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useControl } from "react-map-gl";

import type { MapRef, ControlPosition } from "react-map-gl";

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
    position?: ControlPosition;

    onCreate?: (evt: { features: object[] }) => void;
    onUpdate?: (evt: { features: object[]; action: string }) => void;
    onDelete?: (evt: { features: object[] }) => void;
};

export function DrawCheck({ setPolygonCoordinates }) {
    const modes = MapboxDraw.modes;
    const originalDrawPolygonOnClick = modes.draw_polygon.onClick;
    modes.draw_polygon.onClick = function (state, e) {
        if (state.polygon.coordinates[0]?.length && state.polygon.coordinates[0].length > 3) {
            console.log(state)
            setPolygonCoordinates(state.polygon.coordinates[0])
            state.polygon.ctx.api.changeMode("simple_select", {});
        }
        if (originalDrawPolygonOnClick) {
            originalDrawPolygonOnClick.call(this, state, e);
        }
    };
}

export default function DrawControl(props: DrawControlProps) {
    useControl<MapboxDraw>(
        () => new MapboxDraw(props),
        ({ map }: { map: MapRef }) => {
            map.on("draw.create", props.onCreate);
            map.on("draw.update", props.onUpdate);
            map.on("draw.delete", props.onDelete);
        },
        ({ map }: { map: MapRef }) => {
            map.off("draw.create", props.onCreate);
            map.off("draw.update", props.onUpdate);
            map.off("draw.delete", props.onDelete);
        },
        {
            position: props.position,
        }
    );

    return null;
}

DrawControl.defaultProps = {
    onCreate: () => {},
    onUpdate: () => {},
    onDelete: () => {},
};
