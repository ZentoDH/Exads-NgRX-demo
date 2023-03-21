import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, startWith, Subject, takeUntil, tap } from 'rxjs';
import { Campaign } from '../models/campaign.model';
import * as CampaignActions from '../store/actions/campaigns.actions'
import { AppStateInterface } from '../store/interfaces/appSate.interface';
import { campaignsSelector, errorSelector, isLoadingSelector } from '../store/selectors/campaigns.selectors';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateCampaignComponent } from '../modals/create-campaign/create-campaign.component';

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

  constructor(private store: Store<AppStateInterface>, private dialog: MatDialog) {

    // NOTE: Depending on how you want to consume this

    this.campaigns$ = this.store.pipe(select(campaignsSelector));
    this.isLoadingCampaigns$ = this.store.pipe(select(isLoadingSelector));
    this.errorCampaigns$ = this.store.pipe(select(errorSelector));

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
  }

  getCampaigns() :void {
    this.store.dispatch(CampaignActions.getCampaigns());
  }

  addCampaign() {
    const dialogRef = this.dialog.open(CreateCampaignComponent, { });

    dialogRef.afterClosed().subscribe(name => {
      this.store.dispatch(CampaignActions.addCampaign({name}))
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
