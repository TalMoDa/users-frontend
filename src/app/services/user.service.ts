import { Injectable } from '@angular/core';
import { User } from '../models/user-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({ providedIn: 'root' })
export class UserService {
  url = 'User';
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/${this.url}`);
  }
  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public updateUser(user: User): Observable<User[]> {
    return this.http.put<User[]>(`${environment.apiUrl}/${this.url}`, user);
  }

  public createUser(user: User): Observable<User[]> {
    return this.http.post<User[]>(`${environment.apiUrl}/${this.url}`, user);
  }

  public deleteUser(user: User): Observable<User[]> {
    return this.http.delete<User[]>(
      `${environment.apiUrl}/${this.url}/${user.id}`
    );
  }
}
