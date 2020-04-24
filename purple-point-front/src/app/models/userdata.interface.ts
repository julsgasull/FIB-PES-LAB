import { ProfilePicData } from './profilepicdata.interface';

export interface UserData {
    id?: number;
    name?: string;
    email: string;
    username?: string;
    password: string;
    gender?: string;
    token?: string;
    lastLocation?: any;
    markedSpots?: number;
    helpedUsers?: number;
    profilePic?: ProfilePicData;
}