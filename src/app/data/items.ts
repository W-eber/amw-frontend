import { SteamAccount } from "./steamaccount";

export class Items {
    public id! : number
    public name : string = ''
    public price : number = 0
    public steamaccount: SteamAccount["id"] = 0; 
  }