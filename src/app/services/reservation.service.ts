import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
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

  getAllReservations(): Observable<any> {
    return this.http.get(`${this.url}/getAllReservation`).pipe(
      tap((response) => {
        console.log(response);
      })
    );
  }

  getReservation(id: string): Observable<any> {
    return this.http.get(`${this.url}/getReservation/${id}`).pipe(
      tap((response) => {
        console.log(response);
      })
    );
  }

  deleteReservation(id: string): Observable<any> {
    return this.http.delete(`${this.url}/deleteReservation/${id}`).pipe(
      tap((response) => {
        console.log(response);
      })
    );
  }
  
}
