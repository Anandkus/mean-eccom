import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  imageName: string | null = null;
  imagePath: string = 'http://localhost:1101/images/uploads/';
  localImgUrl: any;
  selectedFile: any;
  userProfileForm: FormGroup;
  userId: any;
  constructor(private router: Router, private apiSerive: UserService) {
    this.userProfileForm = new FormGroup({
      fname: new FormControl("", [Validators.required]),
      lname: new FormControl(""),
      email: new FormControl("", [Validators.required, Validators.email]),
      mobile: new FormControl("", [Validators.required]),
      age: new FormControl("", [Validators.required]),
      dob: new FormControl("", [Validators.required]),
      about: new FormControl("", [Validators.required]),
      photo: new FormControl(""),
      gender: new FormControl("", [Validators.required]),
    })
  }
  ngOnInit() {
    this.getUserProfileData()
  }
  selecetedImage(event: any) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      this.selectedFile = file;
      this.imageName = file.name;
      this.localImgUrl = URL.createObjectURL(file);
    }
  }

  getUserProfileData() {
    this.apiSerive.getUserProfile().subscribe(data => {
      if (data) {
        this.imageName = data.user.photo;
        this.userId = data.user._id;
        this.userProfileForm.patchValue({
          fname: data.user.fname,
          lname: data.user.lname,
          email: data.user.email,
          mobile: data.user.mobile,
          age: data.user.age,
          dob: data.user.dob,
          about: data.user.about,
          gender: data.user.gender
        })
      }
    }, error => { console.log(error.error.message) })
  }
  update() {
    const formData = new FormData();
    formData.append('photo', this.selectedFile ? this.selectedFile : this.imageName);
    formData.append('fname', this.userProfileForm.value.fname);
    formData.append('lname', this.userProfileForm.value.lname);
    formData.append('email', this.userProfileForm.value.email);
    formData.append('age', this.userProfileForm.value.age);
    formData.append('mobile', this.userProfileForm.value.mobile);
    formData.append('dob', this.userProfileForm.value.dob);
    formData.append('about', this.userProfileForm.value.about);
    formData.append('gender', this.userProfileForm.value.gender);
    this.apiSerive.updateUserProfile(this.userId, formData).subscribe(data => {
      if (data) {
        alert(data.message);
        this.getUserProfileData();
      }
    }, error => { alert(error.error.message) })
  }

}
