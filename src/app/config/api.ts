export class API {
    UseAuth: string = 'use-auth';
    BASE_URL = 'https://localhost:7064/api/';
    BASE_URL1 = 'https://pocketapi20240313174808.azurewebsites.net/api/';
    Auth = {
        login: this.BASE_URL + 'auth/login',
        register: this.BASE_URL + 'auth/register'   
    }

    User = {
        isUserEmailTaken: this.BASE_URL + 'user/emailTaken',
        isUserNameTaken: this.BASE_URL + 'user/userNameTaken',
        getAllProfessions: this.BASE_URL + 'user/getAllProfessions',
        saveAdditionalDetails: this.BASE_URL + 'user/createAdditionalDetails',
        getUserDetail: this.BASE_URL + 'user/getUserProfile'
    }

    profile = {
        getProfiles: this.BASE_URL + 'profile/getSocialProfiles',
        saveProfile: this.BASE_URL + 'profile/addPocketProfile',
        getPocketProfile: this.BASE_URL + 'profile/getPocketProfile',
        getAdminPocketProfile: this.BASE_URL + 'profile/getAdminPocketProfile',
        updatePocketProfile: this.BASE_URL + 'profile/updatePocketProfile',
        deletePocketProfile: this.BASE_URL + 'profile/deletePocketProfile',
    }

    photo = {
        savePhoto: this.BASE_URL + 'image/upload'
    }
}