import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUsers(username: string, password: string): Observable<string> {
    
    return this.http
      .post(
        `${this.url}/login-fixed`,
        { username: username, password: password },
        { responseType: 'text' }
      )
      .pipe(
        tap((response) => {
          console.log(response);
          if (JSON.parse(response).data === 'success') {
            // register the user in the local storage
            localStorage.setItem('username', username);
          }
        })
      );
  }

  getUserDB(username: string, password: string): Observable<string> {
    return this.http
      .post(
        `${this.url}/login`,
        { username: username, password: password },
        { responseType: 'text' }
      )
      .pipe(
        tap((response) => {
          if (JSON.parse(response).data.recordsets[0].length === 1) {
            var username = JSON.parse(response).data.recordsets[0][0].email;

            // register the user in the local storage
            localStorage.setItem('username', username);
          } else {
            localStorage.setItem('username', '');
          }
        })
      );
  }
}
