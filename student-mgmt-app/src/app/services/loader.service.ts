import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderCounter = new BehaviorSubject<number>(0);

  loaderCounter$ = this.loaderCounter.asObservable();

  show() {
    setTimeout(() => {
    this.loaderCounter.next(this.loaderCounter.value + 1);
    }, 100);
  }

  hide() {
    this.loaderCounter.next(this.loaderCounter.value - 1);
  }
}
