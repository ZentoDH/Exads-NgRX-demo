import { createAction, props } from "@ngrx/store";
import { UserType } from "src/app/enums/userType.enum";
import { Profile } from "src/app/models/profile.model";

// Fetch profile
export const getProfile = createAction('[Profile] Get Profile');
export const getProfileSuccess = createAction(
    '[Profile] Get Profile success',
    props<{ profile: Profile }>()
);
export const getProfileFailure = createAction(
    '[Profile] Get Profile failure',
    props<{ error: string }>()
);

// Change profile
export const updateProfile = createAction('[Profile] Update Profile',
    props<{ name:string, userType: UserType }>()
);
export const updateProfileSuccess = createAction(
    '[Profile] Update Profile success',
    props<{ profile: Profile }>()
);
export const updateProfileFailure = createAction(
    '[Profile] Update Profile failure',
    props<{ error: string }>()
);

