import { Profile } from "./profile";

export class MinecraftAccount {
    public id: number = 0;
    public username : string = ''
    public name_changes : number = 0
    public profile: Profile = new Profile();  }