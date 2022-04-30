import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  serverURL: string = environment.server;

  constructor(private http: HttpClient) {}

  getAllUsers(s: string = '', role: string = 'client'): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${localStorage.getItem('x-access-token')}`,
    });
    return this.http.get(this.serverURL + '/auth/profile?s=' + s, { headers });
  }

  login(email: string, pwd: string): Observable<any> {
    const data = {
      email,
      password: pwd,
    };
    return this.http.post(`${this.serverURL}/auth/signin`, data);
  }

  getuser(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${localStorage.getItem('x-access-token')}`,
    });
    return this.http.get(`${this.serverURL}/profile/${id}`, { headers });
  }

  updateUser(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${localStorage.getItem('x-access-token')}`,
    });
    return this.http.put(`${this.serverURL}/auth/update`, data, {
      headers,
    });
  }

  updatepwd(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${localStorage.getItem('x-access-token')}`,
    });
    return this.http.put(`${this.serverURL}/auth/pwd`, data, {
      headers,
    });
  }

  getprofile(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${localStorage.getItem('x-access-token')}`,
    });
    return this.http.get(`${this.serverURL}/profile`, { headers });
  }

  register(data: any) {
    return this.http.post(`${this.serverURL}/signup`, data);
  }

  imageSet(file: File, name: string) {
    const token = `${localStorage.getItem('x-access-token')}`;
    const API_URL = this.serverURL + '/auth/updateimage';
    const headers = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      'x-access-token': `${token}`,
    });
    const fd = new FormData();
    fd.append('imageURL', <File>file, name);
    console.log(fd);
    return this.http.put(API_URL, fd, {
      headers: headers,
      reportProgress: true,
      observe: 'events',
    });
  }

  getOtherUser() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${localStorage.getItem('x-access-token')}`,
    });
    return this.http.get(`${this.serverURL}/auth/getuser`, { headers });
  }
}
