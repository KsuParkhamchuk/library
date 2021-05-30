import React from "react";
import "./style.css";
import { DefaultScreenModel } from "./models";
import { Link,Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";


class DefaultScreen extends React.Component<DefaultScreenModel.Props, DefaultScreenModel.State> {
  constructor(props: any) {
    super(props);
    this.state = {
        nonFictionBooks: [],
        childBooks: [],
        popularBooks: [],
        genres: [],
        books: [],
        isAuthorized: false
    };
  }

  componentWillMount() {
    const {popularBooks, genres, nonFictionBooks, childBooks} = this.state;
    this.setState({ genres: [] });
    this.setState({ popularBooks: [] });
   fetch(`http://localhost:8080/api/v1/books/stats/most-popular`,{
       headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
        Authorization: `bearer ${localStorage.getItem("access_token")}`
       }
   })
   .then(response => response.json())
   .then(data => this.setState({
       popularBooks: data
   }));

 }

  fieldChange = (e: any, fieldName: string) => {
    this.setState({
    
    });
  };


  render() {
    return (
      <div>
       <div className="popularBooks">
           <h4>Популярные книги</h4>
           <div className="popularBooks__container d-flex">
               {
                   this.state.popularBooks.map((book:any) => 
                       <div className="popularBooks__item mx-5">
                           <div className="popularBooks__item--img">
                               <img src={book.bookPhotoLink} alt=""/>
                           </div>
                           <div className="popularBooks__item--name font-weight-bold text-center">
                               <p className="">{book.name}</p>
                           </div>
                           <div className="popularBooks__item--link font-weight-bold text-center">
                           <Link to={`/book/${book.id}`} className="header__navigation--link">
                                Подробнее
                            </Link>
                           </div>
                       </div>
                   )
               }
           </div>
       </div>
       
      </div>
    );
  }
}

export default DefaultScreen;
