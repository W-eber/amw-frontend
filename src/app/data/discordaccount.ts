import { Profile } from "./profile";

export class DiscordAccount {
    public id: number = 0;
    public username : string = ''
    public joinDate : Date = new Date()
    public profile: Profile = new Profile();  }