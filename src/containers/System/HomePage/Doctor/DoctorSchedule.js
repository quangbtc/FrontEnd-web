import React, { Component } from "react";
import { connect } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../../../Header/Header";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { LANGUAGES, dateFormat } from "../../../../utils";
import * as actions from "../../../../store/actions";
import "react-datepicker/dist/react-datepicker.css";
import "./DoctorSchedule.scss";
import { toast } from "react-toastify";
import moment from "moment";
import { createDoctorScheduleService } from "../../../../services/userService";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      startDate: "",
      listDoctor: [],
      rangeTime: [],
    };
  }
  componentDidMount() {
    this.props.getAllDoctors();
    this.props.getRangeTime();
  }
  componentDidUpdate(prevProps) {
    if (this.props.listDoctorsRedux !== prevProps.listDoctorsRedux) {
      let dataSelect = this.handleProcessInputData(
        this.props.listDoctorsRedux
      ).reverse();
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (this.props.language !== prevProps.language) {
      let dataSelect = this.handleProcessInputData(
        this.props.listDoctorsRedux
      ).reverse();
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (this.props.rangeTime !== prevProps.rangeTime) {
      let data = this.props.rangeTime;

      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        rangeTime: data,
      });
    }
  }
  handleOnClickTime = (time) => {
    let { rangeTime } = this.state;

    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };
  handleProcessInputData = (dataInput) => {
    let result = [];
    let { language } = this.props;
    if (dataInput && dataInput.length > 0) {
      dataInput.map((item, index) => {
        let Object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        Object.value = item.id;
        Object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        result.push(Object);
      });
    }
    return result;
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };
  handleSaveSchedule = async () => {
    let { selectedOption, startDate, rangeTime } = this.state;
    let formatTime = new Date(startDate).getTime().toString();
    console.log("Check type", typeof formatTime);
    let result = [];
    if (!selectedOption) {
      toast.warn("Invalid input !");
      return;
    }
    if (!startDate) {
      toast.warn("Invalid date !");
      return;
    }
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule) => {
          let Object = {};
          Object.doctorId = selectedOption.value;
          Object.date = formatTime;
          Object.timeType = schedule.keyMap;
          result.push(Object);
        });
      } else {
        toast.warn("Invalid input Selected time !");
        return;
      }
    }

    let res = await createDoctorScheduleService({
      arrSchedule: result,
      doctorId: selectedOption.value,
      date: formatTime,
    });
    if (res && res.errCode === 0) {
      toast.success("Create data successfully");
    } else if (res && res.errCode === 2) {
      toast.warning("Data already exits");
    } else {
      toast.warning("Create data fail");
    }
  };
  render() {
    const { selectedOption, startDate, listDoctors, rangeTime } = this.state;

    let { language } = this.props;
    return (
      <>
       
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="title">QUẢN LÝ LỊCH KHÁM BỆNH </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={listDoctors}
              />
            </div>
            <div className="col-6">
              <DatePicker
                selected={startDate}
                onChange={(date) => this.setState({ startDate: date })}
                className="form-control"
                dateFormat="dd/MM/yyyy"
                // showTimeSelect
                // timeClassName={() => this.handleColor}
                minDate={new Date()}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 mt-5">
              <div className="doctor-schedule-container">
                {rangeTime &&
                  rangeTime.map((item, index) => {
                    return (
                      <button
                        className={
                          item.isSelected === true
                            ? "btn active"
                            : "btn btn-info "
                        }
                        key={index}
                        onClick={() => this.handleOnClickTime(item)}
                      >
                        {language === LANGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
          <button
            className="btn btn-primary mt-5 px-3"
            onClick={() => this.handleSaveSchedule()}
          >
            Lưu thông tin
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    listDoctorsRedux: state.admin.listDoctors,
    rangeTime: state.admin.rangeTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    getRangeTime: () => dispatch(actions.fetchTimeCodeStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
