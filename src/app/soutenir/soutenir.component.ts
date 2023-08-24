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
  donations! : any

  constructor(
    private fb: FormBuilder,
    private donationservice :  donationService,
  ) { }

  // Dans votre composant
  donationAmount: number = 0;  // Affichage actuel
  finalAmount: number  = 0;  // Montant final désiré

  ngOnInit() {
    this.donationservice.get().subscribe((data: any) => {
      this.donations = data.donations;
      this.finalAmount = data.totalDonation;
    });


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
          next : (response) => {
            if (response && response.url) {
                window.location.href = response.url;  // Redirection vers Stripe
            } else {
                toastr.error("Impossible de rediriger vers Stripe. URL manquante.");
            }
          },
          error: () => {
            toastr.error("Quelque chose s'est mal passé.");
          }
        });
    }else{
        toastr.error("Veuillez entrer un montant.");
    }
}


}



