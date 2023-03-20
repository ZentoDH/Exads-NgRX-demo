import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../interfaces/appSate.interface";

export const campaignsSelectFeature = (state: AppStateInterface) => state.campaigns;

export const campaignsSelector = createSelector(campaignsSelectFeature, (state) => state.campaigns);
export const isLoadingSelector = createSelector(campaignsSelectFeature, (state) => state.isLoading);
export const errorSelector = createSelector(campaignsSelectFeature, (state) => state.error);