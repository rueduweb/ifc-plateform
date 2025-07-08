import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { NgClass, DatePipe } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators, FormControl, ControlConfig } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Player, Regulation } from '../../../models/player';
import { PlayerService } from '../../../services/player.service';
@Component({
  selector: 'app-staff',
  imports: [NgClass, FormsModule, ReactiveFormsModule, DatePipe],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffComponent implements OnInit {

  playerSrv = inject(PlayerService);

  playerList = signal<Player[]>([]);

  tabs: any = [
    { id: 1, label: 'Staff' },
    { id: 2, label: 'Licences' },
    { id: 3, label: 'Inscription' },
    { id: 4, label: 'Admin' }
  ];
  tabSelected: number = 1;
  isModalOpenPlayer = signal<boolean>(false);

  subscribeForm!: FormGroup;
  playerUpdateForm!: FormGroup;
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.subscribeForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      phone: new FormControl(''),
      email: new FormControl('', Validators.email),
      address: new FormControl(''),
      date_birth: new FormControl(''),
      med_certif: new FormControl(''),
      rank: new FormControl(''),
      position: new FormControl(''),
      licence: new FormControl(false),
      regulations: new FormArray([])
    });

    this.playerUpdateForm = new FormGroup({
      id: new FormControl('', {nonNullable: true}),
      firstname: new FormControl('', {nonNullable: true}),
      lastname: new FormControl('', {nonNullable: true}),
      phone: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl(''),
      date_birth: new FormControl(''),
      med_certif: new FormControl(''),
      rank: new FormControl(''),
      position: new FormControl(''),
      licence: new FormControl(false),
	    current_regul: new FormControl(''),
      regulation: new FormControl('')
    });
  }
  
  currentAmounts: Regulation[] = [];
  totalAmounts: number = 0;
  licencePrice: number = 50;

  get regulations(): FormArray {
    return this.subscribeForm.get('regulations') as FormArray;
  }

  onAddRegul() {
    const control = new FormControl(null);
	  (<FormArray>this.subscribeForm.get('regulations')).push(control);
  }

  playerOnSubmit(event: Event) {
    event.preventDefault();
    this.subscribeForm.markAllAsTouched();
    if(this.subscribeForm.invalid) {
      return;
    }
    let idPlayer = uuidv4();
    let newPlayer: Player = {
      id: idPlayer,
      firstname: this.subscribeForm.get('firstname')?.getRawValue(),
      lastname: this.subscribeForm.get('lastname')?.getRawValue(),
      phone: this.subscribeForm.get('phone')?.getRawValue(),
      email: this.subscribeForm.get('email')?.getRawValue(),
      address: this.subscribeForm.get('address')?.getRawValue(),
      date_birth: this.subscribeForm.get('date_birth')?.getRawValue(),
      med_certif: this.subscribeForm.get('med_certif')?.getRawValue(),
      rank: this.subscribeForm.get('rank')?.getRawValue(),
      position: this.subscribeForm.get('position')?.getRawValue(),
      licence: this.subscribeForm.get('licence')?.getRawValue(),
      regulations: []
    };

    let playerTransaction: Regulation = {id: null, playerId: '', date_regul: null, amount: 0};
    
    this.totalAmounts = this.subscribeForm.get('regulations')?.getRawValue()
    .reduce((acc: number, currentValue: number) => acc + currentValue);

    if(!!this.subscribeForm.get('regulations')?.getRawValue() &&
      this.subscribeForm.get('regulations')?.getRawValue().length > 0) {
      playerTransaction = {
        id: uuidv4(),
        playerId: idPlayer,
        date_regul: new Date(),
        amount: this.totalAmounts // amount = somme des versements
      };
      newPlayer.regulations?.push(playerTransaction);
    }
    
    this.addANewPlayer(newPlayer);
    this.playerList = this.playerSrv.playerItems;
    this.subscribeForm.reset();
  }

  addANewPlayer(newPlayer: Player) {
    this.playerSrv.addAPlayer(newPlayer);
  }

  updatePlayer(player: Player, amounts: Regulation[] | null) {
    // if(amounts) this.currentAmounts = amounts;
    var totalReguls: number;
    if(amounts) {
      totalReguls = this.getTotalAmount(amounts);

        if(player && player.lastname && player.date_birth && player.med_certif &&
        player.regulations) {
        // Afficher les propriétés du joueur dans un formulaire (Popup)
        this.playerUpdateForm.get('id')?.setValue(player.id);
        this.playerUpdateForm.get('firstname')?.setValue(player.firstname);
        this.playerUpdateForm.get('lastname')?.setValue(player.lastname);
        this.playerUpdateForm.get('phone')?.setValue(player.phone);
        this.playerUpdateForm.get('email')?.setValue(player.email);
        this.playerUpdateForm.get('address')?.setValue(player.address);
        this.playerUpdateForm.get('date_birth')?.setValue(player.date_birth.toString());
        this.playerUpdateForm.get('med_certif')?.setValue(player.med_certif.toString());
        this.playerUpdateForm.get('rank')?.setValue(player.rank.toString());
        this.playerUpdateForm.get('position')?.setValue(player.position);
        this.playerUpdateForm.get('licence')?.setValue(player.licence);
        this.playerUpdateForm.get('current_regul')?.setValue(totalReguls);
        this.playerUpdateForm.get('regulation')?.setValue(null);
        
        this.openModalOfPlayer();
      }

    }
    
    if (!amounts){
      if(player && player.lastname && player.date_birth && player.med_certif &&
      player.regulations) {
      // Afficher les propriétés du joueur dans un formulaire (Popup)
        this.playerUpdateForm.get('id')?.setValue(player.id);
        this.playerUpdateForm.get('firstname')?.setValue(player.firstname);
        this.playerUpdateForm.get('lastname')?.setValue(player.lastname);
        this.playerUpdateForm.get('phone')?.setValue(player.phone);
        this.playerUpdateForm.get('email')?.setValue(player.email);
        this.playerUpdateForm.get('address')?.setValue(player.address);
        this.playerUpdateForm.get('date_birth')?.setValue(player.date_birth.toString());
        this.playerUpdateForm.get('med_certif')?.setValue(player.med_certif.toString());
        this.playerUpdateForm.get('rank')?.setValue(player.rank.toString());
        this.playerUpdateForm.get('position')?.setValue(player.position);
        this.playerUpdateForm.get('licence')?.setValue(player.licence);
        this.playerUpdateForm.get('current_regul')?.setValue(0);
        this.playerUpdateForm.get('regulation')?.setValue(null);
        
        this.openModalOfPlayer();
      }
    }
  }
  sendModifOnPlayer() {

    let currentAmount: Regulation = {
      id: uuidv4(),
      playerId: this.playerUpdateForm.get('id')?.value,
      date_regul: new Date(),
      amount: this.playerUpdateForm.get('regulation')?.value > 0 ? (this.playerUpdateForm.get('regulation')?.value + this.totalAmounts) : this.totalAmounts 
    };

    this.currentAmounts = [...this.currentAmounts, currentAmount];

    let updatePlayer: Player = {
      id: this.playerUpdateForm.get('id')?.value,
      firstname: this.playerUpdateForm.get('firstname')?.value,
      lastname: this.playerUpdateForm.get('lastname')?.value,
      phone: this.playerUpdateForm.get('phone')?.value,
      email: this.playerUpdateForm.get('email')?.value,
      address: this.playerUpdateForm.get('address')?.value,
      date_birth: this.playerUpdateForm.get('date_birth')?.value.toString(),
      med_certif: this.playerUpdateForm.get('med_certif')?.value.toString(),
      rank: +this.playerUpdateForm.get('rank')?.value.toString(),
      position: this.playerUpdateForm.get('position')?.value.toString(),
      licence: this.playerUpdateForm.get('licence')?.value === 'false' ? false : true,
      regulations: this.currentAmounts
    };
    // méthode update du service PlayerService
    this.playerSrv.updateAPlayer(updatePlayer);
    this.playerList = this.playerSrv.playerItems;
    this.playerUpdateForm.reset();
    this.closeModalOfPlayer();
  }

  getTotalAmount(reguls: Regulation[]): number {
    let totalReguls = 0;
    let regulsTab: number[] = [];
    reguls.forEach((regul: Regulation) => {
      if(regul && regul.amount) {
        regulsTab.push(regul.amount);
      }
    })
    totalReguls = regulsTab.reduce(
        (accumulator, currentValue) => accumulator + currentValue, 0);
    return totalReguls;
  }

  deletePlayer(playerId: string) {
    this.playerSrv.deleteAPlayer(playerId);
    this.playerList = this.playerSrv.playerItems;
  }
  deleteRegul(index: number) {
    const controls = <FormArray>this.subscribeForm.get('regulations');
    controls.removeAt(index);
  }
  deleteUpdateRegul(index: number) {
    const controls = <FormArray>this.playerUpdateForm.get('regulations');
    controls.removeAt(index);
  }

  // ==== Modal actions ==== //
  openModalOfPlayer() {
    this.isModalOpenPlayer.set(true);
  }

  closeModalOfPlayer() {
    this.playerUpdateForm.reset();
    this.isModalOpenPlayer.set(false);
  }

  // ==== Manage Tabs ==== //
  selectTab(tabId: number): void {
    this.tabSelected = tabId;
  }
}
