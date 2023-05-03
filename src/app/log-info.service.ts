import { Injectable                        } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse          } from '@angular/common/http';
import { LogEntry                          } from './log-info.model';
import { Observable                        } from 'rxjs';
//
@Injectable({
  providedIn: 'root'
})
//
export class LogInfoService {
  //
  constructor(private http: HttpClient) { 
      //
  }
  //
  getLogRemoto() {
    //
    let url = 'https://mcsd.somee.com/demos/generarinformejson';
    // 
    return this.http.get<LogEntry[]>(url);   
  }
  //
  getInformeExcel(){
    //
    let p_url                              = 'https://mcsd.somee.com/demos/generarinformexls';
    //
    var HTTPOptions = {
      headers: new HttpHeaders({
         'Accept':'application/text'
      }),
      'responseType': 'text' as 'json'
    };
    //
    let excelFileName : Observable<string> =  this.http.get<string>(p_url,HTTPOptions);
    //
    return excelFileName; 
  }
}
