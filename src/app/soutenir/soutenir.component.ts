import { donationService } from './../Services/donationService';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

declare var toastr : any;

@Component({
  selector: 'app-soutenir',
  templateUrl: './soutenir.component.html',
  styleUrls: ['./soutenir.component.css']
})
export class SoutenirComponent implements OnInit {
  donationForm! : FormGroup;

  constructor(
    private fb: FormBuilder,
    private donationservice :  donationService,
  ) { }

  // Dans votre composant
  donationAmount: number = 0;  // Affichage actuel
  finalAmount: number = 1234;  // Montant final désiré

  ngOnInit() {
      this.startRandomAnimation();
      this.donationForm = this.fb.group({
        amount: [null],
      })
  }

  startRandomAnimation() {
      let randomInterval = setInterval(() => {
          // Génération d'un chiffre aléatoire
          this.donationAmount = Math.floor(Math.random() * (this.finalAmount + 1));
      }, 100); // Change le chiffre toutes les 100 millisecondes

      setTimeout(() => {
          clearInterval(randomInterval);  // Arrête la génération aléatoire
          this.donationAmount = this.finalAmount;  // Affiche le montant final
      }, 3000);  // Durée de l'animation avant d'afficher le montant final
  }

  submit(){
    if(this.donationForm.valid){
        this.donationservice.post(this.donationForm.value).subscribe({
          next : (p) => {
            toastr.success("Votre poste a bien été enregistré");
          }, error: () => {
            toastr.error("Something wrong");
          }
        })
    }else{
      toastr.error("Veuillez entrer un montant.")
    }
  }

}



