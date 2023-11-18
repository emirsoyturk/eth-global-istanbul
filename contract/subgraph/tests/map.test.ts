import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import {} from "@graphprotocol/graph-ts"
import { LocationAdded } from "../old_generated/schema"
import { LocationAdded as LocationAddedEvent } from "../old_generated/Map/Map"
import { handleLocationAdded } from "../src/map"
import { createLocationAddedEvent } from "./map-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let location = "ethereum.Tuple Not implemented"
    let newLocationAddedEvent = createLocationAddedEvent(location)
    handleLocationAdded(newLocationAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("LocationAdded created and stored", () => {
    assert.entityCount("LocationAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "LocationAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "location",
      "ethereum.Tuple Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
