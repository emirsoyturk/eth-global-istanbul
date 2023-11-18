import {
    LocationAdded as LocationAddedEvent,
    Map as MapContract,
} from "../generated/Map/Map";
import { User, Location } from "../generated/schema";

export function handleLocationAdded(event: LocationAddedEvent): void {
    let userId = event.transaction.from.toHex();
    let locationId = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

    let location = new Location(locationId);
    location.location_latitudes = event.params.location.latitudes;
    location.location_longitudes = event.params.location.longitudes;
    location.location_timestamp = event.params.location.timestamp;
    location.blockTimestamp = event.block.timestamp;
    location.user = userId
    location.save();

    let user = User.load(userId);
    if (!user) {
        user = new User(userId);
        user.save();
    }

}
