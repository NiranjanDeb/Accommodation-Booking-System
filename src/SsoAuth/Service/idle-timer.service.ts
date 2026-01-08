import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { fromEvent, interval, merge, Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdleTimerService {
  private idleTimeout = environment.activityLogoutTimeInMins * 60 * 1000;
  private activityEvents = ['mousemove', 'keydown', 'click'];
  private activitySubscription?: Subscription;
  private idleTimer?: Subscription;
  private countdownInterval?: Subscription;

  // For displaying countdown
  public remainingSeconds: number = this.idleTimeout / 1000;

  constructor(
    private ngZone: NgZone,
    private router: Router
  ) {}

  startWatching(logoutCb: () => void) {
    // Watch for user activity
    this.ngZone.runOutsideAngular(() => {
      this.activitySubscription = merge(
        ...this.activityEvents.map((ev) => fromEvent(document, ev))
      ).subscribe(() => this.resetTimer(logoutCb));
    });

    // Start countdown immediately
    this.resetTimer(logoutCb);
  }

  stopWatching() {
    this.activitySubscription?.unsubscribe();
    this.idleTimer?.unsubscribe();
    this.countdownInterval?.unsubscribe();
  }

  private resetTimer(logoutCb: () => void) {
    // Stop any running timers
    this.idleTimer?.unsubscribe();
    if(!environment.production)this.countdownInterval?.unsubscribe();

    // Reset countdown to 10 minutes
    this.remainingSeconds = this.idleTimeout / 1000;

    // Start countdown
    if(!environment.production){
      this.countdownInterval = interval(1000).subscribe(() => {
        this.remainingSeconds--;
        // console.log('⏳ Idle countdown:', this.remainingSeconds, 'seconds');
        if (this.remainingSeconds <= 0) {
          this.countdownInterval?.unsubscribe();
        }
      });
    }

    // Start idle timeout timer (logout after 10 minutes)
    this.idleTimer = timer(this.idleTimeout).subscribe(() => {
      this.ngZone.run(() => {
        console.log('🚪 Inactive for 10 minutes → Logging out...');
        logoutCb();
      });
    });
  }
}
