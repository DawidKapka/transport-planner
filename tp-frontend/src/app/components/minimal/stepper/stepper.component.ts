import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  @Input('first-step') firstStep: boolean = false;
  @Input('second-step') secondStep: boolean = false;
  @Input('third-step') thirdStep: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToFirstStep() {
    this.router.navigate(['/create'])
  }

  goToSecondStep() {
    if (this.secondStep || this.thirdStep) {
      this.router.navigate(['configure']);
    }
  }

  goToThirdStep() {
    if (this.thirdStep) {
      this.router.navigate(['/finish'])
    }
  }
}
