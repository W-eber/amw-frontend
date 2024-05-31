import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../service/profile.service';
import { YoutubeAccountService } from '../../service/youtubeaccount.service';
import { MinecraftAccountService } from '../../service/minecraftaccount.service';
import { CapesService } from '../../service/capes.service';
import { SteamAccountService } from '../../service/steamaccount.service';
import { ItemsService } from '../../service/items.service';
import { DiscordAccountService } from '../../service/discordaccount.service';
import { YoutubeAccount } from '../../data/youtubeaccount';
import { MinecraftAccount } from '../../data/minecraftaccount';
import { Capes } from '../../data/capes';
import { SteamAccount } from '../../data/steamaccount';
import { Items } from '../../data/items';
import { DiscordAccount } from '../../data/discordaccount';
import { Profile } from '../../data/profile';

@Component({
  selector: 'app-home-users',
  templateUrl: './home-users.component.html',
  styleUrls: ['./home-users.component.scss'],
})
export class HomeUsersComponent implements OnInit {
  profiles: Profile[] = [];
  selectedPlatform: { [profileId: number]: string } = {};
  youtubeAccounts: { [profileId: number]: YoutubeAccount[] } = {};
  minecraftAccounts: { [profileId: number]: MinecraftAccount[] } = {};
  capes: { [accountId: number]: Capes[] } = {};
  steamAccounts: { [profileId: number]: SteamAccount[] } = {};
  items: { [accountId: number]: Items[] } = {};
  discordAccounts: { [profileId: number]: DiscordAccount[] } = {};

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private youtubeAccountService: YoutubeAccountService,
    private minecraftAccountService: MinecraftAccountService,
    private capesService: CapesService,
    private steamAccountService: SteamAccountService,
    private itemsService: ItemsService,
    private discordAccountService: DiscordAccountService,
  ) {}

  ngOnInit(): void {
    this.profileService.getList().subscribe((data: Profile[]) => {
      this.profiles = data;
    });
  }

  onPlatformChange(profile: Profile, platform: string): void {
    this.selectedPlatform[profile.id] = platform;
    if (platform === 'YouTube') {
      this.youtubeAccountService.getList().subscribe((accounts: YoutubeAccount[]) => {
        this.youtubeAccounts[profile.id] = accounts.filter(account => account.profile.id === profile.id);
      });
    } else if (platform === 'Minecraft') {
      this.minecraftAccountService.getList().subscribe((accounts: MinecraftAccount[]) => {
        this.minecraftAccounts[profile.id] = accounts.filter(account => account.profile.id === profile.id);
        this.minecraftAccounts[profile.id].forEach(account => {
          this.capesService.getList().subscribe((capes: Capes[]) => {
            this.capes[account.id] = capes.filter(cape => cape.minecraftAccount.id === account.id);
          });
        });
      });
    } else if (platform === 'Steam') {
      this.steamAccountService.getList().subscribe((accounts: SteamAccount[]) => {
        this.steamAccounts[profile.id] = accounts.filter(account => account.profile.id === profile.id);
        this.steamAccounts[profile.id].forEach(account => {
          this.itemsService.getList().subscribe((items: Items[]) => {
            this.items[account.id] = items.filter(item => item.steamAccount.id === account.id);
          });
        });
      });
    } else if (platform === 'Discord') {
      this.discordAccountService.getList().subscribe((accounts: DiscordAccount[]) => {
        this.discordAccounts[profile.id] = accounts.filter(account => account.profile.id === profile.id);
      });
    }
  }

  navigateToProfile(profileId: number): void {
    this.router.navigate(['/profile', profileId]);
  }
}
