import {Component, Input, OnInit} from '@angular/core';
import {ConnectionsResponse} from "../../../../../../../tp-backend/src/shared/models/api-responses/connections-response.model";

@Component({
  selector: 'app-connection-expanded',
  templateUrl: './connection-expanded.component.html',
  styleUrls: ['./connection-expanded.component.scss']
})
export class ConnectionExpandedComponent implements OnInit {

  @Input() connection: ConnectionsResponse;
  isExpanded: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  formatTime(time: string) {
    return time.substring(11, 16);
  }

  formatDelay(delay: number) {
    return delay ? `+${delay}'` : '';
  }

  formatPlatform(platform: string) {
    return platform ? `Pl. ${platform}` : '';
  }

  toggleExpanded() {
    this.isExpanded =  !this.isExpanded
  }

  getPlatformIcon(platform: string) {
    if (!isNaN(parseFloat(platform[0]))) {
      let platformNumber = '';
      for (let char of platform) {
        if (!isNaN(parseFloat(char))) platformNumber += char;
      }
      return `assets/sbb-pictograms/svg-druck/02_Generisch/01_Gleise/21${platformNumber.length === 1 ? '0' + platformNumber : platformNumber}_Gleis-${platformNumber}_k_de.svg`
    } else {
      return `assets/sbb-pictograms/svg-druck/02_Generisch/03_Kanten/Kante-${platform}_k_de.svg`
    }
  }
}

