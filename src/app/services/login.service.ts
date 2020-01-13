import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    //signup: https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

    //login: https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  private url = "https://identitytoolkit.googleapis.com/v1/accounts:";

  private apiKey = "AIzaSyCRIrdZlP7GCC6dwK-4HbJo0rRcPH-Bf6w";

  userToken :string;

  constructor(private http : HttpClient) {
      this.leerToken();
   }


  login(usuario:UsuarioModel){

    const authData = {
      ...usuario,
      returnSecureToken: true
    }
    return this.http.post(`${this.url}signInWithPassword?key=${this.apiKey}`, authData)
    .pipe(
      map( resp =>{
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }

  register(usuario:UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken:true
    }

  return this.http.post(`${this.url}signUp?key=${this.apiKey}`,authData);
  
  }

    private guardarToken(idToken: string){
      this.userToken = idToken;
      localStorage.setItem('token', idToken);
    }

    leerToken(){
      if(localStorage.getItem('token')){
        this.userToken = localStorage.getItem('token');
      } else {
        this.userToken='';
      }

      return this.userToken;
    }
    

}
