import { UserData } from './userdata.interface';
import { GeoLocation } from './geolocation.interface';

export interface Device {
    location: GeoLocation,
    user?: UserData,
    firebaseToken: string 
}
