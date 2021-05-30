export namespace CreationModel {
    export interface State {
        
        form: string,
        author: string,
        genre: string,
        language: string,
        Book: Book
        authors: Array<Object>,
        genres: Array<Object>,
        languages: Array<Object>,
        options: Object
    }

    export interface Props {
        books: any,
        genres: any,
        events: any,
        authors: any
    }
}

export class Book {
    name: string = '';
    description: string = '';
    publishDate: string = '';
    authorId: string = '';
    languageId: string = '';
    genreId: string = '';
    bookPhotoLink: string = '';
    bookPdfLink: string = '';
    bookAudioLink: string = '';
    bookVideoLink: string = '';
}