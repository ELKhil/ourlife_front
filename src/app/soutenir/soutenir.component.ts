import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-soutenir',
  templateUrl: './soutenir.component.html',
  styleUrls: ['./soutenir.component.css']
})
export class SoutenirComponent implements OnInit {

  constructor() { }

  // Dans votre composant
  donationAmount: number = 0;  // Affichage actuel
  finalAmount: number = 1234;  // Montant final désiré

  ngOnInit() {
      this.startRandomAnimation();
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
}



