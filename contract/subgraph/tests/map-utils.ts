import { newMockEvent } from "matchstick-as"
import { ethereum } from "@graphprotocol/graph-ts"
import { LocationAdded } from "../old_generated/Map/Map"

export function createLocationAddedEvent(
  location: ethereum.Tuple
): LocationAdded {
  let locationAddedEvent = changetype<LocationAdded>(newMockEvent())

  locationAddedEvent.parameters = new Array()

  locationAddedEvent.parameters.push(
    new ethereum.EventParam("location", ethereum.Value.fromTuple(location))
  )

  return locationAddedEvent
}
