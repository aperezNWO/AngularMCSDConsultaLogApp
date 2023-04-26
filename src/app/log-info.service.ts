import { Injectable          } from '@angular/core';
import { HttpClient          } from '@angular/common/http';
import { LogEntry            } from './log-info.model';
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
}
