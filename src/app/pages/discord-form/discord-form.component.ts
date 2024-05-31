import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiscordAccountService } from '../../service/discordaccount.service';
import { Profile } from '../../data/profile';
import { DiscordAccount } from '../../data/discordaccount';

@Component({
  selector: 'app-discord-form',
  templateUrl: './discord-form.component.html',
  styleUrls: ['./discord-form.component.scss']
})
export class DiscordFormComponent implements OnInit {
  @Input() profile!: Profile;
  @Input() account!: DiscordAccount;
  @Output() accountChange = new EventEmitter<DiscordAccount>();

  discordForm!: FormGroup;
  accounts: DiscordAccount[] = [];

  constructor(
    private fb: FormBuilder,
    private discordAccountService: DiscordAccountService
  ) {}

  ngOnInit(): void {
    this.discordForm = this.fb.group({
      username: [this.account.username, Validators.required],
      joinDate: [this.account.joinDate, Validators.required]
    });

    // Load existing Discord accounts for the profile
    this.loadDiscordAccounts();
  }

  loadDiscordAccounts(): void {
    this.discordAccountService.getList().subscribe(accounts => {
      this.accounts = accounts.filter(account => account.profile.id === this.profile.id);
    });
  }

  addAccount(): void {
    if (this.discordForm.valid) {
      const newAccount: DiscordAccount = {
        id: this.account.id,
        ...this.discordForm.value,
        profile: this.profile
      };
      this.discordAccountService.save(newAccount).subscribe(account => {
        this.accounts.push(account);
        this.discordForm.reset();
        this.accountChange.emit(account); // Emit the account change
      });
    }
  }
}
