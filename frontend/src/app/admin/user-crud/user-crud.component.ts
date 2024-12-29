import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminSeviceService } from '../services/admin-sevice.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginSignUpService } from 'src/app/auth/services/login-sign-up.service';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.scss']
})
export class UserCrudComponent {
  all_user_data: any = [];
  userRegForm!: FormGroup;
  headingTitle: any;
  addEditbtn: boolean = false;
  selectedFile: File | null = null;
  userId: any;
  addressId: any;
  imagePath: any;
  constructor(private router: Router, private apiSevice: AdminSeviceService, private apiUser: LoginSignUpService) {
    this.userRegForm = new FormGroup({
      fname: new FormControl("", [Validators.required]),
      lname: new FormControl(""),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl(""),
      mobile: new FormControl("", [Validators.required]),
      age: new FormControl("", [Validators.required]),
      dob: new FormControl("", [Validators.required]),
      address1: new FormControl("", [Validators.required]),
      address2: new FormControl(""),
      city: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      zipcode: new FormControl("", [Validators.required]),
      about: new FormControl("", [Validators.required]),
      photo: new FormControl(""),
      role: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      agreetc: new FormControl(false, [Validators.required]),
    })
  }
  ngOnInit() {
    this.getAllUser()
  }
  getAllUser() {
    this.apiSevice.allUser().subscribe(data => {
      if (data) {
        this.all_user_data = data.user;
        // console.log(data.user[2].address[0]._id)
      }
    }, error => { alert(error.error.message) })
  }
  addNewUser() {
    this.headingTitle = "Add New User!";
    this.userRegForm.reset();
    this.addEditbtn = true;
    this.selectedFile = null;
    this.imagePath = null;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  save() {
    if (this.userRegForm.invalid) {
      return alert("pls fill all field !")
    }
    const formData = new FormData();
    formData.append('photo', this.selectedFile ? this.selectedFile : "");
    formData.append('fname', this.userRegForm.value.fname);
    formData.append('lname', this.userRegForm.value.lname);
    formData.append('email', this.userRegForm.value.email);
    formData.append('password', this.userRegForm.value.password);
    formData.append('age', this.userRegForm.value.age);
    formData.append('mobile', this.userRegForm.value.mobile);
    formData.append('dob', this.userRegForm.value.dob);
    formData.append('address1', this.userRegForm.value.address1);
    formData.append('address2', this.userRegForm.value.address2);
    formData.append('city', this.userRegForm.value.city);
    formData.append('state', this.userRegForm.value.state);
    formData.append('zipcode', this.userRegForm.value.zipcode);
    formData.append('about', this.userRegForm.value.about);
    formData.append('role', this.userRegForm.value.role);
    formData.append('gender', this.userRegForm.value.gender);
    formData.append('agreetc', this.userRegForm.value.agreetc);
    this.apiUser.userRegister(formData).subscribe(data => {
      if (data) {
        alert(data.message);
        this.userRegForm.reset();
        this.getAllUser();
      }
    }, error => { alert(error.error.message) })
  }
  edit(id: any) {
    this.headingTitle = "Update User!";
    this.addEditbtn = false;
    this.selectedFile = null;
    this.userRegForm.reset();
    this.apiSevice.singleUser(id).subscribe(data => {
      console.log(data)
      if (data && data.user) {
        this.userId = data.user._id;
        this.addressId = data.user.address[0]._id;
        this.imagePath = data.user.photo;
        this.userRegForm.patchValue({
          fname: data.user.fname,
          lname: data.user.lname,
          email: data.user.email,
          password: data.user.password,
          age: data.user.age,
          mobile: data.user.mobile,
          dob: data.user.dob,
          address1: data.user.address[0].address1,
          address2: data.user.address[0].address2,
          city: data.user.address[0].city,
          state: data.user.address[0].state,
          zipcode: data.user.address[0].zipcode,
          about: data.user.about,
          role: data.user.role,
          gender: data.user.gender,
          agreetc: data.user.agreetc
        });

      }
    }, error => { alert(error.error.message) })
  }
  update() {
    if (this.userRegForm.invalid) {
      return alert("pls fill all field !")
    }
    const formData = new FormData();
    formData.append('addressId', this.addressId);
    formData.append('photo', this.selectedFile ? this.selectedFile : this.imagePath);
    formData.append('fname', this.userRegForm.value.fname);
    formData.append('lname', this.userRegForm.value.lname);
    formData.append('email', this.userRegForm.value.email);
    formData.append('age', this.userRegForm.value.age);
    formData.append('mobile', this.userRegForm.value.mobile);
    formData.append('dob', this.userRegForm.value.dob);
    formData.append('address1', this.userRegForm.value.address1);
    formData.append('address2', this.userRegForm.value.address2);
    formData.append('city', this.userRegForm.value.city);
    formData.append('state', this.userRegForm.value.state);
    formData.append('zipcode', this.userRegForm.value.zipcode);
    formData.append('about', this.userRegForm.value.about);
    formData.append('role', this.userRegForm.value.role);
    formData.append('gender', this.userRegForm.value.gender);
    formData.append('agreetc', this.userRegForm.value.agreetc);
    this.apiSevice.updateUser(this.userId, formData).subscribe(data => {
      if (data) {
        this.userRegForm.reset();
        alert(data.message);
        this.getAllUser();
      }
    }, error => { alert(error.error.message) })
  }

  deleteUser(Id: any) {
    const data = {
      userId: Id,
    }
    this.apiSevice.deleteUser(data).subscribe(data => {
      if (data) {
        alert(data.message);
        this.getAllUser();
      }
    }, error => { alert(error.error.message) })
  }
}
