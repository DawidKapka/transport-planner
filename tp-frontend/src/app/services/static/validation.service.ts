export class ValidationService {

  public static validateEmail(email: string): RegExpMatchArray {
    return email.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  }
}
