import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    { id: 1, name: 'Tom', email: 'tom@test.com' },
    { id: 2, name: 'Mary', email: 'mary@test.com' }
  ];

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  createUser(user: User): Observable<User> {
    user.id = Date.now();
    this.users.push(user);
    return of(user);
  }

  updateUser(user: User): Observable<User> {
    const index = this.users.findIndex(u => u.id === user.id);
    this.users[index] = user;
    return of(user);
  }

  deleteUser(id: number): Observable<void> {
    this.users = this.users.filter(u => u.id !== id);
    return of(void 0);
  }
}