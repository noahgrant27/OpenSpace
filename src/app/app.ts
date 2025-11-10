import { Component, signal, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Data } from './data';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {
  public distanceVal: any = null;
  private dataSubscription: Subscription | null = null;
  protected readonly title = signal('OpenSpace');
  private data = inject(Data);

  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
      this.dataSubscription = this.data.getDistance()
      .subscribe({
        next: (data) => {
          console.log("COMPONENT", data);
          this.distanceVal = data;
        },
        error: (err) => {
          console.log(err);
        }
      });
    
    //   this.data.getDistance().subscribe({
    //     next: (distance) => {
    //     this.distanceVal = distance;
    //     console.log(this.distanceVal);
    //   }
    // })  
      // }
      
    // }

  }
}
