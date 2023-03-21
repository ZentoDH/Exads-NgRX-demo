import { Injectable } from '@angular/core';
import { delay, mergeMap, Observable, of, throwError } from 'rxjs';
import { Campaign } from '../models/campaign.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {
  private _campaigns: Campaign[] = [];

  constructor() {
    // FAKE DATA
    this._campaigns = [
      {
        id: this.newId(),
        name: 'popunder',
        active: false
      },
      {
        id: this.newId(),
        name: 'popover',
        active: false
      },
      {
        id: this.newId(),
        name: 'Banner 300X100',
        active: false
      },
      {
        id: this.newId(),
        name: 'Banner 300X250',
        active: false
      }
    ]
  }

  getCampaigns(): Observable<Campaign[]> {
    return of(this._campaigns).pipe(delay(2000));

    // error state
    // return of(this._campaigns).pipe(
    //   delay(2000),
    //   mergeMap(() => throwError('Couldn\'t get campaigns!'))
    // );
  }

  addCampaign(name: string): Observable<Campaign> {
    const newCampaign = {
      id: this.newId(),
      name: name,
      active: true
    }
    return of(newCampaign).pipe(delay(2000));

    // error state
    // return of(newCampaign).pipe(
    //   delay(2000),
    //   mergeMap(() => throwError('Create campaign went wrong!'))
    // );
  }

  hardCodedResultLength(): number {
    return this._campaigns.length;
  }

  private newId(): string {
    return `${Math.floor(Math.random() * 999)}-${Math.floor(Math.random() * 999)}`
  }
}
