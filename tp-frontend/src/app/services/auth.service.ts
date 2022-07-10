import {Injectable} from "@angular/core";
import {HashService} from "./static/hash.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_BASE_URL: string = 'http://localhost:3000';
  private authenticated: boolean = false;
  private accessToken: string = '';
  private refreshToken: string = '';

  constructor(private http: HttpClient) {
  }

  public isAuthenticated(): boolean {
    return this.authenticated;
  }

  public setAccessToken(token: string) {
    this.accessToken = token;
  }

  public getAccessToken(): string {
    return this.accessToken;
  }

  public setRefreshToken(token: string) {
    this.refreshToken = token;
  }

  public getRefreshToken(): string {
    return this.refreshToken;
  }

  public login(email: string, password: string) {
    const passwordHash = HashService.hashPassword(password);
    return new Promise<{auth: boolean, errors: string[], accessToken: string, refreshToken: string}>(resolve => {
      this.http.post(`${this.API_BASE_URL}/user/login`, {
        email: email, passwordHash: passwordHash
      }).forEach(res => {
        const response = res as {auth: boolean; errors: string[], accessToken: string, refreshToken: string};
        if (response.auth) {
          this.authenticated = true;
          this.accessToken = response.accessToken;
          this.refreshToken = response.refreshToken;
        } else {
          this.authenticated = false;
        }
        setInterval(() => this.refresh(), 3540000);
        resolve(response)
      })
    })
  }

  public register(username: string, email: string, password: string) {
    return new Promise<{auth: boolean; errors: string[]}>((resolve) => {
      const passwordHash = HashService.hashPassword(password);
      this.http.post(`${this.API_BASE_URL}/user/register`, {
        username: username,
        email: email,
        passwordHash: passwordHash
      }).forEach(res => {
        const response = res as {auth: boolean; errors: string[]};
        if (response.auth) {
          this.authenticated = true;
          this.login(email, passwordHash).then(() => {
            resolve(response)
          });
        } else {
          this.authenticated = false;
          resolve(response)
        }

      })
    })
  }

  public refresh() {
    return new Promise<string>((resolve) => {
      this.http.post(`${this.API_BASE_URL}/user/refresh`, {refreshToken: this.refreshToken}).forEach((res) => {
        this.accessToken = (res as {accessToken: string}).accessToken;
      })
    })
  }
}
