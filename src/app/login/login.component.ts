import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  loading = false;
  constructor(
    private user: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    // localStorage.removeItem('x-access-token');
    // localStorage.removeItem('user');
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Fermer', {
      duration: 5000,
    });
  }

  ngOnInit(): void {}

  connexion() {
    this.loading = true;
    this.user.login(this.email, this.password).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('x-access-token', res.accessToken);
        const userlog = {
          email: res.email,
          id: res.id,
          imageURL: res.imageURL,
          nom: res.nom,
          prenom: res.prenom,
          role: res.role,
        };
        localStorage.setItem('user', JSON.stringify(userlog));
        this.loading = false;
        this.reset();
        this.router.navigateByUrl('/');
      },
      (err) => {
        console.log(err);
        this.loading = false;
        this.openSnackBar(err.error.message);
      }
    );
  }

  reset() {
    this.email = '';
    this.password = '';
  }
}
