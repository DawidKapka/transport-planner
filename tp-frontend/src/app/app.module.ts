import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectionsComponent } from './components/connections/connections.component';
import { TypeaheadInputComponent } from './components/minimal/typeahead-input/typeahead-input.component';
import {FormsModule} from "@angular/forms";
import {ConnectionsService} from "./services/connections.service";
import {HttpClientModule} from "@angular/common/http";
import { TypeaheadInputStationComponent } from './components/minimal/typeahead-input/typeahead-input-station/typeahead-input-station.component';
import { TypeaheadInputDatetimeComponent } from './components/minimal/typeahead-input/typeahead-input-datetime/typeahead-input-datetime.component';
import { TypeaheadInputButtonComponent } from './components/minimal/typeahead-input/typeahead-input-button/typeahead-input-button.component';
import { TypeaheadInputTextComponent } from './components/minimal/typeahead-input/typeahead-input-text/typeahead-input-text.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectionsComponent,
    TypeaheadInputComponent,
    TypeaheadInputStationComponent,
    TypeaheadInputDatetimeComponent,
    TypeaheadInputButtonComponent,
    TypeaheadInputTextComponent
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
