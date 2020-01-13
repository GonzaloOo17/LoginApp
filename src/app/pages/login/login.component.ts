import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario : UsuarioModel = new UsuarioModel();
  

  constructor(private http: HttpClient,
    private loginService : LoginService,
    private router: Router) { }

  ngOnInit() {
  }

  login(form:NgForm){
    console.log(form);
    console.log(form.controls.email)
    this.loginService.login(this.usuario)
    .subscribe(data=>{
      console.log(data);
      this.router.navigateByUrl('/home');
    },(err)=>{
      console.log(err.error.error.message);
    });
  }

}
