import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../Services/user.service';

declare var toastr: any;

@Component({
  selector: 'app-verify-token',
  templateUrl: './verify-token.component.html',
  styleUrls: ['./verify-token.component.css']
})
export class VerifyTokenComponent implements OnInit {

  messageReponse!: string;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {}

  validerEmail() {
    const token = this.route.snapshot.paramMap.get('token');
    

    if (token) {
      this.isLoading = true; // On active le chargement
      this.userService.verifyToken(token).subscribe((response: any) => {
        this.messageReponse = response.message;
        this.isLoading = false;
        toastr.success("Votre adresse email a été validée avec succès");
      },
      (error) => {
        this.isLoading = false;
        toastr.error("La validation a échoué..!!");
      });
    } else {
      this.isLoading = false;
      toastr.error("Opération impossible");
    }
  }
}
