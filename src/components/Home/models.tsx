export namespace HomeModel {
    export interface State {
        genres: Array<any>,
        authors: Array<any>,
        languages: Array<any>,
        modalOpen: boolean
        checkedAuthors: Array<Number>,
        checkedGenres: Array<Number>,
        checkedLanguages: Array<Number>
    }

    export interface Props {
        
    }
}