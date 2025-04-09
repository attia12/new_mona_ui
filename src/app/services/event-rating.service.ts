import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
interface RatingRequest {
  eventId: number;
  rating: number;
  userId: number;
}
@Injectable({
  providedIn: 'root'
})
export class EventRatingService {
  private apiUrl = `${environment.apiUrl}rating`;

  constructor(private http: HttpClient) {}

  addRating(eventId: number, rating: number, userId: number): Observable<any> {
    const requestPayload: RatingRequest = { eventId, rating, userId };
    return this.http.post(`${this.apiUrl}/${eventId}`, requestPayload);
  }

  getRatings(eventId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${eventId}/get-ratings`);
  }

  getAverageRating(eventId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${eventId}/average-rating`);
  }
}
