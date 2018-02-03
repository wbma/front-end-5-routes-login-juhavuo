import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../models/user';

@Injectable()
export class MediaService {

  username: string;
  password: string;
  email: string;
  status: string;
  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  apiUrl = 'http://media.mw.metropolia.fi/wbma';

  constructor(private http: HttpClient, private router: Router) {
  }

  public login() {


    const body = {
      username: this.username,
      password: this.password
    };


    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    this.http.post(this.apiUrl + '/login', body, settings).subscribe(response => {
      console.log(this.username);
      console.log(this.password);
      console.log(response['token']);
      localStorage.setItem('token', response['token']);
      this.router.navigate(['front']);
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.status = error.message;
    });
  }

  public getUserData() {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };

    return this.http.get(this.apiUrl + '/users/user', settings);
  }

  logout() {

    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  public register(user: User) {

    return this.http.post(this.apiUrl + '/users', user, this.options);
  }

}
