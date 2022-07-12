import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {ValidationService} from "../../../services/static/validation.service";
import {StorageService} from "../../../services/storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginDiv') loginDiv: ElementRef;
  email: string = '';
  emailError: boolean = false;
  password: string = '';
  passwordError: boolean = false;
  errors: string[] = [];
  staySignedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.storageService.getRefreshToken().then(token => {
      if (token) {
        this.authService.setRefreshToken(token);
        this.authService.refresh().then(() => {
          this.authService.setAuthenticated(true);
          this.router.navigate(['/create']);
        })
      }
    })
  }

  navigateToRegister() {
    this.playLeaveAnimation();
    setTimeout(() => this.router.navigate(['register']), 500);
  }

  private playLeaveAnimation() {
    (this.loginDiv.nativeElement as HTMLElement).classList.add('leave')
  }

  login() {
    this.errors = [];
    if (this.validateFields()) {
      this.authService.login(this.email, this.password).then((res) => {
        if (!res.auth) {
          res.errors.forEach(error => this.errors.push(error));
        } else {
          if (this.staySignedIn) {
            this.storageService.saveRefreshToken(this.authService.getRefreshToken());
          }
          this.router.navigate(['create'])
        }
      });
    }
  }

  private validateFields() {
    this.passwordError = false;
    this.emailError = false;
    if (!this.password || this.password === '') this.passwordError = true;
    if (!ValidationService.validateEmail(this.email)) this.emailError = true;
    if (!this.passwordError && !this.emailError) {
      return true;
    }
    return false;
  }
}
