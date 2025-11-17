import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceEmpleados } from '../../services/ServicesEmpleados';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login.component',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  public user: string = "Rey";
  public password: string = "7839";
  
  constructor(
    private _service: ServiceEmpleados,
    private _router: Router
  ) {}
  Login():void{
    this._service.Login(this.user,this.password).subscribe(response => {
      localStorage.setItem("token",response.response)
      this._router.navigate(["/perfil"])
    })
  }
  ngOnInit(): void {
    
  }
}
