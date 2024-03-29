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
  pageTitle            : string = '[CONSULTA LOG]';
  //
  static pageTitle()   : string {
    return '[CONSULTA LOG]';
  }
  //
  informeLogRemoto!                  : Observable<LogEntry[]>;
  //
  excelFileName!                     : Observable<string>;
  //
  td_textStatus                      : string = "";
  //
  td_buttonCaption                   : string = "[Buscar]";
  //
  td_formSubmit                      : boolean = false;
  //
  td_ExcelDownloadLink               : string  = "";
  //
  td_buttonCaption_xls               : string  = "";
  //
  td_textStatus_xls                  : string  = "";
  //
  dataSource                         = new MatTableDataSource<LogEntry>();
  // 
  displayedColumns                   : string[] = ['id_Column', 'pageName', 'accessDate', 'ipValue'];
  //
  model                              = new SearchCriteria( "0"
                                          ,"0"
                                          ,"999"
                                          ,"2023-01-01"
                                          ,"2023-12-31"
                                          ,""
                                          ,"");
  //
  @ViewChild("paginator" ,{read:MatPaginator}) paginator!:  MatPaginator;
  //
  searchForm   = this.formBuilder.group({
    //_P_ID_TIPO_LOG      : ["0"           , Validators.required], 
    //_P_DATA_SOURCE_ID   : ["0"           , Validators.required],
    _P_ROW_NUM          : ["999"         , Validators.required],
    _P_FECHA_INICIO     : ["2023-01-01"  , Validators.required],
    _P_FECHA_FIN        : ["2022-12-31"  , Validators.required],
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
        _P_ROW_NUM          : ["999"         , Validators.required],
        _P_FECHA_INICIO     : ["2023-01-01"  , Validators.required],
        _P_FECHA_FIN        : ["2023-12-31"  , Validators.required],
      });
      //
      console.log("(DEFAULT VALUES - INIT)");
      console.log("P_ROW_NUM         : " + (this.searchForm.value["_P_ROW_NUM"]        || ""));
      console.log("P_FECHA_INICIO    : " + (this.searchForm.value["_P_FECHA_INICIO"]   || ""));      
      console.log("P_FECHA_FIN       : " + (this.searchForm.value["_P_FECHA_FIN"]      || "")); 
      console.log("(DEFAULT VALUES - END)");
      //
      this.td_buttonCaption     = "[Buscar]";
      //
      this.td_formSubmit        = false;
      //
      this.td_textStatus        = "";
      //
      this.td_buttonCaption_xls               = "[Generar Excel]";
      //
      this.td_textStatus_xls                  = "";
      //
      this.td_ExcelDownloadLink               = "#";
  }
  //
  onSubmit() 
  {
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
    this.td_buttonCaption     = "[Buscando por favor espere]";
    //
    this.td_formSubmit        = true;
    //
    this.informeLogRemoto     = this.logInfoService.getLogRemoto();
    //
    const logSearchObserver   = {
      //
      next: (p_logEntry: LogEntry[])     => { 
        //
        console.log('Observer got a next value: ' + JSON.stringify(p_logEntry));
        //
        let recordCount : number  = p_logEntry.length;
        //
        this.td_textStatus        = "Se encontraton [" + recordCount  + "] registros";
        //
        this.dataSource           = new MatTableDataSource<LogEntry>(p_logEntry);
        this.dataSource.paginator = this.paginator;
        //
        // los botones se configuran en el evento "complete()".
      },
      error: (err: Error) => {
        //
        console.error('Observer got an error: ' + err);
        //
        this.td_textStatus        = "Ha ocurrido un error";
        //
        this.td_buttonCaption     = "[Buscar]";
        //
        this.td_formSubmit        = false;
      },       
      complete: ()        => {
        //
        console.log('Observer got a complete notification');
        //
        this.td_buttonCaption     = "[Buscar]";
        //
        this.td_formSubmit        = false;
      },
    };
    //
    this.informeLogRemoto.subscribe(logSearchObserver);
  }
  //
  GenerarInformeXLSValidate():void{
    //
    this.GenerarInformeXLSPost();
  };
  //
  GenerarInformeXLSPost():void  {
    //
    console.log("GENERAR EXCEL - POST");
    //
    this.td_ExcelDownloadLink               = "#";
    //
    this.td_buttonCaption_xls               = "[Generando por favor espere...]";
    //
    this.td_textStatus_xls                  = "[Generando por favor espere...]";
    //
    this.excelFileName                      = this.logInfoService.getInformeExcel();
    //
    const xlsObserver                       = {
      //
      next: (_excelFileName: string) => { 
        //
        console.log('Observer got a next value: ' + _excelFileName);
        //
        let urlFile               = 'https://mcsd.somee.com/xlsx/' + _excelFileName;
        this.td_ExcelDownloadLink = this. DebugHostingContent(urlFile);
        //
        this.td_textStatus_xls     = "[Descargar Excel]";
      },
      error   : (err: Error)  => {
        //
        console.error('Observer got an error: ' + err.cause);
        //
        console.error('Observer got an error: ' + err.message);
        //
        this.td_buttonCaption_xls  = "[Ha ocurrido un error]";
        //
        this.td_textStatus_xls     = "[Ha ocurrido un error]";
      },
      complete: () => {
        //
        console.log('Observer got a complete notification')
        //
        this.td_buttonCaption_xls  = "[Generar Excel]";
      },
    };
    //
    this.excelFileName.subscribe(xlsObserver);
  }
  //
  DebugHostingContent(msg : string) : string {
    //
    console.log("cadena a evaular : " + msg);
    //
    let regEx   = /(.*)(<!--SCRIPT GENERATED BY SERVER! PLEASE REMOVE-->)(.*\w+.*)(<!--SCRIPT GENERATED BY SERVER! PLEASE REMOVE-->)(.*)/;
    //
    var strMsg  = msg.replace(/(\r\n|\n|\r)/gm, "");
    //
    var matches = strMsg.match(regEx);
    //
    if (matches != null) {
        //
        for (var index = 1; index < matches.length; index++) {
            //
            var matchValue = matches[index];
            //        
            console.log("coincidencia : " + matchValue);

            //
            if ((matchValue.indexOf("<!--SCRIPT GENERATED BY SERVER! PLEASE REMOVE-->") != -1) && (matchValue.trim() != "")) {
                //
                strMsg = strMsg.replace(matchValue, "");
                //
                console.log("REEMPLAZANDO. NUEVA CADENA : " + strMsg);
            }

            //
            if ((matchValue.indexOf("<center>") != -1) && (matchValue.trim() != "")) {
                //
                strMsg = strMsg.replace(matchValue, "");
                //
                console.log("REEMPLAZANDO. NUEVA CADENA : " + strMsg);
            }
        }
      }
      else
          console.log("NO_HAY_COINCIDENCIAS");
      //
      console.log("CADENA DEPURADA : " + strMsg);
      //
      strMsg = strMsg.replace("unsafe:", "");
      //
      return strMsg;
  };
}
