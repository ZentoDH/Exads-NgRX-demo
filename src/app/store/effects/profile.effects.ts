import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { ProfileService } from "src/app/services/profile.service";
import * as ProfileActions from "../actions/profile.actions"

@Injectable()
export class ProfileEffects {
    getProfile$ = createEffect(() =>
        this.actions$.pipe(ofType(ProfileActions.getProfile), mergeMap(() => {
            return this.profileService.getProfile().pipe(
                map((profile) => ProfileActions.getProfileSuccess({ profile })),
                catchError((error) => of(ProfileActions.getProfileFailure({ error })))
            );
        }))
    );

    updateProfile$ = createEffect(() =>
        this.actions$.pipe(ofType(ProfileActions.updateProfile), mergeMap((action) => {
            return this.profileService.updateProfile(action.name, action.userType).pipe(
                map((profile) => ProfileActions.updateProfileSuccess({ profile })),
                catchError((error) => {
                    alert(error);
                    return of(ProfileActions.updateProfileFailure({ error }))
                })
            );
        }))
    );

    constructor(private actions$: Actions, private profileService: ProfileService) { }
}