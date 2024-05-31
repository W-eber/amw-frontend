import { Profile } from "./profile";

export class YoutubeAccount {
    public id: number = 0;
    public username : string = ''
    public followers : number = 0
    public profile: Profile = new Profile();  }