import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-nouveau-message',
  templateUrl: './nouveau-message.component.html',
  styleUrls: ['./nouveau-message.component.scss'],
})
export class NouveauMessageComponent implements OnInit {
  id = '';
  constructor(
    private socket: Socket,
    private user: AuthService,
    private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = JSON.parse(localStorage.getItem('user') || '').id;
    this.user.getOtherUser().subscribe((res: any) => {
      this.users = res;
      console.log(res);
    });
  }

  ngOnInit(): void {
    this.dialog.closeAll;
  }
  street = '';

  destinataire = '';
  objet = '';

  users: any[] = [];

  list: any[] = [];

  msg = '';
  // onClick() {}
  onClick() {
    this.socket.connect();

    var message = {};

    if (this.data == null) {
      message = {
        destinataire: this.destinataire,
        expediteur: this.id,
        message: this.msg,
        objet: this.objet,
      };
    } else {
      message = {
        destinataire: this.data.expediteur,
        expediteur: this.id,
        message: this.msg,
        objet: this.data.objet,
      };
    }
    this.socket.emit('add-message', message);
    this.getMessage().subscribe((data: any) => {
      console.log(data);
      this.msg = '';
    });
    this.joinChat();
    // this.chatService.sendMessage(message).subscribe((res: any) => {
    //   console.log(res);

    //   this.getMessage();
    // });
    //
  }

  see() {
    console.log(this.data);
  }

  ngOnDestroy() {
    // this.socket.disconnect();
  }

  joinChat() {
    this.socket.connect();
    this.socket.emit('get-message-receiver', { userId: this.id });
    this.getMessage().subscribe((data: any) => {
      console.log(data);
    });
  }
  getMessage() {
    const observable = new Observable((observer) => {
      this.socket.on('getmessage', (data: any[]) => {
        console.log(data);

        console.log(data);
        observer.next(data);
      });
    });
    return observable;
  }
}
