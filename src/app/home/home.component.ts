import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, startWith, Subject, take, takeUntil, tap } from 'rxjs';
import { Campaign } from '../models/campaign.model';
import * as CampaignActions from '../store/actions/campaigns.actions';
import * as ProfileActions from '../store/actions/profile.actions';
import { AppStateInterface } from '../store/interfaces/appSate.interface';
import { campaignsSelector, errorSelector, isLoadingSelector } from '../store/selectors/campaigns.selectors';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateCampaignComponent } from '../modals/create-campaign/create-campaign.component';
import { profileSelector } from '../store/selectors/profile.selectors';
import { Profile } from '../models/profile.model';
import { ProfileComponent } from '../modals/profile/profile.component';
import { UserType } from '../enums/userType.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  // Table config
  displayedColumns: string[] = ['id', 'name', 'active'];

  // Store
  campaigns$: Observable<Campaign[]>;
  isLoadingCampaigns$: Observable<boolean>;
  errorCampaigns$: Observable<string | null>;
  profile$: Observable<Profile | null>;
  isLoadingProfile$: Observable<boolean>;
  errorProfile$: Observable<string | null>;

  constructor(private store: Store<AppStateInterface>, private dialog: MatDialog) {

    // NOTE: Depending on how you want to consume this

    this.campaigns$ = this.store.pipe(select(campaignsSelector));
    this.isLoadingCampaigns$ = this.store.pipe(select(isLoadingSelector));
    this.errorCampaigns$ = this.store.pipe(select(errorSelector));

    this.profile$ = this.store.pipe(select(profileSelector.profile));
    this.isLoadingProfile$ = this.store.pipe(select(profileSelector.isLoading));
    this.errorProfile$ = this.store.pipe(select(profileSelector.error));

    // How we do it at Exads
    // this.store.pipe(
    //   select(campaignsSelector),
    //   takeUntil(this.ngUnsubscribe)
    // ).subscribe(campaigns => {
    //   this.resultsLength = campaigns.length;
    //   this.campaigns = campaigns
    // });
  }

  ngOnInit(): void {
    this.getCampaigns();
    this.getProfile();
  }

  getCampaigns() :void {
    this.store.dispatch(CampaignActions.getCampaigns());
  }

  getProfile() :void {
    this.store.dispatch(ProfileActions.getProfile());
  }

  addCampaign() {
    const dialogRef = this.dialog.open(CreateCampaignComponent, { });

    dialogRef.afterClosed().pipe(take(1)).subscribe(name => {
      this.store.dispatch(CampaignActions.addCampaign({name}))
    });
  }

  openProfileModal(profile: Profile | null) {
    if (!profile) return;
    const dialogRef = this.dialog.open(ProfileComponent, {
      data: profile,
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(profile => {
      if (profile) {
        this.store.dispatch(ProfileActions.updateProfile(profile))
      }
    });
  }

  updateUserType(profile: Profile | null, userType: UserType) {
    if (!profile || !userType) return
    this.store.dispatch(ProfileActions.updateProfile({ ...profile, userType }))
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
