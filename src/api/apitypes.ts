// Incredibly beautiful classes. Unfortunately at this point in time there is no better way to check interfaces at runtime:
// https://stackoverflow.com/questions/14425568/interface-type-check-with-typescript
// The interfaces are there for if I need just the type and not the whole class. (I don't really know. It probably doesn't hurt) 

export interface AccessTokenClaimType {
    exp: string
    scopes: string[]
    sub: string
}

export class AccessTokenClaim {
    exp: string
    scopes: string[]
    sub: string

    constructor(claim: AccessTokenClaimType) {
        if (!this.isAccessTokenClaim(claim)) {
            throw new Error("AccessTokenClaim doesn't have the right shape");
        }

        this.exp = claim.exp
        this.scopes = claim.scopes
        this.sub = claim.sub
    }

    isAccessTokenClaim(claim: any): claim is AccessTokenClaimType {
        return (
            'exp' in claim &&
            'scopes' in claim &&
            'sub' in claim
        )
    }
}

export interface DroneDataType {
    remote_resource_uuid: string,
    state: string
    drone_uuid: string,
    site_name: string,
    machine_type: string,
    created: string,
    updated: string
}

export class DroneData {
    remote_resource_uuid: string
    state: string
    drone_uuid: string
    site_name: string
    machine_type: string
    created: string
    updated: string

    constructor(data: DroneDataType) {
        if (!this.isDroneData(data)) {
            throw new Error("DroneData doesn't have the right shape");
        }

        this.remote_resource_uuid = data.remote_resource_uuid
        this.state = data.state
        this.drone_uuid = data.drone_uuid
        this.site_name = data.site_name
        this.machine_type = data.machine_type
        this.created = data.created
        this.updated = data.updated
    }

    isDroneData(data: any): data is DroneDataType {
        return (
            'remote_resource_uuid' in data &&
            'state' in data &&
            'drone_uuid' in data &&
            'site_name' in data &&
            'machine_type' in data &&
            'created' in data &&
            'updated' in data
        )
    }
}