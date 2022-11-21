import "reflect-metadata";

import { getDistance } from "geolib";

import { Point } from "../dtos/point.dto";
import { findARound } from "./geo.util";

const point = { latitude: 34.090166, longitude: -118.276736555556 } as Point;
const startPoint = { latitude: 34.08118284715881, longitude: -118.28758372313425 } as Point;
const endPoint = { latitude: 34.0991491528412, longitude: -118.26588938797775 } as Point;

describe('findARound', () => {

    it('should return the top most north, east, south and west points for a given distance', () => {
        const bounds1000meters = findARound(point, 1000);

        expect(bounds1000meters).toEqual({ start: startPoint, end: endPoint });
    });

    it('should correctly calculate the given distance for the returned bounds', () => {
        const bounds1000meters = findARound(point, 1000);

        expect(bounds1000meters).toEqual({ start: startPoint, end: endPoint });

        const north = {
            latitude: bounds1000meters.end.latitude,
            longitude: point.longitude,
        };
        const east = {
            latitude: point.latitude,
            longitude: bounds1000meters.end.longitude,
        };
        const south = {
            latitude: bounds1000meters.start.latitude,
            longitude: point.longitude,
        };
        const west = {
            latitude: point.latitude,
            longitude: bounds1000meters.start.longitude,
        };

        expect(getDistance(point, north)).toBe(1000);
        expect(getDistance(point, east)).toBe(1000);
        expect(getDistance(point, south)).toBe(1000);
        expect(getDistance(point, west)).toBe(1000);
    });
});