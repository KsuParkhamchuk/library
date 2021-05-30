
import React from "react"
import Header from "../../../Header"
import axios from 'axios'
import { Link } from "react-router-dom";


class BookPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            Book: {
                book_id: props.match.params.id,
                name: "",
                description: "",
                author: "",
                pdf: "",
                photo: "",
                video: ""
            },
            isAdded: false,
            sortedBooks: []
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/api/v1/books/${this.state.Book.book_id}`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
                Authorization: `bearer ${localStorage.getItem("access_token")}`
            }
        })
            .then(({ data: book }) => {
                this.setState({
                    Book: {
                        ...this.state.Book,
                        name: book.name,
                        description: book.description,
                        author: book.author,
                        pdf: book.bookPdfLink,
                        photo: book.bookPhotoLink,
                        video: book.bookVideoLink
                    },
                });
            });

        axios.get('http://localhost:8080/api/v1/books', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
                Authorization: `bearer ${localStorage.getItem("access_token")}`
            }
        })
            .then(({ data: books }) => {
                this.setState({
                    sortedBooks: []
                })
                let self = this;
                let sorted = books.filter(function (book: { author: { fullName: any; }, name: any }) {
                    if (book.name != self.state.Book.name) {
                        return book.author.fullName == self.state.Book.author.fullName;
                    }
                })
                sorted.map((item: any) => {
                    this.setState({
                        sortedBooks: sorted
                    })
                })
                console.log(this.state.sortedBooks);
            });

    }

    addToCard = () => {

        axios.patch(`http://localhost:8080/api/v1/books/${this.state.Book.book_id}/attach-to/${localStorage.getItem("user_id")}`,
            {
                id: this.state.Book.book_id,
                userId: localStorage.getItem("user_id")
            },
            {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': 'application/json',
                    Authorization: `bearer ${localStorage.getItem("access_token")}`
                }
            })
            .then(() => {
                this.setState({
                    isAdded: !this.state.isAdded
                })
            })
    }

    render() {
        return (
            <div>
                <Header></Header>
                <div className="book-page__content d-flex">
                    <div className="col-9">
                        <div className="book__description">
                            <div className="d-flex">
                                <div className="book__img"><img src={this.state.Book.photo} alt="" /></div>
                                <div className="book__text--wrapper">
                                    <div className="book__text">
                                        <h4 className="book__text--title">{this.state.Book.name}  {this.state.Book.author.fullName}</h4>
                                        <p className="book__text--descr">{this.state.Book.description}</p>
                                    </div>
                                    {this.state.isAdded == false ? (
                                        <div className="add-to-card" onClick={(e) => this.addToCard()}><button>Записать в дневник</button></div>
                                    ) : (
                                        <div className="book__links">
                                            <div className="book__pdf">{this.state.Book.pdf}</div>
                                            <div className="book__audio">{this.state.Book.audio}</div>
                                            <div className="book__video">{this.state.Book.video}</div>
                                            <div className="delete-from-card"><button>Удалить из дневника</button></div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="other-author-books">
                        {this.state.sortedBooks.map((item:any) =>(
                                <div className="other-books--item">
                                <div className="d-flex">
                                    <div className="col-4"><img src={item.bookPhotoLink} alt="" /></div>
                                    <div className="col-8">
                                        <h5 className="other-books__title">{item.name}</h5>
                                        <div className="other-books__text">{item.description}</div>
                                        <div className="learn-more"><Link to={`/book/${item.id}`}>Подробнее</Link></div>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookPage;
