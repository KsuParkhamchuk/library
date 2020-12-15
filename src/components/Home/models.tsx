export namespace HomeModel {
    export interface State {
        genres: string[],
        authors: string[],
        languages: string[]
     
    }

    export interface Props {
        loadFilterData: any
    }
}