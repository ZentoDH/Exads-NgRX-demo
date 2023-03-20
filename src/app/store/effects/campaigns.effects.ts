import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { CampaignsService } from "src/app/services/campaigns.service";
import * as CampaignsActions from "../actions/campaigns.actions"

@Injectable()
export class CampaignEffects {
    getCampaigns$ = createEffect(() =>
        this.actions$.pipe(ofType(CampaignsActions.getCampaigns), mergeMap(() => {
            return this.campaignsService.getCampaigns().pipe(
                map((campaigns) => CampaignsActions.getCampaignsSuccess({ campaigns })),
                catchError((error) => of(CampaignsActions.getCampaignsFailure({ error })))
            );
        }))
    );

    addCampaign$ = createEffect(() =>
        this.actions$.pipe(ofType(CampaignsActions.addCampaign), mergeMap((action) => {
            return this.campaignsService.addCampaign(action.name).pipe(
                map((campaign) => CampaignsActions.addCampaignSuccess({ campaign })),
                catchError((error) => {
                    alert(error);
                    return of(CampaignsActions.addCampaignFailure({ error }))
                })
            );
        }))
    );

    constructor(private actions$: Actions, private campaignsService: CampaignsService) { }
}