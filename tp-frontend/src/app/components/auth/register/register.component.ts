import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ValidationService} from "../../../services/static/validation.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerDiv') registerDiv: ElementRef;
  email: string = '';
  emailError: boolean = false;
  password: string = '';
  passwordError: boolean = false;
  passwordRepeat: string = '';
  passwordRepeatError: boolean = false;
  username: string = '';
  usernameError: boolean = false;
  errors: string[] = [];

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  navigateTo(location: string) {
    this.playLeaveAnimation();
    setTimeout(() => this.router.navigate([location]), 500);
  }

  private playLeaveAnimation() {
    (this.registerDiv.nativeElement as HTMLElement).classList.add('leave')
  }

  public register() {
    this.errors = [];
    if (this.validateFields()) {
      this.authService.register(this.username, this.email, this.password).then(res => {
        if (!res.auth) {
          res.errors.forEach(error => this.errors.push(error));
        } else {
          this.router.navigate(['create'])
        }
      })
    }
  }

  private validateFields() {
    this.passwordError = false;
    this.emailError = false;
    this.passwordRepeatError = false;
    this.usernameError = false;
    if (!this.password || this.password === '') this.passwordError = true;
    if (!ValidationService.validateEmail(this.email)) this.emailError = true;
    if (!this.passwordRepeat || this.passwordRepeat !== this.password) this.passwordRepeatError = true;
    if (!this.username) this.usernameError = true;
    if (!this.passwordError && !this.emailError && !this.passwordRepeatError && !this.usernameError) {
      return true;
    }
    return false;
  }
}
