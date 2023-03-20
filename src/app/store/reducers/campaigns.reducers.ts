import { createReducer, on } from "@ngrx/store";
import { CampaignsStateInterface } from "../interfaces/campaignsState.interface"
import * as CampaignActions from "../actions/campaigns.actions"

export const initialState: CampaignsStateInterface = {
    campaigns: [],
    isLoading: false,
    error: null
};

export const campaignReducers = createReducer(
    initialState,

    // GET: campaigns
    on(CampaignActions.getCampaigns, (state) => ({ ...state, isLoading: true, error: null})),
    on(CampaignActions.getCampaignsSuccess, (state, action) => ({
        ...state,
        isLoading: false,
        campaigns: action.campaigns
    })),
    on(CampaignActions.getCampaignsFailure, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error
    })),

    // POST: campaign
    on(CampaignActions.addCampaign, (state) => ({ ...state, isLoading: true, error: null})),
    on(CampaignActions.addCampaignSuccess, (state, action) => ({
        ...state,
        isLoading: false,
        campaigns: [...state.campaigns, action.campaign]
    })),
    on(CampaignActions.addCampaignFailure, (state) => ({
        ...state,
        isLoading: false
    })),
);