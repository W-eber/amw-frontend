import { Profile } from "./profile";

export class DiscordAccount {
    public id! : number
    public username : string = ''
    public join_date : Date = new Date()
    public profile: Profile["id"] = 0
  }