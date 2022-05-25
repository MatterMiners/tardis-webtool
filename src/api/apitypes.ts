// Unfortunately at this point in time there is no better way to check interfaces at runtime:
// https://stackoverflow.com/questions/14425568/interface-type-check-with-typescript

export interface UserData {
    exp: string
    scopes: string[]
    user: string
}

export function isUserData(claim: any): claim is UserData {
    return (
        'exp' in claim &&
        'scopes' in claim &&
        'user' in claim
    )
}

export interface DroneData {
    remote_resource_uuid: string,
    state: string
    drone_uuid: string,
    site_name: string,
    machine_type: string,
    created: string,
    updated: string
}


export function isDroneData(data: any): data is DroneData {
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
