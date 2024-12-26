import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginSignUpService } from '../services/login-sign-up.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  RegistraionForm!: FormGroup;
  selectedFile: File | null = null;
  imagePath: string | null = null;
  constructor(private apiService: LoginSignUpService, private router: Router) {
    this.RegistraionForm = new FormGroup({
      fname: new FormControl("", [Validators.required]),
      lname: new FormControl(""),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      mobile: new FormControl("", [Validators.required]),
      age: new FormControl("", [Validators.required]),
      dob: new FormControl("", [Validators.required]),
      address1: new FormControl("", [Validators.required]),
      address2: new FormControl(""),
      city: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      zipcode: new FormControl("", [Validators.required]),
      about: new FormControl("", [Validators.required]),
      photo: new FormControl("", [Validators.required]),
      role: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      agreetc: new FormControl(false, [Validators.required]),
    })
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
     // console.log(this.selectedFile)
    }
  }
  save() {
    // console.log(this.RegistraionForm.value);
    if (this.RegistraionForm.invalid) {
      return alert("pls fill all field !")
    }
    const formData = new FormData();
    formData.append('photo', this.selectedFile ? this.selectedFile : "");
    formData.append('fname', this.RegistraionForm.value.fname);
    formData.append('lname', this.RegistraionForm.value.lname);
    formData.append('email', this.RegistraionForm.value.email);
    formData.append('password', this.RegistraionForm.value.password);
    formData.append('age', this.RegistraionForm.value.age);
    formData.append('mobile', this.RegistraionForm.value.mobile);
    formData.append('dob', this.RegistraionForm.value.dob);
    formData.append('address1', this.RegistraionForm.value.address1);
    formData.append('address2', this.RegistraionForm.value.address2);
    formData.append('city', this.RegistraionForm.value.city);
    formData.append('state', this.RegistraionForm.value.state);
    formData.append('zipcode', this.RegistraionForm.value.zipcode);
    formData.append('about', this.RegistraionForm.value.about);
    formData.append('role', this.RegistraionForm.value.role);
    formData.append('gender', this.RegistraionForm.value.gender);
    formData.append('agreetc', this.RegistraionForm.value.agreetc);
    this.apiService.userRegister(formData).subscribe(data => {
      if (data) {
        this.RegistraionForm.reset();
        alert("register success!");
        //localStorage.setItem("jwt", data.jwt);
        this.router.navigateByUrl("/sign-in");
      }
    }, error => { alert(error.error.message) });
  }
}
