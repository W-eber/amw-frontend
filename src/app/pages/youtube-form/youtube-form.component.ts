import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { YoutubeAccountService } from '../../service/youtubeaccount.service';
import { Profile } from '../../data/profile';
import { YoutubeAccount } from '../../data/youtubeaccount';

@Component({
  selector: 'app-youtube-form',
  templateUrl: './youtube-form.component.html',
  styleUrls: ['./youtube-form.component.scss']
})
export class YoutubeFormComponent implements OnInit {
  @Input() profile!: Profile;
  @Input() account!: YoutubeAccount;
  @Output() accountChange = new EventEmitter<YoutubeAccount>();

  youtubeForm!: FormGroup;
  accounts: YoutubeAccount[] = [];

  constructor(
    private fb: FormBuilder,
    private youtubeAccountService: YoutubeAccountService
  ) {}

  ngOnInit(): void {
    this.youtubeForm = this.fb.group({
      username: [this.account.username, Validators.required],
      followers: [this.account.followers, Validators.required]
    });

    // Load existing YouTube accounts for the profile
    this.loadYoutubeAccounts();
  }

  loadYoutubeAccounts(): void {
    this.youtubeAccountService.getList().subscribe(accounts => {
      this.accounts = accounts.filter(account => account.profile.id === this.profile.id);
    });
  }

  addAccount(): void {
    if (this.youtubeForm.valid) {
      const newAccount: YoutubeAccount = {
        id: this.account.id,
        ...this.youtubeForm.value,
        profile: this.profile
      };
      this.youtubeAccountService.save(newAccount).subscribe(account => {
        this.accounts.push(account);
        this.youtubeForm.reset();
        this.accountChange.emit(account); // Emit the account change
      });
    }
  }
}
