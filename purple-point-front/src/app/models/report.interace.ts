import { GeoLocation } from './geoLocation.interface';
import { UserData } from './userData.interface';

export interface Report {
  reportid?:      number;
  description?:   string;
  location?:      GeoLocation;
  user?:          UserData;
  id?:             number;
}