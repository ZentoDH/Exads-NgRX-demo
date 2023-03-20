import { Campaign } from "../../models/campaign.model";

export interface CampaignsStateInterface {
    isLoading: boolean;
    campaigns: Campaign[];
    error: string | null;
}