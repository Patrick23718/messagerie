import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public selectedFile: any;

  loading = true;
  loading1 = false;
  loading2 = false;

  email = '';
  nom = '';
  numero = '';
  prenom = '';
  id = '';
  image = null;

  Apwd = '';
  pwd = '';
  cpwd = '';
  server = environment.server;

  constructor(private user: AuthService) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.user.getAllUsers('noukimi.patrick@gmail.com', '123456').subscribe(
      (res) => {
        // localStorage.setItem('x-access-token', res.accessToken);
        this.email = res.email;
        this.nom = res.nom;
        this.numero = res.numero;
        this.prenom = res.prenom;
        this.id = res._id;
        this.image = res.imageURL || null;
        console.log(res);
      },
      (err) => {
        console.warn(err);
      },
      () => {
        this.loading = false;
      }
    );
  }

  updateInfo() {
    this.loading = true;
    this.user
      .updateUser({
        email: this.email,
        prenom: this.prenom,
        nom: this.nom,
        numero: this.numero,
        _id: this.id,
      })
      .subscribe(
        (res) => {
          // localStorage.setItem('x-access-token', res.accessToken);
          console.log(res);
          this.loading = false;
        },
        (err) => {
          console.warn(err);
          this.loading = false;
        },
        () => {}
      );
  }

  profileImage(event: any) {
    this.loading1 = true;
    this.selectedFile = <File>event.target.files[0];
    // console.log(this.selectedFile);
    this.user
      .imageSet(<File>this.selectedFile, this.selectedFile.name)
      .subscribe(
        (res) => {
          // console.log(res);
          this.getProfile();
          this.loading1 = false;
        },
        (err) => {
          console.warn(err);
          this.loading1 = false;
        },
        () => {}
      );
  }

  changepwd() {
    if (this.pwd === this.cpwd) {
      this.loading2 = true;
      this.user
        .updatepwd({ newpassword: this.pwd, password: this.Apwd })
        .subscribe(
          (res) => {
            console.log(res);
            this.loading2 = false;
          },
          (err) => {
            console.warn(err);
            this.loading2 = false;
          },
          () => {}
        );
    }
  }
}
