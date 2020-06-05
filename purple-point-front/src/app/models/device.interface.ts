import { UserData } from './userdata.interface';
import { GeoLocation } from './geoLocation.interface';

export interface Device {
    location: GeoLocation,
    user?: UserData,
    firebaseToken: string 
}
