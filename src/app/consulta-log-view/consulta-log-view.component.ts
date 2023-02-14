import { AfterViewInit, Component, OnInit, ViewChild   } from '@angular/core';
import { MatTableDataSource                            } from '@angular/material/table';
import { MatPaginator                                  } from '@angular/material/paginator';
import { FormBuilder, Validators                       } from '@angular/forms';
import { Observable                                    } from 'rxjs';
import { LogEntry,SearchCriteria                       } from '../log-info.model';
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
  model                              = new SearchCriteria( "0"
                                          ,"0"
                                          ,"999"
                                          ,"2022-09-01"
                                          ,"2022-09-30"
                                          ,""
                                          ,"");
  //
  @ViewChild("paginator" ,{read:MatPaginator}) paginator!:  MatPaginator;
  //
  searchForm   = this.formBuilder.group({
    //_P_ID_TIPO_LOG      : ["0"           , Validators.required], 
    //_P_DATA_SOURCE_ID   : ["0"           , Validators.required],
    _P_ROW_NUM          : ["999"         , Validators.required],
    _P_FECHA_INICIO     : ["2022-09-01"  , Validators.required],
    _P_FECHA_FIN        : ["2022-09-30"  , Validators.required],
  });
  //
  constructor(private logInfoService: LogInfoService, private formBuilder: FormBuilder) {
      //
  }
  //
  ngOnInit(): void {
      //
      this.newSearch();
  }
  //
  ngAfterViewInit() {
    //
  }
  //
  newSearch()
  {
      //
      console.warn("(NEW SEARCH 2)");
      //
      this.dataSource           = new MatTableDataSource<LogEntry>();
      this.dataSource.paginator = this.paginator;
      //
      this.searchForm   = this.formBuilder.group({
        //_P_ID_TIPO_LOG      : ["0"           , Validators.required], 
        //_P_DATA_SOURCE_ID   : ["0"           , Validators.required],
        _P_ROW_NUM          : ["999"         , Validators.required],
        _P_FECHA_INICIO     : ["2022-09-01"  , Validators.required],
        _P_FECHA_FIN        : ["2022-09-30"  , Validators.required],
      });
      //
      console.log("(DEFAULT VALUES - INIT)");
      //console.log("P_DATA_SOURCE_ID  : " + (this.searchForm.value["_P_DATA_SOURCE_ID"] || ""));
      //console.log("P_ID_TIPO_LOG     : " + (this.searchForm.value["_P_ID_TIPO_LOG"]    || ""));
      console.log("P_ROW_NUM         : " + (this.searchForm.value["_P_ROW_NUM"]        || ""));
      console.log("P_FECHA_INICIO    : " + (this.searchForm.value["_P_FECHA_INICIO"]   || ""));      
      console.log("P_FECHA_FIN       : " + (this.searchForm.value["_P_FECHA_FIN"]      || "")); 
      console.log("(DEFAULT VALUES - END)");
  }
  //
  onSubmit() 
  {
    //
       //
       console.warn("(SUBMIT 1)");
       //
       let _P_DATA_SOURCE_ID  : string = ""/*this.searchForm.value["_P_DATA_SOURCE_ID"] || ""*/;
       let _P_ID_TIPO_LOG     : string = ""/*this.searchForm.value["_P_ID_TIPO_LOG"]    || ""*/;
       let _P_ROW_NUM         : string = this.searchForm.value["_P_ROW_NUM"]        || "";
       let _P_FECHA_INICIO    : string = this.searchForm.value["_P_FECHA_INICIO"]   || "";      
       let _P_FECHA_FIN       : string = this.searchForm.value["_P_FECHA_FIN"]      || "";
 
       //
       let _model  = new SearchCriteria( 
                               _P_DATA_SOURCE_ID
                             , _P_ID_TIPO_LOG
                             , _P_ROW_NUM
                             , _P_FECHA_INICIO
                             , _P_FECHA_FIN
                             , "","");
       //
       if (_model.P_DATA_SOURCE_ID != "0")
           this.update(_model);
  }
  //
  update(_searchCriteria : SearchCriteria):void {
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
}
