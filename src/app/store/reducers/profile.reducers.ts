import { createReducer, on } from "@ngrx/store";
import { ProfileStateInterface } from "../interfaces/profileState.interface";
import * as ProfileActions from "../actions/profile.actions"

export const initialState: ProfileStateInterface = {
    profile: null,
    isLoading: false,
    error: null
};

export const profileReducers = createReducer(
    initialState,

    // GET: profile
    on(ProfileActions.getProfile, (state) => ({ ...state, isLoading: true, error: null})),
    on(ProfileActions.getProfileSuccess, (state, action) => ({
        ...state,
        isLoading: false,
        profile: action.profile
    })),
    on(ProfileActions.getProfileFailure, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error
    })),

    // PUT: profile
    on(ProfileActions.updateProfile, (state) => ({ ...state, isLoading: true, error: null})),
    on(ProfileActions.updateProfileSuccess, (state, action) => ({
        ...state,
        isLoading: false,
        profile: action.profile
    })),
    on(ProfileActions.updateProfileFailure, (state) => ({
        ...state,
        isLoading: false
    })),
);