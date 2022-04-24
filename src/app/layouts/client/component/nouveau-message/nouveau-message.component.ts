import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nouveau-message',
  templateUrl: './nouveau-message.component.html',
  styleUrls: ['./nouveau-message.component.scss'],
})
export class NouveauMessageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  msg = '';
}
