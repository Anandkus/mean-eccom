import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginSignUpService } from 'src/app/auth/services/login-sign-up.service';
import { AdminSeviceService } from '../services/admin-sevice.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  loginForm!: FormGroup;
  constructor(private router: Router, private apiService: AdminSeviceService) {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
  }
  save() {
    console.log(this.loginForm.value)
    this.apiService.adminLogin(this.loginForm.value).subscribe(data => {
      this.loginForm.reset();
      if (data) {
        if (data.user.role === 'admin') {
          alert(data.message)
          localStorage.setItem("jwt", data.jwt),
            localStorage.setItem("role", data.user.role)
          this.router.navigateByUrl("admin/dashboard")
        }
        else {
          alert("invalid login value !")
        }
      }
      else {
        alert("invalid value !")
      }
    }, error => { alert(error.error.message) })
  }


}
