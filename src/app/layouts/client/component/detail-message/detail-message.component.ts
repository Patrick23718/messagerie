import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { environment } from 'src/environments/environment';
import { NouveauMessageComponent } from '../nouveau-message/nouveau-message.component';

@Component({
  selector: 'app-detail-message',
  templateUrl: './detail-message.component.html',
  styleUrls: ['./detail-message.component.scss'],
})
export class DetailMessageComponent implements OnInit, OnChanges {
  @Input() message = '';

  server = environment.server;

  uid = '';
  msg: any = {
    createdAt: '',
    destinataire: {
      _id: '',
      nom: '',
      prenom: '',
      numero: '',
      email: '',
      imageURL: '',
    },
    expediteur: {
      _id: '',
      nom: '',
      prenom: '',
      numero: '',
      email: '',
      imageURL: '',
    },
    important: true,
    is_read: true,
    message: '',
    status: '',
    _id: '',
  };

  loading = true;

  constructor(
    private route: ActivatedRoute,
    private socket: Socket,
    private Chat: MessagesService,
    public dialog: MatDialog
  ) {
    const user = JSON.parse(localStorage.getItem('user') || '');
    this.uid = user.id;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loading = true;
    console.log(this.message);
    this.updateChat();
    this.Chat.getMessage(this.message).subscribe((res: any) => {
      this.msg = res.message;
      this.loading = false;
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(NouveauMessageComponent, {
      panelClass: 'modalbox',
      data: this.msg,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit(): void {
    const filter = this.route.snapshot.queryParamMap.get('id');
    // console.log(filter);
    this.message = filter || '';
    this.getMessage(this.message);
  }

  getMessage(id: string) {
    this.loading = true;

    this.Chat.getMessage(id).subscribe((res: any) => {
      console.log(res);
      this.msg = res.message;
      this.loading = false;
    });
  }

  updateChat() {
    this.socket.connect();
    const data = {
      userId: this.uid,
      messageId: this.message,
      is_read: true,
    };
    this.socket.emit('update-receive-message', data);
    this.getRecieveMessages().subscribe((data: any) => {
      console.log(data);
      // console.log(this.count);
    });
  }

  getRecieveMessages() {
    const observable = new Observable((observer) => {
      this.socket.on('getmessage', (data: any[]) => {
        // // console.log(data);
        // const test = data.map((m) => {
        //   if (m.destinataire._id == this.id && m.status == 'normal') {
        //     if (!m.is_read) this.count += 1;

        //     return m;
        //   }
        // });
        // this.list = test.filter((el) => {
        //   return el !== null && typeof el !== 'undefined';
        // });
        // // console.log(this.list);
        // this.loading = false;
        observer.next(data);
      });
    });

    return observable;
  }
}
