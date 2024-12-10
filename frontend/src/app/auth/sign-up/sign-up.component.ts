import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  RegistraionForm!: FormGroup;

  constructor() {
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

  save() {
    console.log(this.RegistraionForm.value)
  }
}
