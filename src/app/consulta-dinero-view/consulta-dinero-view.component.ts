import { Component } from '@angular/core';
//
@Component({
  selector: 'app-consulta-dinero-view',
  templateUrl: './consulta-dinero-view.component.html',
  styleUrls: ['./consulta-dinero-view.component.css']
})
//
export class ConsultaDineroViewComponent {
  //
  pageTitle            : string = '[HOME]';
  //
  static pageTitle()   : string {
    return '[HOME]';
  }
}
