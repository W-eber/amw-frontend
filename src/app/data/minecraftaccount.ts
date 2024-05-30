import { Profile } from "./profile";

export class MinecraftAccount {
    public id! : number
    public username : string = ''
    public name_changes : number = 0
    public profile: Profile["id"] = 0
  }