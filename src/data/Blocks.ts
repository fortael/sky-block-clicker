import {PlanetMetaInterface} from "../planet";

export const PlanetsArray: Array<PlanetMetaInterface> = [
    {
        type: 'lava',
        size: [50, 50],
        orbit: [30, 50],
        resources: {plasma: [1, 2, 3], crystal: [1, 2, 3]},
        amount: [2, 3],
        tint: [0xF086FF, 0xB886FF, 0xFF86CA],
        texture: 'assets/planets/planet1.png'
    },
    {
        type: 'water',
        size: [50, 50],
        orbit: [100, 150],
        resources: {plasma: [1, 3]},
        amount: [2, 3],
        tint: null,
        texture: 'assets/planets/planet2.png'
    },
];

