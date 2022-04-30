import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-list-sent-message',
  templateUrl: './list-sent-message.component.html',
  styleUrls: ['./list-sent-message.component.scss'],
})
export class ListSentMessageComponent implements OnInit {
  @Output() drawerIcon = new EventEmitter<boolean>();
  @Output() unread = new EventEmitter<number>();
  @Output() messageId = new EventEmitter<string>();
  id: any;
  loading: boolean = true;
  count = 0;
  constructor(
    private socket: Socket,
    private chatMessage: MessagesService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((data) => {
      console.log(data);
    });
    this.id = JSON.parse(localStorage.getItem('user') || '').id;
    this.socket.connect();
    this.joinChat();
  }

  ngOnDestroy() {
    // this.socket.disconnect();
  }

  // joinChat1() {
  //   this.socket.connect();

  //   this.chatMessage.getReceiveMessages().subscribe(
  //     (res: any) => {
  //       console.log(res);
  //     },
  //     (err: any) => {
  //       console.warn(err);
  //     }
  //   );
  // }

  viewMessage(item: any) {
    item.is_read = true;
    this.messageId.emit(item._id);
  }

  joinChat() {
    this.socket.connect();
    this.socket.emit('get-message-receiver', { userId: this.id });
    this.getSendMessages().subscribe((data: any) => {
      console.log(data);
      // console.log(this.count);
      this.unread.emit(this.count);
    });
  }

  getSendMessages() {
    this.list = [];
    const observable = new Observable((observer) => {
      this.socket.on('getmessage', (data: any[]) => {
        // console.log(data);
        const test = data.map((m) => {
          if (m.expediteur._id == this.id && m.status == 'normal') {
            return m;
          }
        });
        this.list = test.filter((el) => {
          return el !== null && typeof el !== 'undefined';
        });
        console.log(this.list);
        this.loading = false;
        observer.next(data);
      });
    });

    return observable;
  }

  getDraftMessages() {
    this.list = [];
    const observable = new Observable((observer) => {
      this.socket.on('getmessage', (data: any[]) => {
        // console.log(data);
        const test = data.map((m) => {
          if (m.expediteur._id == this.id && m.status == 'draft') {
            return m;
          }
        });
        this.list = test.filter((el) => {
          return el !== null && typeof el !== 'undefined';
        });
        console.log(this.list);
        this.loading = false;
        observer.next(data);
      });
    });

    return observable;
  }

  btn = true;
  list: any[] = [];

  ngOnInit(): void {}

  drawer() {
    this.btn = !this.btn;
    this.drawerIcon.emit(this.btn);
  }
}
