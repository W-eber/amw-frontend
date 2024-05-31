import { Profile } from "./profile";

export class SteamAccount {
    public id: number = 0;
    public username : string = ''
    public friendcode : string = ''
    public profile: Profile = new Profile();  }