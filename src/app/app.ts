import { Component, signal, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Data } from './data';
import { Poll } from './poll/poll';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { isPlatformBrowser, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Poll, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {
  public distanceVal: any = null;

  private dataSubscription: Subscription | null = null;
  private data = inject(Data);
  showPoll = false;
  protected readonly title = signal('OpenSpace');

  private platformId = inject(PLATFORM_ID);

  showPollView() {
    this.showPoll = !this.showPoll;
    console.log(this.showPoll);
  }
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
  }

}
