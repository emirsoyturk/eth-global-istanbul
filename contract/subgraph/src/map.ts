import { LocationAdded as LocationAddedEvent, Map as MapContract } from "../generated/Map/Map";
import { User, Border } from "../generated/schema";

export function handleLocationAdded(event: LocationAddedEvent): void {
    let userId = event.transaction.from.toHex();
    let locationId = event.transaction.hash;

    let location = new Border(locationId);
    location.border_latitudes = event.params.location.latitudes;
    location.border_longitudes = event.params.location.longitudes;

    const lats = location.border_latitudes.map<string>((lat) => lat.toString()).join(",");
    const lngs = location.border_longitudes.map<string>((lng) => lng.toString()).join(",");
    const latLng = `${lats}|${lngs}`

    location.border_string = latLng;
    location.border_timestamp = event.params.location.timestamp;
    location.blockTimestamp = event.block.timestamp;
    location.user = userId;
    location.save();

    const latAvg = location.border_latitudes.reduce((a, b) => a + b.toI32(), 0) / location.border_latitudes.length;
    const lngAvg = location.border_longitudes.reduce((a, b) => a + b.toI32(), 0) / location.border_longitudes.length;

    let user = User.load(userId);
    
    if (!user) {
        user = new User(userId);
        user.totalDistance = 0;
    } else {
        const distance = calculateDistance(latAvg, lngAvg, user.lastBorderAvgLat, user.lastBorderAvgLng);
        user.totalDistance  + i32(distance);
    }

    user.lastBorderAvgLat = latAvg;
    user.lastBorderAvgLng = lngAvg;
    user.save()
}

function toRad(value: number) : number {
    return (value * Math.PI) / 180;
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) : number {
    const R = 6371; // Radius of the earth
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}
