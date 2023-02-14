import { NgModule                 } from '@angular/core';
import { RouterModule             } from '@angular/router';
import { MatListModule            } from '@angular/material/list';
import { MatTableModule           } from '@angular/material/table';
import { MatPaginatorModule       } from '@angular/material/paginator';
import { BrowserModule            } from '@angular/platform-browser';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { HttpClientModule         } from '@angular/common/http';
import { AppComponent             } from './app.component';
import { ConsultaLogViewComponent } from './consulta-log-view/consulta-log-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ConsultaLogViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    /*
    RouterModule.forRoot([
      {  path: 'lista'          , component: ListaComponent           },
      {  path: 'datatable'      , component: DatatableComponent       },
      {  path: 'dynamictable'   , component: LogInfoViewComponent     }, 
    ])¨*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
