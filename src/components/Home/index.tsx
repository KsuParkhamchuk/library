import React from "react";
import "./style.css";
import { HomeModel } from "./models"
import banner from "../../img/home.png";
import Header from "../Header";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";
import DefaultScreen from './DefaultScreen'
import Modal from '@material-ui/core/Modal';



class Home extends React.Component<HomeModel.Props, HomeModel.State> {
  constructor(props: any) {
    super(props);
    this.state = {
      genres: [],
      authors: [],
      languages: [],
      modalOpen: false,
      checkedAuthors: [],
      checkedGenres: [],
      checkedLanguages: []
    };
  }

  async componentWillMount() {
    const { genres, authors, languages } = this.state
    this.setState({ authors: [] });
    await fetch(`http://localhost:8080/api/v1/genres`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
        Authorization: `bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then(response => response.json())
      .then(data => this.setState({
        genres: data
      }));

    await fetch(`http://localhost:8080/api/v1/authors`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
        Authorization: `bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then(response => response.json())
      .then(data => this.setState({
        authors: data
      }));

    await fetch(`http://localhost:8080/api/v1/languages`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
        Authorization: `bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then(response => response.json())
      .then(data => this.setState({
        languages: data
      }));

    if (localStorage.getItem('firstTime') == 'first') {
      this.setState({
        modalOpen: true
      })
    }
  }

  fieldChange = (e: any, fieldId: number, fieldType: string) => {
    console.log(e.target.checked);
    e.target.checked = !e.target.checked;
    if(e.target.checked){
      switch(fieldType){
        case 'genre':
          this.setState({
            checkedGenres: [...this.state.checkedGenres, fieldId],
          });
    }    
    }

  };

  handleClose = (e:any) => {

  }

  applyFilter = () => {

  }

  render() {
    return (
      <div>
        <div className="home__temlate">
          <div className="banner">
            <img src={banner} alt="" />
          </div>
          <Header></Header>
          <div className="home__content d-flex">
            <div className="home__filter">
              <div className="filters mt-3">
                <Accordion >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"

                  >
                    <Typography>Жанр</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {this.state.genres.map((genre: any) =>
                        <FormControlLabel
                          key={genre.id}control={<Checkbox checked={false} onChange={(e) => this.fieldChange(e, genre.id, 'genre')} name="" />}
                          label={genre.name} />
                      )}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"

                  >
                    <Typography>Авторы</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {this.state.authors.map((author: any) =>
                        <FormControlLabel
                          control={<Checkbox checked={false} onChange={(e) => this.fieldChange(e, author.id, 'author')} name="" />}
                          label={author.fullName} />
                      )}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"

                  >
                    <Typography>Язык</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {this.state.languages.map((language: any) =>
                        <FormControlLabel
                          control={<Checkbox checked={false} onChange={(e) => this.fieldChange(e, language.id, 'language')} name="" />}
                          label={language.name} />
                      )}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <div className="filterBtn d-flex justify-content-center mt-3">
                  <Button variant="contained" size="medium" color="primary" onClick={this.applyFilter}>
                    Применить фильтр
                        </Button>
                </div>
              </div>
            </div>
            <div className="home__activeContent">
              <DefaultScreen></DefaultScreen>
            </div>
          </div>
          <Modal
          open={this.state.modalOpen}
          // onClose={}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >         
          <div className="modal-wrapper">
            <h3 className="modal__title">Укажите ваши предпочтения</h3>
            <div className="author__prefs">
              
            </div>
            <div className="genre__prefs">
              {this.state.genres.map((genre:any) => (
                <FormControlLabel
                control={<Checkbox checked={false} onChange={(e) => this.fieldChange(e, genre.id, 'genre')} name="checkedA" />}
                label="Secondary"
              />
              ))}
            </div>
            <div className="language__prefs"></div>
          </div>
        </Modal>
        </div>       
      </div>
    );
  }
}

export default Home;
