import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth/auth.service";

declare var Swal: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm!: FormGroup;
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.minLength(6),Validators.required,Validators.maxLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
      phone: new FormControl('',[Validators.required,Validators.pattern("(84|0[3|5|7|8|9])+([0-9]{8})\\b")]),
    },{validators:this.validateAreEqual});
  }

  // tslint:disable-next-line:typedef
  register(){
    const user = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      phoneNumber: this.registerForm.value.phone
    };
    this.authService.register(user).subscribe(res => {
      // tslint:disable-next-line:triple-equals
      if (res.username != null) {
        Swal.fire({
          icon: 'success',
          title: 'Đăng ký thành công',
          text: "",
        });
        this.router.navigate(['login']);
      } else {

      }
    });
  }
  public validateAreEqual(c: AbstractControl): {notSame: boolean} | null {
    return  c.value.password  ===  c.value.confirmPassword ? null : {notSame: true};
  }

}
