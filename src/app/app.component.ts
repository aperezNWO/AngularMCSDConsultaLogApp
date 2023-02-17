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
  title             : string = '[LEARNINGPATH - CONSULTA LOG]';
  appName           : string = "[LEARNINGPATH - CONSULTA LOG]";
  appVersion        : string = '1.0.0.4';
  runtimeVersion    : string = VERSION.full;
 }   
