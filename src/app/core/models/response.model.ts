export interface APIResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: object
}

export interface UserData {
    email: string;
    token: string;
    userName: string;
    stage: number;
    additionalDetails: AdditionalDetails;
    createdAt: string
    lastActiveAt: string
    pocketProfile: PocketProfile
}

export interface PocketProfile {
    id: string
    userName: string
    email: string
    createdAt: string
    lastModifiedAt: string
    profiles: Profile[]
  }

export interface Profession {
    id: number;
    name: string;
}

export interface Profile {
    id: number;
    category: string;
    baseUrl: string;
    searchKey: string;
    name: string;
    profileUserName: string;
    isVisibleToOthers: string;
    lastModifiedAt: Date;
}

export interface AdditionalDetails {
    category: string;
    profession: string;
    fullName: string;
    profilePictureUrl: string;
    profileTheme: string;
    bio: string;
}


export interface Profiles {
    category: string;
    profiles: Array<Profile>;
}


export interface ImageUploadResult
{
    publicId: string;
    url: string;
}
