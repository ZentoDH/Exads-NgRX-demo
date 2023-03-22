import { Profile } from "src/app/models/profile.model";

export interface ProfileStateInterface {
    isLoading: boolean;
    profile: Profile | null;
    error: string | null;
}