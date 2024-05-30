import { Profile } from "./profile";

export class YoutubeAccount {
    public id! : number
    public username : string = ''
    public followers : number = 0
    public profile: Profile["id"] = 0
  }