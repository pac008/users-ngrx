import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response, User } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private url = 'https://reqres.in/api';

    constructor(private http: HttpClient) {}

    getUsers() :Observable<User[]> {
        return this.http.get<Response>(`${this.url}/users?per_page=8`)
                .pipe(
                    map( resp => resp['data'])
                )
    }
}