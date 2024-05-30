import { Profile } from "./profile";

export class SteamAccount {
    public id! : number
    public username : string = ''
    public friendcode : string = ''
    public profile: Profile["id"] = 0
  }