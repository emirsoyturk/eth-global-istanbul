import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import { LocationAdded } from "../generated/Map/Map"

export function createLocationAddedEvent(
  location: ethereum.Tuple,
  timestamp: BigInt
): LocationAdded {
  let locationAddedEvent = changetype<LocationAdded>(newMockEvent())

  locationAddedEvent.parameters = new Array()

  locationAddedEvent.parameters.push(
    new ethereum.EventParam("location", ethereum.Value.fromTuple(location))
  )
  locationAddedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return locationAddedEvent
}
