import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ConnectionsService} from "../../../../services/connections.service";

@Component({
  selector: 'app-typeahead-input-station',
  templateUrl: './typeahead-input-station.component.html',
  styleUrls: ['./typeahead-input-station.component.scss'],
})
export class TypeaheadInputStationComponent implements OnInit {
  public typeaheadSuggestions: {name: string; id: string}[] = [];
  public typeaheadOpen: boolean = true;

  @Input('value') currentValue: string = '';
  @Output('valueChange') valueChange = new EventEmitter<string>();

  @Input() placeholder: string = '';
  @Input('error') error: boolean = false;
  @Input('small') isSmall: boolean = false;

  constructor(private connectionsService: ConnectionsService) { }

  ngOnInit(): void {
  }

  public updateTypeahead() {
    this.typeaheadSuggestions = [];
    if (this.currentValue.replace('.', '')) {
      this.connectionsService.getStations(this.currentValue).forEach((res: any) => {
        res.stations.forEach((station: any) => {
          if (station.name) {
            const entry = {
              name: station.name,
              id: station.id
            };

            if (!this.typeaheadSuggestions.find(suggestion => suggestion.name.toLowerCase() === entry.name.toLowerCase())
              && entry.id
              && entry.name.replace(',', '').trim().toLowerCase() !== this.currentValue.replace(',', '').trim().toLowerCase()) {
              this.typeaheadSuggestions.push(entry)
            }
          }
        })
      })
    }
    this.emitChangeEvent();
  }

  private emitChangeEvent() {
    this.valueChange.emit(this.currentValue);
  }

  public copyToTypeahead(value: string) {
    this.currentValue = value;
    this.updateTypeahead();
  }

  public closeTypeahead() {
    setTimeout(() => this.typeaheadOpen = false, 200);
  }

  public openTypeahead() {
    this.typeaheadOpen = true;
    if (!this.currentValue) {
      this.typeaheadSuggestions = [];
    }
  }

}
