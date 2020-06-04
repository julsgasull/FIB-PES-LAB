import { GeoLocation } from './geoLocation.interface';
import { UserData } from './userdata.interface';

export interface Report {
  reportid?:      number;
  description?:   string;
  location?:      GeoLocation;
  reporter?:          UserData;
  id?:             number;
}