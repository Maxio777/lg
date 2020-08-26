import { Injectable } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  is576px: any;
  is768px: any;
  is992px: any;
  is1200px: any;


  constructor(public breakpointObserver: BreakpointObserver) {
    this.is576px = this.breakpointObserver.observe(['(min-width: 576px)']).pipe(map(result => result.matches));
    this.is768px = this.breakpointObserver.observe(['(min-width: 768px)']).pipe(map(result => result.matches));
    this.is992px = this.breakpointObserver.observe(['(min-width: 992px)']).pipe(map(result => result.matches));
    this.is1200px = this.breakpointObserver.observe(['(min-width: 1200px)']).pipe(map(result => result.matches));
  }

  get isDesktop() {
    return this.is768px;
  }
}
