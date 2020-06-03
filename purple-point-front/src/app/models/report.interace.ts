import { GeoLocation } from './geolocation.interface';
import { UserData } from './userdata.interface';

export interface Report {
  reportid?:      number;
  description?:   string;
  location?:      GeoLocation;
  user?:          UserData;
  id?:             number;
}