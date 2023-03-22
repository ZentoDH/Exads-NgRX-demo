import { CampaignsStateInterface } from "./campaignsState.interface";
import { ProfileStateInterface } from "./profileState.interface";

export interface AppStateInterface {
    campaigns: CampaignsStateInterface;
    profile: ProfileStateInterface;
}