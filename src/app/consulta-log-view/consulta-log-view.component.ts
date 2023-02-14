import { AfterViewInit, Component, OnInit, ViewChild   } from '@angular/core';
import { MatTableDataSource                            } from '@angular/material/table';
import { MatPaginator                                  } from '@angular/material/paginator';
import { Observable                                    } from 'rxjs';
import { LogEntry                                      } from '../log-info.model';
import { LogInfoService                                } from '../log-info.service';
//
@Component({
  selector: 'app-consulta-log-view',
  templateUrl: './consulta-log-view.component.html',
  styleUrls: ['./consulta-log-view.component.scss']
})
//
export class ConsultaLogViewComponent implements OnInit, AfterViewInit {
  //
  pageTitle                          = '[Material Table with json/http remote source and pagination]';
  //
  informeLogRemoto!                  : Observable<LogEntry[]>;
  //
  dataSource                         = new MatTableDataSource<LogEntry>();
  // 
  displayedColumns                   : string[] = ['id_Column', 'pageName', 'accessDate', 'ipValue'];
  //
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //
  constructor(private logInfoService: LogInfoService) {
    //
    this.informeLogRemoto = this.logInfoService.getLogRemoto();
    //
    const myObserver = {
      next: (p_logEntry: LogEntry[])     => { 
        //
        console.log('Observer got a next value: ' + JSON.stringify(p_logEntry));
        //
        this.dataSource           = new MatTableDataSource<LogEntry>(p_logEntry);
        this.dataSource.paginator = this.paginator;
      },
      error: (err: Error)       => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };
    //
    this.informeLogRemoto.subscribe(myObserver);
  }
  //
  ngOnInit(): void {
      //
  }
  //
  ngAfterViewInit() {
    //
  }
}
