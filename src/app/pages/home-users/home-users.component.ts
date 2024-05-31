import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { YoutubeAccountService } from '../../service/youtubeaccount.service';
import { DatePipe } from '@angular/common';
import { YoutubeAccount } from '../../data/youtubeaccount';
import { Profile } from '../../data/profile';

@Component({
  selector: 'app-home-users',
  templateUrl: './home-users.component.html',
  styleUrls: ['./home-users.component.scss'],
  providers: [DatePipe]
})
export class HomeUsersComponent implements OnInit {
  profiles: Profile[] = [];
  selectedPlatform: { [profileId: number]: string } = {};
  youtubeAccounts: { [profileId: number]: YoutubeAccount[] } = {};

  constructor(
    private profileService: ProfileService,
    private youtubeAccountService: YoutubeAccountService,
    private datePipe: DatePipe
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
    }
  }

  formatDate(date: Date): string {
    return `Joined ${this.datePipe.transform(date, 'dd.MM.yyyy')}`;
  }
}
