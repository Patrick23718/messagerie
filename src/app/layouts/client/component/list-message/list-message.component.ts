import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.component.html',
  styleUrls: ['./list-message.component.scss'],
})
export class ListMessageComponent implements OnInit {
  @Output() drawerIcon = new EventEmitter<boolean>();
  constructor() {}

  btn = true;
  list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  ngOnInit(): void {}

  drawer() {
    this.btn = !this.btn;
    this.drawerIcon.emit(this.btn);
  }
}
