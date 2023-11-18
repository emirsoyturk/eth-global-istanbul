import { LocationAdded as LocationAddedEvent } from "../generated/Map/Map"
import { LocationAdded } from "../generated/schema"

export function handleLocationAdded(event: LocationAddedEvent): void {
  let entity = new LocationAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.location_latitudes = event.params.location.latitudes
  entity.location_longitudes = event.params.location.longitudes
  entity.location_timestamp = event.params.location.timestamp
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
