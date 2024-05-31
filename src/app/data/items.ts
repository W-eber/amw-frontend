import { SteamAccount } from "./steamaccount";

export class Items {
    public id: number = 0;
    public name : string = ''
    public price : number = 0
    public steamaccount: SteamAccount = new SteamAccount();  
  }