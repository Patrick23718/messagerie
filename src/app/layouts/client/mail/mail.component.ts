import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss'],
})
export class MailComponent implements OnInit {
  open = true;
  empty = true;

  constructor() {}

  ngOnInit(): void {}

  navigation(event: any) {
    console.log(event);
  }
}
