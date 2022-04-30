import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss'],
})
export class SendComponent implements OnInit {
  open = true;
  messageId = '';

  constructor() {}

  ngOnInit(): void {}

  navigation(event: any) {
    console.log(event);
  }

  getidmessage(event: any) {
    this.messageId = event;
  }
}
