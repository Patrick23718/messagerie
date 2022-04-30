import {
  Component,
  EventEmitter,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.component.html',
  styleUrls: ['./list-message.component.scss'],
})
export class ListMessageComponent implements OnInit, OnDestroy, OnChanges {
  @Output() drawerIcon = new EventEmitter<boolean>();
  @Output() unread = new EventEmitter<number>();
  @Output() messageId = new EventEmitter<string>();
  id: any;
  loading: boolean = true;
  count = 0;
  active = '';
  constructor(
    private socket: Socket,
    private chatMessage: MessagesService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((data) => {
      this.active = data.page;
      this.getPage();
      console.log(data);
    });
    this.id = JSON.parse(localStorage.getItem('user') || '').id;
    this.socket.connect();
    this.joinChat();
  }
  ngOnChanges(changes: SimpleChanges): void {}

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
    this.getPage();
  }

  getPage() {
    if (this.active !== 'inbox') {
      this.getDeletedMessages().subscribe((data: any) => {
        console.log(data);
        // console.log(this.count);
        this.unread.emit(this.count);
      });
    } else {
      this.getRecieveMessages().subscribe((data: any) => {
        console.log(data);
        // console.log(this.count);
        this.unread.emit(this.count);
      });
    }
  }

  getRecieveMessages() {
    const observable = new Observable((observer) => {
      this.socket.on('getmessage', (data: any[]) => {
        // console.log(data);
        const test = data.map((m) => {
          if (m.destinataire._id == this.id && m.status == 'normal') {
            if (!m.is_read) this.count += 1;

            return m;
          }
        });
        this.list = test.filter((el) => {
          return el !== null && typeof el !== 'undefined';
        });
        // console.log(this.list);
        this.loading = false;
        observer.next(data);
      });
    });

    return observable;
  }

  // getRecieveMessages() {
  //   this.list = [];
  //   const observable = new Observable((observer) => {
  //     this.socket.on('getmessage', (data: any[]) => {
  //       // console.log(data);
  //       const test = data.map((m) => {
  //         if (m.destinataire._id == this.id && m.status == 'normal') {
  //           if (!m.is_read) this.count += 1;

  //           return m;
  //         }
  //       });
  //       this.list = test.filter((el) => {
  //         return el !== null && typeof el !== 'undefined';
  //       });
  //       console.log(this.list);
  //       this.loading = false;
  //       observer.next(data);
  //     });
  //   });

  //   return observable;
  // }

  getDeletedMessages() {
    this.list = [];
    const observable = new Observable((observer) => {
      this.socket.on('getmessage', (data: any[]) => {
        // console.log(data);
        const test = data.map((m) => {
          if (m.destinataire._id == this.id && m.status == 'deleted') {
            if (!m.is_read) this.count += 1;

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
