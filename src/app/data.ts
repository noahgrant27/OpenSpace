import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from'@angular/common/http';
import { Observable, defer, EMPTY } from 'rxjs';
import { concatMap, delay, repeat } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Data {
  public ESP32_IP = "10.126.142.7";
  private url = "api/distance";
  // "http://"  + this.ESP32_IP + "/distance";

  constructor(private http: HttpClient) {}
  public getDistance(): Observable<any> {

    return defer(() => this.http.get<any>(this.url)).pipe(
        delay(1250),
<<<<<<< HEAD
        repeat(),
      )
=======
        repeat()
      );
  }
  public changeSpaceCount() {
    return defer(() => this.http.get<any>(this.url));
>>>>>>> b887d350bc87995a0e72330132b59ccafecc63c2
  }
}
