import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SteamAccountService } from '../../service/steamaccount.service';
import { ItemsService } from '../../service/items.service';
import { Profile } from '../../data/profile';
import { SteamAccount } from '../../data/steamaccount';
import { Items } from '../../data/items';

@Component({
  selector: 'app-steam-form',
  templateUrl: './steam-form.component.html',
  styleUrls: ['./steam-form.component.scss']
})
export class SteamFormComponent implements OnInit {
  @Input() profile!: Profile;
  @Input() account!: SteamAccount;
  @Output() accountChange = new EventEmitter<SteamAccount>();

  steamForm!: FormGroup;
  accounts: SteamAccount[] = [];
  items: { [accountId: number]: Items[] } = {};

  constructor(
    private fb: FormBuilder,
    private steamAccountService: SteamAccountService,
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.steamForm = this.fb.group({
      username: [this.account.username, Validators.required],
      friendCode: [this.account.friendCode, Validators.required]
    });

    // Load existing Steam accounts for the profile
    this.loadSteamAccounts();
  }

  loadSteamAccounts(): void {
    this.steamAccountService.getList().subscribe(accounts => {
      this.accounts = accounts.filter(account => account.profile.id === this.profile.id);
      this.accounts.forEach(account => {
        this.loadItems(account);
      });
    });
  }

  loadItems(account: SteamAccount): void {
    this.itemsService.getList().subscribe(items => {
      this.items[account.id] = items.filter(item => item.steamAccount.id === account.id);
    });
  }

  addAccount(): void {
    if (this.steamForm.valid) {
      const newAccount: SteamAccount = {
        id: this.account.id,
        ...this.steamForm.value,
        profile: this.profile
      };
      this.steamAccountService.save(newAccount).subscribe(account => {
        this.accounts.push(account);
        this.steamForm.reset();
        this.accountChange.emit(account); // Emit the account change
      });
    }
  }

  addItem(account: SteamAccount, itemName: string, itemPrice: string): void {
    const price = parseFloat(itemPrice); // Convert the price to a number
    if (!isNaN(price)) {
      const newItem: Items = { id: 0, name: itemName, price: price, steamAccount: account };
      this.itemsService.save(newItem).subscribe(item => {
        if (!this.items[account.id]) {
          this.items[account.id] = [];
        }
        this.items[account.id].push(item);
      });
    }
  }
}
