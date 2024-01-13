interface Login {

    accessToken: string;
    refreshToken: string;
    role: string;
    affiliatedConfirmation: boolean;
}

interface GenerateAuthCode {

    verificationCode: number
}

interface ReissueToken {
    accessToken: string;
    refreshToken: string | undefined;
}


export {
    Login,
    GenerateAuthCode,
    ReissueToken

}