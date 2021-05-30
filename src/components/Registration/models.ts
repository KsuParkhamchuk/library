export namespace UserModel {
    export interface State {
        newUser: User,
        passwordConfirmation: string,
        sessionToken: string,
        errors: Array<String>,
        isRegistrationOk: boolean,
        isAuthorized: string,
        firstTime: string,
    }

    export interface Props {
        saveUser: any
    }
}

export class User {
    fullName: string = '';
    login: string = '';
    password: string = '';
    role: string = ''
}