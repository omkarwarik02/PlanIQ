import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API = "http://localhost:3000/api/auth";
  private http = inject(HttpClient);

  signUp(data:any){
    return this.http.post(`${this.API}/sign-up/email`,data,{withCredentials:true});
  }
  logIn(data:any){
    return this.http.post(`${this.API}/sign-in/email`,data,{withCredentials:true});
  }
    logout(){
    return this.http.post(
      `${this.API}/sign-out`,
      {},
      { withCredentials: true }
    );
  }
  getSession() {
  return this.http.get(`${this.API}/get-session`, {
    withCredentials: true
  });
}
}
