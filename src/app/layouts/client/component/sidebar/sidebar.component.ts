import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NouveauMessageComponent } from '../nouveau-message/nouveau-message.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  active = 1;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(NouveauMessageComponent, {
      panelClass: 'modalbox',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
