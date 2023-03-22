import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { UserType } from '../enums/userType.enum';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private _profile: Profile;

  constructor() {
    // FAKE DATA
    this._profile = {
      id: this.newId(),
      name: 'Zento',
      userType: UserType.advertiser
    }
  }

  getProfile(): Observable<Profile> {
    return of(this._profile).pipe(delay(2000));

    // error state
    // return of(this._campaigns).pipe(
    //   delay(2000),
    //   mergeMap(() => throwError('Couldn\'t get campaigns!'))
    // );
  }

  updateProfile(name: string, userType: UserType): Observable<Profile> {
    const updatedUser: Profile = {
      ...this._profile,
      name: name,
      userType: userType
    }
    return of(updatedUser).pipe(delay(2000));

    // error state
    // return of(newCampaign).pipe(
    //   delay(2000),
    //   mergeMap(() => throwError('Create campaign went wrong!'))
    // );
  }

  private newId(): string {
    return `${Math.floor(Math.random() * 999)}-${Math.floor(Math.random() * 999)}`
  }
}
