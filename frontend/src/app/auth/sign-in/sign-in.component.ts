import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginSignUpService } from '../services/login-sign-up.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  loginForm!: FormGroup;
  constructor(private router: Router, private apiService: LoginSignUpService) {
    this.loginForm = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    })
  }
  save() {
    if (this.loginForm.invalid) {
      return alert("pls check field !")
    }
    this.apiService.userLogin(this.loginForm.value).subscribe(data => {
      if (data) {
        this.loginForm.reset();
        if (data.user.role === 'seller') {
          alert(data.message);
          localStorage.setItem("jwt", data.jwt),
            localStorage.setItem("role", data.user.role)
          this.router.navigateByUrl("seller-dashboard")
        }
        else if (data.user.role === 'buyer') {
          alert(data.message);
          localStorage.setItem("jwt", data.jwt)
          localStorage.setItem("role", data.user.role)
          this.router.navigateByUrl("buyer-dashboard")
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
