import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../service/profile.service';
import { YoutubeAccountService } from '../../service/youtubeaccount.service';
import { MinecraftAccountService } from '../../service/minecraftaccount.service';
import { CapesService } from '../../service/capes.service';
import { SteamAccountService } from '../../service/steamaccount.service';
import { ItemsService } from '../../service/items.service';
import { DiscordAccountService } from '../../service/discordaccount.service';
import { Profile } from '../../data/profile';
import { YoutubeAccount } from '../../data/youtubeaccount';
import { MinecraftAccount } from '../../data/minecraftaccount';
import { Capes } from '../../data/capes';
import { SteamAccount } from '../../data/steamaccount';
import { Items } from '../../data/items';
import { DiscordAccount } from '../../data/discordaccount';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  profile: Profile | undefined;
  minecraftAccounts: MinecraftAccount[] = [];
  capes: { [accountId: number]: Capes[] } = {};
  youtubeAccounts: YoutubeAccount[] = [];
  steamAccounts: SteamAccount[] = [];
  items: { [accountId: number]: Items[] } = [];
  discordAccounts: DiscordAccount[] = [];

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private youtubeAccountService: YoutubeAccountService,
    private minecraftAccountService: MinecraftAccountService,
    private capesService: CapesService,
    private steamAccountService: SteamAccountService,
    private itemsService: ItemsService,
    private discordAccountService: DiscordAccountService
  ) {}

  ngOnInit(): void {
    const profileId = +this.route.snapshot.paramMap.get('id')!;
    this.profileService.getOne(profileId).subscribe((profile: Profile) => {
      this.profile = profile;
      this.loadAccounts(profile.id);
    });
  }

  loadAccounts(profileId: number): void {
    this.youtubeAccountService.getList().subscribe((accounts: YoutubeAccount[]) => {
      this.youtubeAccounts = accounts.filter(account => account.profile.id === profileId);
    });

    this.minecraftAccountService.getList().subscribe((accounts: MinecraftAccount[]) => {
      this.minecraftAccounts = accounts.filter(account => account.profile.id === profileId);
      this.minecraftAccounts.forEach(account => {
        this.capesService.getList().subscribe((capes: Capes[]) => {
          this.capes[account.id] = capes.filter(cape => cape.minecraftAccount.id === account.id);
        });
      });
    });

    this.steamAccountService.getList().subscribe((accounts: SteamAccount[]) => {
      this.steamAccounts = accounts.filter(account => account.profile.id === profileId);
      this.steamAccounts.forEach(account => {
        this.itemsService.getList().subscribe((items: Items[]) => {
          this.items[account.id] = items.filter(item => item.steamAccount.id === account.id);
        });
      });
    });

    this.discordAccountService.getList().subscribe((accounts: DiscordAccount[]) => {
      this.discordAccounts = accounts.filter(account => account.profile.id === profileId);
    });
  }

  onTabChange(index: number): void {
  }
}
