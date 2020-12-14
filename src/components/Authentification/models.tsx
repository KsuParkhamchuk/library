export namespace UserModel {
    export interface State {
        User: User,
        errors: Array<String>
    }

    export interface Props {
      loginUser: any
    }
}

export class User {
    login: string = '';
    password: string = '';

}