import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouteService } from '../services/route.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  tourGuideCode:string="";

  constructor(private auth:AuthService, private route: RouteService){}
  validateTourGuideCode(){
    this.auth.
  }
}
