import { Component, VERSION } from '@angular/core';
//
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
//
export class AppComponent {
  //
  title             : string = '[MCSD - CONSULTA LOG]';
  appName           : string = "[MCSD - CONSULTA LOG]";
  appVersion        : string = '1.0.0.5';
  runtimeVersion    : string = VERSION.full;
 }   
