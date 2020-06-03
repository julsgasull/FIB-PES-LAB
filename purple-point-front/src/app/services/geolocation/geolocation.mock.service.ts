import { GeoLocationService } from "./geolocation.service";
import { GeoLocation } from 'src/app/models/geolocation.interface';
import { Observable } from 'rxjs';


export class GeolocationMockService extends GeoLocationService {

    getLocation(loc: GeoLocation): Observable<any> {
        return
    }
}