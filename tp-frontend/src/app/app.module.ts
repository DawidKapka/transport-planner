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
import { ConnectionsComponent } from './components/connections/connections.component';
import { ConnectionComponent } from './components/connections/connection/connection.component';
import { ConnectionExpandedComponent } from './components/connections/connection/connection-expanded/connection-expanded.component';
import { StepperComponent } from './components/minimal/stepper/stepper.component';
import { SplitterComponent } from './components/minimal/splitter/splitter.component';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { TripConfigurationComponent } from './components/trip-configuration/trip-configuration.component';
import {ConfigurationGuard} from "./guards/configuration.guard";
import { FinalizationComponent } from './components/finalization/finalization.component';
import { TripMapComponent } from './components/trip-map/trip-map.component';
import { default as credentials} from '../credentials.json'
import {AgmCoreModule} from "@agm/core";

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
    ConnectionsComponent,
    ConnectionComponent,
    ConnectionExpandedComponent,
    StepperComponent,
    SplitterComponent,
    HeaderComponent,
    TripConfigurationComponent,
    FinalizationComponent,
    TripMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: credentials.apiKey
    })
  ],
  providers: [ConnectionsService, ConfigurationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
