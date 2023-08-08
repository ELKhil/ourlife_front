import { Component } from '@angular/core';
import { SessionService } from './Services/session.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-new-project';
  result: string = "";

  constructor(
    public session: SessionService,
    private router: Router,
    public dialog: MatDialog
  
 
  ) {}

  confirmDialog(): void {
    const message = `Do you want to save this file?`;

    const dialogData = new ConfirmDialogModel("File Saving Message", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "600px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    });
  }


  ngOnInit(): void {
   // this.router.navigate(['/category']);  
    this.router.navigateByUrl(''); 
  }

  logout() {
    this.session.clear();
    this.router.navigate(['/login']);
  }
}
