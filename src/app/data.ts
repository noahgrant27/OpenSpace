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
        repeat(),
      )
    // return interval(1250).pipe(
    //   startWith(0),
    //   switchMap(() => this.http.get<any>(this.url)),
    //   tap(data => console.log(data))
    //   );
  }

}
