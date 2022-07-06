import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit {

  @Input('participant-id') participantId: number | null  = null;
  @Input('deletable') isDeletable: boolean = false;
  @Input('name') participantName: string = '';
  @Input('station-name') stationName: string = '';
  @Input('name-error') nameError: boolean = false;
  @Input('station-error') stationError: boolean = false;

  @Output('delete') deleteParticipant: EventEmitter<number> = new EventEmitter<number>();
  @Output('nameChange') nameChange: EventEmitter<string> = new EventEmitter<string>();
  @Output('station-nameChange') stationNameChange: EventEmitter<string> = new EventEmitter<string>();



  constructor() { }

  ngOnInit(): void {
  }

  delete() {
    if (this.participantId) this.deleteParticipant.emit(this.participantId);
  }

  emitNameChange(name: string) {
    this.nameChange.emit(name);
  }

  emitStationNameChange() {

    this.stationNameChange.emit(this.stationName);
  }
}
