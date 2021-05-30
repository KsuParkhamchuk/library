export namespace AdminPageModel {
    export interface State {
        panelState: boolean,
        baseUrl: string,
        genres: string[],
        authors: string[],
        books: {},
        events: {}
    }

    export interface Props {
       error: string,
       loading: string,
       genres: [],
       dispatch: any,
       authors: [],
       books: {},
       events: {},
       loadGenres: any
    }
}


