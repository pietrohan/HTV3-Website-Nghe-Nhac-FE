import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user/user.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../security/service/token-storage.service";

declare var Swal: any;

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {
  isRepassSuccessfully = false;
  isRepassedFailed = true;
  errorMessage = '';
  idUser?: number;
  changePasswordForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {

    this.changePasswordForm = this.fb.group({
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      },
      {validators: this.validateAreEqual})

    if (this.tokenStorage.getToken()) {
      this.idUser = this.tokenStorage.getUser().id;
    }
  }

  get currentPassword() {
    return this.changePasswordForm.get('currentPassword');
  }

  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword');
  }

  get f() {
    return this.changePasswordForm.controls;
  }

  changePassword() {
    const changPasswordForm = {
      currentPassword: this.changePasswordForm.value.currentPassword,
      newPassword: this.changePasswordForm.value.newPassword,
      confirmPassword: this.changePasswordForm.value.confirmPassword
    };
    this.userService.changePassword(changPasswordForm, this.idUser).subscribe(
      (data) => {
        console.log(data);
        this.isRepassSuccessfully = true;
        this.isRepassedFailed = false;
        this.router.navigate(['/login']).then();
        localStorage.clear();
      }
    );
  }

  public validateAreEqual(c: AbstractControl): { notSame: boolean } | null {
    return c.value.newPassword === c.value.confirmPassword ? null : {notSame: true};
  }
}
