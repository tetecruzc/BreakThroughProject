import { Profile } from "@/modules/profiles/interface/profiles.interface";

export interface ProfilesStateInterface {
    profiles: Profile[];
    totalProfiles: number;
}
