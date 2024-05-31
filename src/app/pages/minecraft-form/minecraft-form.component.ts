import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MinecraftAccountService } from '../../service/minecraftaccount.service';
import { CapesService } from '../../service/capes.service';
import { Profile } from '../../data/profile';
import { MinecraftAccount } from '../../data/minecraftaccount';
import { Capes } from '../../data/capes';

@Component({
  selector: 'app-minecraft-form',
  templateUrl: './minecraft-form.component.html',
  styleUrls: ['./minecraft-form.component.scss']
})
export class MinecraftFormComponent implements OnInit {
  @Input() profile!: Profile;
  @Input() account!: MinecraftAccount;
  @Output() accountChange = new EventEmitter<MinecraftAccount>();

  minecraftForm!: FormGroup;
  accounts: MinecraftAccount[] = [];
  capes: { [accountId: number]: Capes[] } = {};

  constructor(
    private fb: FormBuilder,
    private minecraftAccountService: MinecraftAccountService,
    private capesService: CapesService
  ) {}

  ngOnInit(): void {
    this.minecraftForm = this.fb.group({
      username: [this.account.username, Validators.required],
      nameChanges: [this.account.nameChanges, Validators.required]
    });

    // Load existing Minecraft accounts for the profile
    this.loadMinecraftAccounts();
  }

  loadMinecraftAccounts(): void {
    this.minecraftAccountService.getList().subscribe(accounts => {
      this.accounts = accounts.filter(account => account.profile.id === this.profile.id);
      this.accounts.forEach(account => {
        this.loadCapes(account);
      });
    });
  }

  loadCapes(account: MinecraftAccount): void {
    this.capesService.getList().subscribe(capes => {
      this.capes[account.id] = capes.filter(cape => cape.minecraftAccount.id === account.id);
    });
  }

  addAccount(): void {
    if (this.minecraftForm.valid) {
      const newAccount: MinecraftAccount = {
        id: this.account.id,
        ...this.minecraftForm.value,
        profile: this.profile
      };
      this.minecraftAccountService.save(newAccount).subscribe(account => {
        this.accounts.push(account);
        this.minecraftForm.reset();
        this.accountChange.emit(account); 
      });
    }
  }

  addCape(account: MinecraftAccount, capeName: string): void {
    const newCape: Capes = { id: 0, name: capeName, minecraftAccount: account };
    this.capesService.save(newCape).subscribe(cape => {
      if (!this.capes[account.id]) {
        this.capes[account.id] = [];
      }
      this.capes[account.id].push(cape);
    });
  }
}
