import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MinecraftAccountService } from '../../service/minecraftaccount.service';
import { YoutubeAccountService } from '../../service/youtubeaccount.service';
import { SteamAccountService } from '../../service/steamaccount.service';
import { DiscordAccountService } from '../../service/discordaccount.service';
import { MinecraftAccount } from '../../data/minecraftaccount';
import { YoutubeAccount } from '../../data/youtubeaccount';
import { SteamAccount } from '../../data/steamaccount';
import { DiscordAccount } from '../../data/discordaccount';
import { ProfileService } from '../../service/profile.service';
import { Profile } from '../../data/profile';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  selectedPlatform: string = 'Minecraft';
  profileId: number | null = null;
  accountId: number | null = null;
  profile: Profile | undefined;

  minecraftAccount: MinecraftAccount = new MinecraftAccount();
  youtubeAccount: YoutubeAccount = new YoutubeAccount();
  steamAccount: SteamAccount = new SteamAccount();
  discordAccount: DiscordAccount = new DiscordAccount();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private minecraftAccountService: MinecraftAccountService,
    private youtubeAccountService: YoutubeAccountService,
    private steamAccountService: SteamAccountService,
    private discordAccountService: DiscordAccountService
  ) {}

  ngOnInit(): void {
    this.profileId = +this.route.snapshot.paramMap.get('profileId')!;
    if (this.profileId) {
      this.loadProfile();
    }
  }

  loadProfile(): void {
    this.profileService.getOne(this.profileId!).subscribe(profile => {
      this.profile = profile;
    });
  }

  saveAccount(): void {
    if (!this.profile) return;

    switch (this.selectedPlatform) {
      case 'Minecraft':
        this.minecraftAccount.profile = this.profile;
        this.minecraftAccountService.save(this.minecraftAccount).subscribe(() => this.router.navigate(['/profile', this.profileId]));
        break;
      case 'YouTube':
        this.youtubeAccount.profile = this.profile;
        this.youtubeAccountService.save(this.youtubeAccount).subscribe(() => this.router.navigate(['/profile', this.profileId]));
        break;
      case 'Steam':
        this.steamAccount.profile = this.profile;
        this.steamAccountService.save(this.steamAccount).subscribe(() => this.router.navigate(['/profile', this.profileId]));
        break;
      case 'Discord':
        this.discordAccount.profile = this.profile;
        this.discordAccountService.save(this.discordAccount).subscribe(() => this.router.navigate(['/profile', this.profileId]));
        break;
    }
  }

  deleteAccount(): void {
    if (!this.accountId) {
      return;
    }
    switch (this.selectedPlatform) {
      case 'Minecraft':
        this.minecraftAccountService.delete(this.accountId).subscribe(() => this.router.navigate(['/profile', this.profileId]));
        break;
      case 'YouTube':
        this.youtubeAccountService.delete(this.accountId).subscribe(() => this.router.navigate(['/profile', this.profileId]));
        break;
      case 'Steam':
        this.steamAccountService.delete(this.accountId).subscribe(() => this.router.navigate(['/profile', this.profileId]));
        break;
      case 'Discord':
        this.discordAccountService.delete(this.accountId).subscribe(() => this.router.navigate(['/profile', this.profileId]));
        break;
    }
  }

  onPlatformChange(platform: string): void {
    this.selectedPlatform = platform;
  }
}
