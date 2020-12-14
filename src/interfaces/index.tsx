import { ROLE } from "../constants";

export interface UserRegistration {
  fullName: string;
  login: string;
  password: string;
}

export interface User {
  id: number;
  fullName: string;
  login: string;
  role: ROLE;
  events: Event[];
  books: Book[];
  recommendedBooks: Book[];
  lastAuthorPreferences: Author[];
  lastGenrePreferences: Genre[];
  lastLanguagePreferences: Language[];
}

export interface Author {
  id: number;
  fullName: string;
  books: Book[];
}

export interface Genre {
  id: number;
  name: string;
  books: Book[];
}

export interface Language {
  id: number;
  name: string;
  books: Book[];
}

export interface Book {
  id: number;
  name: string;
  description: string;
  publishDate: Date;
  bookPhotoLink: string;
  bookPdfLink: string;
  bookAudioLink: string;
  bookVideoLink: string;
  author: Author;
  genre: Genre;
  language: Language;
  users: User[];
  recommendedToUsers: User[];
  userCount?: number;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  date: Date;
  ended: boolean;
  users: User[];
}