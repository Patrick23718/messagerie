import { Component, OnDestroy, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit, OnDestroy {
  open = true;
  empty = false;

  constructor(private socket: Socket) {}
  ngOnDestroy(): void {
    this.socket.disconnect();
  }

  ngOnInit(): void {
    this.socket.connect();
  }

  navigation(event: any) {
    console.log(event);
  }
}
