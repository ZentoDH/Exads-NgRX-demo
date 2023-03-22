import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../interfaces/appSate.interface";

export const profileSelectFeature = (state: AppStateInterface) => state.profile;

export const profileSelector = {
    profile: createSelector(profileSelectFeature, (state) => state.profile),
    isLoading: createSelector(profileSelectFeature, (state) => state.isLoading),
    error: createSelector(profileSelectFeature, (state) => state.error),
}