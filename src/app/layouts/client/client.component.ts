import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  open = true;
  empty = false;

  constructor() {}

  ngOnInit(): void {}

  navigation(event: any) {
    console.log(event);
  }
}
