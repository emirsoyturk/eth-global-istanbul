// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class LocationAdded extends ethereum.Event {
  get params(): LocationAdded__Params {
    return new LocationAdded__Params(this);
  }
}

export class LocationAdded__Params {
  _event: LocationAdded;

  constructor(event: LocationAdded) {
    this._event = event;
  }

  get location(): LocationAddedLocationStruct {
    return changetype<LocationAddedLocationStruct>(
      this._event.parameters[0].value.toTuple()
    );
  }
}

export class LocationAddedLocationStruct extends ethereum.Tuple {
  get latitudes(): Array<BigInt> {
    return this[0].toBigIntArray();
  }

  get longitudes(): Array<BigInt> {
    return this[1].toBigIntArray();
  }

  get timestamp(): BigInt {
    return this[2].toBigInt();
  }
}

export class Map__addressLocationResultValue0Struct extends ethereum.Tuple {
  get latitudes(): Array<BigInt> {
    return this[0].toBigIntArray();
  }

  get longitudes(): Array<BigInt> {
    return this[1].toBigIntArray();
  }

  get timestamp(): BigInt {
    return this[2].toBigInt();
  }
}

export class Map extends ethereum.SmartContract {
  static bind(address: Address): Map {
    return new Map("Map", address);
  }

  addressLocation(index: BigInt): Map__addressLocationResultValue0Struct {
    let result = super.call(
      "addressLocation",
      "addressLocation(uint256):((uint256[],uint256[],uint256))",
      [ethereum.Value.fromUnsignedBigInt(index)]
    );

    return changetype<Map__addressLocationResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_addressLocation(
    index: BigInt
  ): ethereum.CallResult<Map__addressLocationResultValue0Struct> {
    let result = super.tryCall(
      "addressLocation",
      "addressLocation(uint256):((uint256[],uint256[],uint256))",
      [ethereum.Value.fromUnsignedBigInt(index)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<Map__addressLocationResultValue0Struct>(value[0].toTuple())
    );
  }

  addressLocationCount(): BigInt {
    let result = super.call(
      "addressLocationCount",
      "addressLocationCount():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_addressLocationCount(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "addressLocationCount",
      "addressLocationCount():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class AddLocationCall extends ethereum.Call {
  get inputs(): AddLocationCall__Inputs {
    return new AddLocationCall__Inputs(this);
  }

  get outputs(): AddLocationCall__Outputs {
    return new AddLocationCall__Outputs(this);
  }
}

export class AddLocationCall__Inputs {
  _call: AddLocationCall;

  constructor(call: AddLocationCall) {
    this._call = call;
  }

  get _proof(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _publicInputs(): Array<Bytes> {
    return this._call.inputValues[1].value.toBytesArray();
  }
}

export class AddLocationCall__Outputs {
  _call: AddLocationCall;

  constructor(call: AddLocationCall) {
    this._call = call;
  }
}