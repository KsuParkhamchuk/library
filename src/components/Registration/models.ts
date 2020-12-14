export namespace UserModel {
    export interface State {
        newUser: User,
        passwordConfirmation: string,
        sessionToken: string,
        errors: Array<String>
    }

    export interface Props {
      saveUser: any
    }
}

export class User {
    firstName: string = '';
    lastName: string = '';
    login: string = '';
    password: string = '';

}
