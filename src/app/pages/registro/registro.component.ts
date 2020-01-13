import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario : UsuarioModel;

  constructor(private loginService : LoginService,
    private router : Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();

    this.usuario.email= "gonzalomarincuesta@gmail.com";

   }

    onSubmit( form : NgForm){
      if(form.invalid){
        return;
      }  
      console.log(form);
      this.loginService.register(this.usuario)
        .subscribe(data=>{
          this.router.navigateByUrl('/home');
        });
      
    }

}
