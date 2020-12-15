import React from "react";
import "./style.css";
import { HomeModel } from "./models"
import * as actions from "../../actions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loadFilterData } from "../../actions";
import banner from "../../img/home.png";
import Header from "../Header";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


class Home extends React.Component<HomeModel.Props, HomeModel.State> {
  constructor(props: any) {
    super(props);
    this.state = {
        genres: [],
        authors: [],
        languages: []
    };
  }

  fieldChange = (e: any, fieldName: string) => {
    this.setState({
    
    });
  };

  loadFilterChanges = (dataType: string) => {
      console.log("1");
      if(dataType == "genres"){
      this.setState({ genres: [] });
      this.setState({
          genres: [...this.state.genres, this.props.loadFilterData(dataType)]
      })
    }
    
  }

  createFilter = (genre: string) => { 
    console.log("3");       
        return (
            <FormControlLabel
            control={<Checkbox checked={false} onChange={(e) => this.fieldChange(e,"hjhj")} name="" />}
            label={genre}
        />
        )
  }

  render() {
    return (
      <div>
        <div className="home__temlate">
          <div className="banner">
            <img src={banner} alt="" />
          </div>
          <Header></Header>
          <div className="home__content">
            <div className="home__filter">
              <Accordion onChange={(e) => this.loadFilterChanges("genres")}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"

                >
                  <Typography>Жанр</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                   {this.state.genres.map((genre) => {
                       this.createFilter(genre);
                     })}}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="home__activeContent"></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
    loadFilterData: actions.loadFilterData,
  })

export default connect(null, mapDispatchToProps)(Home);;
