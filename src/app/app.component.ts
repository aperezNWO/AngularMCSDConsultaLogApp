import { Component, VERSION                        } from '@angular/core';
import { ConsultaLogViewComponent                  } from './consulta-log-view/consulta-log-view.component';
import { ConsultaDineroViewComponent               } from './consulta-dinero-view/consulta-dinero-view.component';
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
  appVersion        : string = '1.0.0.13';
  runtimeVersion    : string = VERSION.full;
  //
  readonly LogInfoViewComponent_pageTitle             : string = ConsultaLogViewComponent.pageTitle();
  readonly ConsultaDineroViewComponent_pageTitle      : string = ConsultaDineroViewComponent.pageTitle();
  //-----------------------------------------------------------------------------------------------------
  constructor() {
    //
    console.log('AppComponent');
  }
  //-----------------------------------------------------------------------------------------------------
 }   
