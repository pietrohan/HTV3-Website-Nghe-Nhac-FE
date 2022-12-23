import { Component } from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {TokenStorageService} from "../../security/service/token-storage.service";
import {Router} from "@angular/router";

declare var Swal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  form: any = {
    username: null,
    password: null
  };

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router) { }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        Swal.fire({
          icon: 'success',
          title: 'Đăng nhập thành công',
          text: "enjoy",
        });
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['/']);
      },
      err => {
        this.errorMessage = 'Please try again !';
        this.isLoginFailed = true;
      }
    );
  }

}
