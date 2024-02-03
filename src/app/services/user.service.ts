import { Injectable } from '@angular/core';
import { User } from '../models/user-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

/**
 * Created a user service to connect to the http requests such as get, post, put and delete api.
 */
@Injectable({ providedIn: 'root' })
export class UserService {
  url = 'User';
  constructor(private http: HttpClient) {}

  /**
   * Get users request
   * @returns an array of all the users in the database
   */

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/${this.url}`);
  }

  /**
   * Get a user by a specific id.
   * @param id id of a user
   * @returns A single user by the provided id.
   */

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  /**
   * Updating a single user to the database.
   * @param user A user update value.
   * @returns
   */

  public updateUser(user: User): Observable<User[]> {
    return this.http.put<User[]>(`${environment.apiUrl}/${this.url}`, user);
  }

  /**
   *  Inserting a user to the database
   * @param user A user to create
   * @returns
   */

  public createUser(user: User): Observable<User[]> {
    return this.http.post<User[]>(`${environment.apiUrl}/${this.url}`, user);
  }

  /**
   * Delete a user from the database.
   * @param user A user to delete.
   * @returns
   */

  public deleteUser(user: User): Observable<User[]> {
    return this.http.delete<User[]>(
      `${environment.apiUrl}/${this.url}/${user.id}`
    );
  }
}
