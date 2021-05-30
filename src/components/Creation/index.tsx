import React from "react";
import { CreationModel } from "./models"
import { Link } from "react-router-dom";
import axios from 'axios'
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import { Select, InputLabel, MenuItem } from '@material-ui/core';
import "./style.css";

class Creation extends React.Component<CreationModel.Props, CreationModel.State> {
  constructor(props: any) {
    super(props);
    this.state = {
      form: '',
      author: '',
      genre: '',
      language: '',
      Book: {
        name: '',
        description: '',
        publishDate: '',
        authorId: '',
        languageId: '',
        genreId: '',
        bookPhotoLink: '',
        bookPdfLink: '',
        bookAudioLink: '',
        bookVideoLink: '',
      },
      authors: [],
      genres: [],
      languages: [],
      options: {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
          Authorization: `bearer ${localStorage.getItem("access_token")}`
        }
      },
    };

  }

  componentWillMount = () => {
    axios.all(
      [
        axios.get('http://localhost:8080/api/v1/authors', this.state.options),
        axios.get('http://localhost:8080/api/v1/genres', this.state.options),
        axios.get('http://localhost:8080/api/v1/languages', this.state.options)
      ],
    )
      .then(axios.spread((authors, genres, languages) => {
        this.setState({
          authors: authors.data,
          genres: genres.data,
          languages: languages.data
        })
        console.log('authors: ', authors.data);
        console.log('genres: ', genres.data);
        console.log('languages: ', languages.data);
      }));

  }

  changeForm = (e: any, form: string) => {
    this.setState({ form: `${form}` });
  }

  createAuthor = () => {
    const { author } = this.state;
    fetch(`http://localhost:8080/api/v1/authors`, {
      method: "POST",
      headers: {
        Authorization: `bearer ${localStorage.getItem("access_token")}`,
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        fullName: this.state.author
      })
    })
  }

  createGenre = () => {
    const { genre } = this.state;
    fetch(`http://localhost:8080/api/v1/genres`, {
      method: "POST",
      headers: {
        Authorization: `bearer ${localStorage.getItem("access_token")}`,
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: genre
      })
    })
  }

  createBook = () => {
    axios.post('http://localhost:8080/api/v1/books',
      {
        name: this.state.Book.name,
        description: this.state.Book.description,
        publishDate: new Date('1966-01-02'),
        authorId: this.state.Book.authorId,
        languageId: this.state.Book.languageId,
        genreId: this.state.Book.genreId,
        bookPhotoLink: this.state.Book.bookPhotoLink,
        bookPdfLink: this.state.Book.bookPdfLink,
        bookAudioLink: this.state.Book.bookAudioLink,
        bookVideoLink: this.state.Book.bookVideoLink
      },
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
          Authorization: `bearer ${localStorage.getItem("access_token")}`
        }
      })
      .then(() => {
        console.log('ok');
      })
  }

  fieldChange = (e: any, formName: string, fieldName: string) => {
    if (fieldName != '') {
      switch (formName) {
        case 'language':
          this.setState({
            language: fieldName,
            Book: {
              ...this.state.Book,
              languageId: e.target.dataset.value,
            },
          });
          break;
        case 'genre':
          this.setState({
            genre: fieldName,
            Book: {
              ...this.state.Book,
              genreId: e.target.dataset.value,
            }
          });
          break;
        case 'author':
          this.setState({
            author: fieldName,
            Book: {
              ...this.state.Book,
              authorId: e.target.dataset.value,
            }
          });
          break;
        case 'book':
          this.setState({
            Book: {
              ...this.state.Book,
              [fieldName]: e.target.value,
            }
          });
          break;
        default: console.log("something wrong"); break;
      }
    }
    console.log(this.state.Book);
    console.log(this.state.language);
  };

  handleChange = (e: any, fieldName: string) => {
    switch (fieldName) {
      case 'language':
        this.setState({
          language: e.target.value
        });
        break;
      case 'genre':
        this.setState({
          genre: e.target.value,
        });
        break;
      case 'author':
        this.setState({
          author: e.target.value,
        });
        break;
    }

  }

  render() {
    return (
      <div className="creation">
        <div className="creation__menu d-flex p-4">
          <Button onClick={(e) => this.changeForm(e, 'book')} variant="contained" size="medium" color="primary">
            Книга
          </Button>
          <Button className="mx-4" onClick={(e) => this.changeForm(e, 'author')} variant="contained" size="medium" color="primary">
            Автор
          </Button>
          <Button onClick={(e) => this.changeForm(e, 'genre')} variant="contained" size="medium" color="primary">
            Жанр
          </Button>
          <Button className="mx-4" onClick={(e) => this.changeForm(e, 'event')} variant="contained" size="medium" color="primary">
            Событие
          </Button>
        </div>
        <div className="creationForm d-flex justify-content-around">
          {this.state.form === 'book' ?
            <div className="d-flex flex-column adminForm">
              <h4>Создать книгу</h4>
              <TextField id="name" className="my-4" label="Название" variant="filled" onChange={(e) => this.fieldChange(e, 'book', 'name')} />
              <TextField id="description" label="Описание" variant="filled" onChange={(e) => this.fieldChange(e, 'book', 'description')} />
              <InputLabel id="demo-simple-select-filled-label">Автор</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={this.state.author}
                onChange={(e) => this.handleChange(e, 'author')}
              >
                {this.state.authors.map((author: any) => (
                  <MenuItem value={author.id} onClick={(e) => this.fieldChange(e, 'author', author.fullName)}>{author.fullName}</MenuItem>
                ))}

              </Select>
              <InputLabel id="demo-simple-select-filled-label">Язык</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={this.state.language}
                onChange={(e) => this.handleChange(e, 'language')}
              >
                {this.state.languages.map((language: any) => (
                  <MenuItem value={language.id} onClick={(e) => this.fieldChange(e, 'language', language.name)}>{language.name}</MenuItem>
                ))}

              </Select>
              <InputLabel id="demo-simple-select-filled-label">Жанр</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={this.state.genre}
                onChange={(e) => this.handleChange(e, 'genre')}
              >
                {this.state.genres.map((genre: any) => (
                  <MenuItem value={genre.id} onClick={(e) => this.fieldChange(e, 'genre', genre.name)}>{genre.name}</MenuItem>
                ))}
              </Select>
              <TextField id="photo" label="Фото" variant="filled" onChange={(e) => this.fieldChange(e, 'book', 'bookPhotoLink')} />
              <TextField id="pdf" className="my-4" label="PDF" variant="filled" onChange={(e) => this.fieldChange(e, 'book', 'bookPdfLink')} />
              <TextField id="audio" label="Ссылка на аудио" variant="filled" onChange={(e) => this.fieldChange(e, 'book', 'bookAudioLink')} />
              <TextField id="video" className="my-4" label="Ссылка на видео" variant="filled" onChange={(e) => this.fieldChange(e, 'book', 'bookVideoLink')} />
              <Button variant="contained" size="medium" color="primary" onClick={this.createBook}>
                Создать
                  </Button>
            </div> :
            (this.state.form === 'author' ?

              <div className="d-flex flex-column adminForm">
                <h4>Создать автора</h4>
                <TextField id="authorName" onChange={(e) => this.handleChange(e, 'author')} className="my-4" label="Имя" variant="filled" />
                <Button variant="contained" onClick={this.createAuthor} size="medium" color="primary">
                  Создать
                  </Button>
              </div>
              /* { <div className="fullList">
               {
                 this.props.authors.map((author:any) => 
                   <div className="authorList">
                     <div className="row">
                       <div className="col-4">{author.id}</div>
                       <div className="col-8">{author.fullName}</div>
                     </div>
                   </div>
                 )
               }
             </div> }*/
              :
              (this.state.form === 'genre' ?
                <div className="d-flex flex-column adminForm">
                  <h4>Создать жанр</h4>
                  <TextField id="genreName" className="my-4" label="Название" onChange={(e) => this.handleChange(e, 'genre')} variant="filled" />
                  <Button variant="contained" onClick={this.createGenre} size="medium" color="primary">
                    Создать
                </Button>
                </div> :
                <div className="d-flex flex-column adminForm">
                  <h4>Создать Событие</h4>
                  <TextField id="eventName" className="my-4" label="Название события" variant="filled" />
                  <Button variant="contained" size="medium" color="primary">
                    Создать
              </Button>
                </div>))}


        </div>

      </div>
    );
  }
}

const mapDispatchToProps = {

};
export default connect(null, mapDispatchToProps)(Creation);
