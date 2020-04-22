import { ProfilePicData } from './profilepicdata.interface';

export interface UserData {
    id?: number;
    name?: string;
    email: string;
    username?: string;
    password: string;
    gender?: string;
    token?: string;
    markedSpots?: number;
    helpedUsers?: number;
    profilePic?: ProfilePicData;
}