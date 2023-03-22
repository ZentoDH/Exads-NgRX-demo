import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoreModule } from '@ngrx/store';
import { campaignReducers } from '../store/reducers/campaigns.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CampaignEffects } from '../store/effects/campaigns.effects';
import { CreateCampaignComponent } from '../modals/create-campaign/create-campaign.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { profileReducers } from '../store/reducers/profile.reducers';
import { ProfileEffects } from '../store/effects/profile.effects';
import { ProfileComponent } from '../modals/profile/profile.component';
import { ReactiveComponentModule } from '@ngrx/component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    CreateCampaignComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    ReactiveComponentModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature('campaigns', campaignReducers),
    StoreModule.forFeature('profile', profileReducers),
    EffectsModule.forFeature([
      CampaignEffects,
      ProfileEffects,
    ])
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ]
})
export class HomeModule { }
