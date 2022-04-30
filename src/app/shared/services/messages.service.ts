import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  serverURL: string = environment.server;

  constructor(private socket: Socket, private http: HttpClient) {}

  sendMessage(expediteur: string, destinataire: string, message: string) {
    const newmessage = {
      destinataire: destinataire,
      expediteur: expediteur,
      message: message,
    };
    console.log(message);
    this.socket.emit('add-message', newmessage);
  }

  getMessages() {
    return this.socket.fromEvent('getmessage');
  }

  getMessage(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${localStorage.getItem('x-access-token')}`,
    });
    return this.http.get(this.serverURL + '/auth/message/' + id, { headers });
  }
}
