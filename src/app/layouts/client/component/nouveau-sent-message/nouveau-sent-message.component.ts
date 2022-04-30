import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-nouveau-sent-message',
  templateUrl: './nouveau-sent-message.component.html',
  styleUrls: ['./nouveau-sent-message.component.scss'],
})
export class NouveauSentMessageComponent implements OnInit {
  id = '';
  constructor(private socket: Socket, private user: AuthService) {
    this.id = JSON.parse(localStorage.getItem('user') || '').id;
    this.user.getOtherUser().subscribe((res: any) => {
      this.users = res;
      console.log(res);
    });
  }

  ngOnInit(): void {}
  street = '';

  destinataire = '';
  objet = '';

  users: any[] = [];

  list: any[] = [];

  msg = '';
  // onClick() {}
  onClick() {
    this.socket.connect();
    const message = {
      destinataire: this.destinataire,
      expediteur: this.id,
      message: this.msg,
    };
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
