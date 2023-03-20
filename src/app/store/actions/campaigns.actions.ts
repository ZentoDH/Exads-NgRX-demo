import { createAction, props } from "@ngrx/store";
import { Campaign } from "src/app/models/campaign.model";

// Get all campaigns
export const getCampaigns = createAction('[Campaigns] Get Campaigns');
export const getCampaignsSuccess = createAction(
    '[Campaigns] Get Campaigns success',
    props<{ campaigns: Campaign[] }>()
);
export const getCampaignsFailure = createAction(
    '[Campaigns] Get Campaigns failure',
    props<{ error: string }>()
);

// Add a campaign
export const addCampaign = createAction('[Campaigns] Add Campaigns',
    props<{ name:string }>()
);
export const addCampaignSuccess = createAction(
    '[Campaigns] Add Campaign success',
    props<{ campaign: Campaign }>()
);
export const addCampaignFailure = createAction(
    '[Campaigns] Add Campaign failure',
    props<{ error: string }>()
);

