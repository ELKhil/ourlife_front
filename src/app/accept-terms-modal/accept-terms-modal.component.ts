import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SessionService } from '../Services/session.service';


@Component({
  selector: 'app-accept-terms-modal',
  templateUrl: './accept-terms-modal.component.html',
  styleUrls: ['./accept-terms-modal.component.css']
})
export class AcceptTermsModalComponent implements OnInit {
  showModal = true;
  hasNavigated = false; 
  linkClicked = false; // Ajout de ce drapeau
  isLogged: boolean = false;

  constructor(private router: Router, private session: SessionService) { }

  ngOnInit(): void {


    this.session.isLogged.subscribe(loggedIn => {
      this.isLogged = loggedIn;
  
      if (this.isLogged) {
          this.showModal = false;
          return; 
      }
    });

    const acceptedTerms = localStorage.getItem('acceptedTerms');
    const hideModalSession = sessionStorage.getItem('hideModal');

    if (acceptedTerms === 'true' || hideModalSession === 'true') {
      this.showModal = false;
      return; // Sortir de la méthode si la modal ne doit pas être affichée
    }
  
    this.router.events.pipe(
      filter((event): event is NavigationStart => event instanceof NavigationStart)
    ).subscribe(event => {
      if (!this.showModal) return; 
    });
    
}


  acceptTerms() {
    // Sauvegardez l'acceptation de l'utilisateur (par exemple dans un cookie ou dans le local storage)
    // Puis, fermez la modal
    localStorage.setItem('acceptedTerms', 'true');
    this.showModal = false;
  }

  declineTerms() {
    // Gérez le refus de l'utilisateur (peut-être rediriger vers une autre page ou simplement fermer la modal)
     // You can handle decline logic here
     this.router.navigateByUrl('/'); 
     this.showModal = false;
  }

  handleLinkClick(event: Event, link: string): void {
    event.preventDefault(); 
    this.linkClicked = true; // Mettre à jour le drapeau lorsqu'un lien est cliqué
    this.router.navigateByUrl(link); // Utilisez `navigateByUrl` au lieu de `window.open` pour naviguer à l'intérieur de l'application
  }
}

  


