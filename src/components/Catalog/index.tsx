import React from "react";
import "./style.css";
import { connect } from "react-redux";
import { IRootState } from "../../reducers";
import * as actions from "../../actions";
// import { getMonthImgs } from "../../selectors";
import { CatalogModel } from "./models";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

class Catalog extends React.Component<CatalogModel.Props, CatalogModel.State> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      modalImgInfo: {},
      months: [
        { monthName: "January", monthValue: "01" },
        { monthName: "February", monthValue: "02" },
        { monthName: "March", monthValue: "03" },
        { monthName: "April", monthValue: "04" },
        { monthName: "May", monthValue: "05" },
        { monthName: "June", monthValue: "06" },
        { monthName: "July", monthValue: "07" },
        { monthName: "August", monthValue: "08" },
        { monthName: "September", monthValue: "09" },
        { monthName: "October", monthValue: "10" },
        { monthName: "November", monthValue: "11" },
        { monthName: "December", monthValue: "12" },
      ],
      years: ["2020", "2019", "2018", "2017"],
      selectedMonth: "",
      selectedYear: "",
    };
  }

  componentWillMount() {
    this.props.clearArray();
    let today = new Date();
    let counter = today.getDate();
    while (counter !== -1) {
      this.props.getImgs(
        today.getFullYear() + "-0" + (today.getMonth() + 1) + "-" + counter
      );
      counter--;
    }

    this.setState({
      selectedMonth: "0" + (today.getMonth() + 1),
      selectedYear: String(today.getFullYear()),
    });
  }

  openModal = (e: any) => {
    let itemIndex = e.target.dataset.id;
    this.setState({
      open: true,
      modalImgInfo: this.props.monthImages[itemIndex],
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleChange = (event: any, valueType: string) => {
    if (valueType === "month") {
      this.setState(
        {
          selectedMonth: event.target.value,
        },
        this.callApi
      );
    } else {
      this.setState(
        {
          selectedYear: event.target.value,
        },
        this.callApi
      );
    }
  };

  callApi = () => {
    this.props.clearArray();
    let counter = 1;
    while (counter !== 28) {
      this.props.getImgs(
        this.state.selectedYear + "-" + this.state.selectedMonth + "-" + counter
      );
      counter++;
    }
  };

  render() {
    return (
      <div className="catalog">
        <div className="catalog__header">
          <div className="catalog__header--text">Nasa Image Gallery</div>
          <div className="filterInputs">
            <FormControl className="catalog__selectInput">
              <InputLabel id="demo-simple-select-label">Month</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.selectedMonth}
                onChange={(e) => this.handleChange(e, "month")}
              >
                <MenuItem value="">Month</MenuItem>
                {this.state.months.map((item, i) => {
                  let date = new Date();
                  if(+item.monthValue <= (date.getMonth() + 1)){
                    return <MenuItem value={item.monthValue}>{item.monthName}</MenuItem>
                  } else{
                    return <MenuItem value={item.monthValue} disabled>{item.monthName}</MenuItem>
                  }
                })}
              </Select>
            </FormControl>
            <FormControl className="catalog__selectInput">
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.selectedYear}
                onChange={(e) => this.handleChange(e, "year")}
              >
                {this.state.years.map((item, i) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="catalog__gallery">
          {this.props.monthImages.map((img: any, ind: any) => (
            <div className="catalog__gallery--item">
              {img.mediaType === "image" ? (
                <div
                  className="content"
                  onClick={(e) => this.openModal(e)}
                  style={{ backgroundImage: `url(${img.url})` }}
                  data-id={ind}
                ></div>
              ) : (
                <div className="content" data-id={ind}>
                  <iframe width="100%" height="100%" src={img.url}></iframe>
                </div>
              )}
              <div className="itemOppositeSide">
                <span>{img.title}</span>
              </div>
              <button
                className="learnMoreBtn"
                data-id={ind}
                onClick={(e) => this.openModal(e)}
              >
                Read explanation
              </button>
            </div>
          ))}
          <Dialog
            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.state.open}
          >
            <DialogTitle id="customized-dialog-title">
              {this.state.modalImgInfo.title}
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                <span className="bold">Date: </span>
                {this.state.modalImgInfo.date}
              </Typography>
              <Typography gutterBottom className="modalExplanation">
                <span className="bold">Explanation: </span>
                {this.state.modalImgInfo.explanation}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={this.handleClose}
                className="closeModalBtn"
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  // monthImages: getMonthImgs(state),
});

const mapDispatchToProps = {
  getImgs: actions.getImgs,
  clearArray: actions.clearImgArray,
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
