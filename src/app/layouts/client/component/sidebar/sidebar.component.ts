import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { NouveauMessageComponent } from '../nouveau-message/nouveau-message.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  active = '';
  user = {
    id: '',
  };

  @Input() unread = 0;
  count = 0;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private socket: Socket,
    private route: ActivatedRoute
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || '');
    this.joinChat();
  }

  ngOnInit(): void {
    this.active = this.route.snapshot.queryParamMap.get('page') || 'inbox';
  }

  // open() {
  //   this.router.navigate(['/mail'], { queryParams: { id: 1 } });
  // }

  openDialog() {
    const dialogRef = this.dialog.open(NouveauMessageComponent, {
      panelClass: 'modalbox',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  logout() {
    this.active = 'dec';
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/admin');
  }

  joinChat() {
    this.socket.connect();
    this.socket.emit('get-message-receiver', { userId: this.user.id });
    this.getRecieveMessages().subscribe((data: any) => {
      console.log(data);
      // console.log(this.count);
    });
  }

  getRecieveMessages() {
    const observable = new Observable((observer) => {
      this.socket.on('getmessage', (data: any[]) => {
        // console.log(data);
        this.count = 0;
        const test = data.map((m) => {
          if (m.destinataire._id == this.user.id && m.status == 'normal') {
            if (!m.is_read) this.count += 1;

            return m;
          }
        });
        const dat = test.filter((el) => {
          return el !== null && typeof el !== 'undefined';
        });
        // console.log(this.list);
        observer.next(data);
      });
    });

    return observable;
  }
}
