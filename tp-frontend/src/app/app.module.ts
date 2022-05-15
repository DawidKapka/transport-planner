import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectionSearchComponent } from './components/connection-search/connection-search.component';
import { TypeaheadInputComponent } from './components/minimal/typeahead-input/typeahead-input.component';
import {FormsModule} from "@angular/forms";
import {ConnectionsService} from "./services/connections.service";
import {HttpClientModule} from "@angular/common/http";
import { TypeaheadInputStationComponent } from './components/minimal/typeahead-input/typeahead-input-station/typeahead-input-station.component';
import { TypeaheadInputDatetimeComponent } from './components/minimal/typeahead-input/typeahead-input-datetime/typeahead-input-datetime.component';
import { TypeaheadInputButtonComponent } from './components/minimal/typeahead-input/typeahead-input-button/typeahead-input-button.component';
import { TypeaheadInputTextComponent } from './components/minimal/typeahead-input/typeahead-input-text/typeahead-input-text.component';
import { ParticipantComponent } from './components/minimal/participant/participant.component';
import { HomeComponent } from './components/home/home.component';
import { ConnectionsComponent } from './components/connections/connections.component';
import { ConnectionComponent } from './components/connections/connection/connection.component';
import { ConnectionExpandedComponent } from './components/connections/connection/connection-expanded/connection-expanded.component';
@NgModule({
  declarations: [
    AppComponent,
    ConnectionSearchComponent,
    TypeaheadInputComponent,
    TypeaheadInputStationComponent,
    TypeaheadInputDatetimeComponent,
    TypeaheadInputButtonComponent,
    TypeaheadInputTextComponent,
    ParticipantComponent,
    HomeComponent,
    ConnectionsComponent,
    ConnectionComponent,
    ConnectionExpandedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ConnectionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
