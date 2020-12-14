import React from "react";
import books from "../../img/books.png";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./style.css";

class Creation extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      form: '',
    };
  }

  changeForm = (e:any, form:string) => {
    this.setState({form: `${form}` });
  }

  render() {
    return (
      <div className="creation">
        <div className="d-flex p-4">
          <Button onClick={(e) => this.changeForm(e,'book')} variant="contained" size="medium" color="primary">
            Книга
          </Button>
          <Button className="mx-4" onClick={(e) => this.changeForm(e,'author')} variant="contained" size="medium" color="primary">
            Автор
          </Button>
          <Button onClick={(e) => this.changeForm(e,'event')} variant="contained" size="medium" color="primary">
            Событие
          </Button>
        </div>
        <div className="creationForm">
          {this.state.form === 'book' ? 
            <div>Книги</div> :
            (this.state.form === 'author' ? <div>Автор</div> : <div>Событие</div>) }
        </div>
      </div>
    );
  }
}

export default Creation;
