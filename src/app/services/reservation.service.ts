import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private url = 'http://localhost:3000/reservation';

  constructor(private http: HttpClient) {}

  createReservation(
    name: string,
    email: string,
    phone: string,
    reserveDate: string,
    reserveTime: string,
    guests: number,
    specialRequests: string
  ): Observable<string> {
    return this.http
      .post(
        `${this.url}/addReservation`,
        {
          name: name,
          email: email,
          phone: phone,
          reserveDate: reserveDate,
          reserveTime: reserveTime,
          guests: guests,
          specialRequests: specialRequests,
        },
        { responseType: 'text' }
      )
      .pipe(
        tap((response) => {
          console.log(response);
        })
      );
  }

  getReservations(): Observable<any> {
    return this.http.get(`${this.url}/getReservations`).pipe(
      tap((response) => {
        console.log(response);
      })
    );
  }
}
