import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  isMenuButton() {
    return !this.isConnectionDetail();
  }

  isConnectionDetail() {
    return window.location.pathname === '/connection-detail'
  }

  navigateBackToConnections() {
    this.router.navigate(['/configure']);
  }
}
