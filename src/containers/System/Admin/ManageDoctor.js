import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import { LANGUAGES, CRUD } from "../../../utils";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { getDoctorDetailById } from "../../../services/userService";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //MARKDOWN TABLE DB
      selectedOption: null,
      contentHtml: "",
      contentMarkdown: "",
      description: "",
      listDoctors: [],
      hasOldData: false,
      //DOCTOR INFO TABLE
      //display to select option
      listPrice: [],
      listPayment: [],
      listProvince: [],
      // import to db
      addressClinic: "",
      nameClinic: "",
      note: "",
      //Selected
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
    };
  }

  componentDidMount() {
    this.props.getAllDoctors();
    this.props.getAllInfoDoctors();
  }
  componentDidUpdate(prevProps, preState) {
    if (this.props.listDoctorsRedux !== prevProps.listDoctorsRedux) {
      let dataSelect = this.handleProcessInputData(
        this.props.listDoctorsRedux,
        "USER"
      ).reverse();
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (this.props.language !== prevProps.language) {
      let dataSelect = this.handleProcessInputData(
        this.props.listDoctorsRedux,
        "USER"
      ).reverse();
      let { listPrice, listPayment, listProvince } = this.props.listInfoDoctors;
      let priceData = this.handleProcessInputData(listPrice, "PRICE");
      let paymentData = this.handleProcessInputData(listPayment, "PAYMENT");
      let provinceData = this.handleProcessInputData(listProvince, "PROVINCE");
      this.setState({
        listDoctors: dataSelect,
        listPrice: priceData,
        listPayment: paymentData,
        listProvince: provinceData,
      });
    }
    if (this.props.listInfoDoctors !== prevProps.listInfoDoctors) {
      let { listPrice, listPayment, listProvince } = this.props.listInfoDoctors;
      let priceData = this.handleProcessInputData(listPrice, "PRICE");
      let paymentData = this.handleProcessInputData(listPayment, "PAYMENT");
      let provinceData = this.handleProcessInputData(listProvince, "PROVINCE");
      this.setState({
        listPrice: priceData,
        listPayment: paymentData,
        listProvince: provinceData,
      });
    }
  }
  handleProcessInputData = (dataInput, type) => {
    let result = [];
    let { language } = this.props;
    if (dataInput && dataInput.length > 0) {
      dataInput.map((item, index) => {
        if (type === "USER") {
          let Object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          Object.value = item.id;
          Object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          result.push(Object);
        } else {
          if (type === "PRICE") {
            let Object = {};
            let labelVi = item.valueVi;
            let labelEn = `${item.valueEn} $`;
            Object.value = item.keyMap;
            Object.label = language === LANGUAGES.VI ? labelVi : labelEn;
            result.push(Object);
          }
          if (type === "PAYMENT" || type === "PROVINCE") {
            let Object = {};
            let labelVi = item.valueVi;
            let labelEn = item.valueEn;
            Object.value = item.keyMap;
            Object.label = language === LANGUAGES.VI ? labelVi : labelEn;
            result.push(Object);
          }
        }
      });
    }
    return result;
  };
  handleEditorChange = ({ html, text }) => {
    console.log("handleEditorChange", html, text);
    this.setState({
      contentHtml: html,
      contentMarkdown: text,
    });
  };
  handleOnchangeSelect = async (selectedOption) => {
    let doctorId = selectedOption.value;
    if (doctorId) {
      let res = await getDoctorDetailById(doctorId);
      let nameClinic = "",
        addressClinic = "",
        note = "",
        selectedPrice = "",
        selectedPayment = "",
        selectedProvince = "";
      if (res && res.errCode === 0 && res.data.Doctor_info) {
        nameClinic = res.data.Doctor_info.nameClinic;
        addressClinic = res.data.Doctor_info.addressClinic;
        note = res.data.Doctor_info.note;
        let { listPrice, listPayment, listProvince } = this.state;
        selectedPrice = listPrice.find((item) => {
          return item && item.value === res.data.Doctor_info.priceId;
        });
        selectedPayment = listPayment.find((item) => {
          return item && item.value === res.data.Doctor_info.paymentId;
        });
        selectedProvince = listProvince.find((item) => {
          return item && item.value === res.data.Doctor_info.provinceId;
        });
      }
      if (res && res.errCode === 0 && res.data.Markdown) {
        this.setState({
          contentHtml: res.data.Markdown.contentHtml,
          contentMarkdown: res.data.Markdown.contentMarkdown,
          description: res.data.Markdown.description,
          hasOldData: true,
          nameClinic: nameClinic,
          addressClinic: addressClinic,
          note: note,
          selectedPrice: selectedPrice,
          selectedPayment: selectedPayment,
          selectedProvince: selectedProvince,
        });
      } else {
        this.setState({
          contentHtml: "",
          contentMarkdown: "",
          description: "",
          hasOldData: false,
          nameClinic: "",
          addressClinic: "",
          note: "",
          selectedPrice: "",
          selectedPayment: "",
          selectedProvince: "",
        });
      }
    }
    this.setState({
      selectedOption,
    });
  };
  handleOnchangeSelectInfoDoctor = (selectedOption, name) => {
    let nameInput = name.name;
    let copyState = { ...this.state };
    copyState[nameInput] = selectedOption;
    this.setState({
      ...copyState,
    });
  };
  handleOnchangeText = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleSaveMarkdown = () => {
    let { hasOldData } = this.state;
    let res = this.props.createInfoDoctor({
      doctorId: this.state.selectedOption.value,
      contentHtml: this.state.contentHtml,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      action: hasOldData === true ? CRUD.EDIT : CRUD.ADD,
      //data info Doctor
      addressClinic: this.state.addressClinic,
      nameClinic: this.state.nameClinic,
      note: this.state.note,
      //Selected
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
    });

    if (res.errCode === 0) {
      this.setState({
        selectedPrice: "",
        selectedPayment: "",
        selectedProvince: "",

        contentHtml: "",
        contentMarkdown: "",
        description: "",
        addressClinic: "",
        nameClinic: "",
        note: "",
      });
    }
  };

  //======================RENDER====================
  render() {
    let { hasOldData } = this.state;
    console.log("Check state data", this.state);
    return (
      <div className="user-container container">
        <div className="title mb-3">QU???N L?? TH??NG TIN B??C S?? </div>
        <div className="row">
          <div className="col-6">
            <label className="mb-3 lb-doctor">Ch???n b??c s??</label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleOnchangeSelect}
              options={this.state.listDoctors}
            />
          </div>
          <div className="col-6">
            <label className="mb-3 lb-intro">Th??ng tin gi???i thi???u</label>
            <textarea
              cols="30"
              rows="5"
              className="form-control"
              value={this.state.description}
              onChange={(e) => this.handleOnchangeText(e, "description")}
            ></textarea>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-4">
            <label>Gi?? kh??m b???nh</label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleOnchangeSelectInfoDoctor}
              options={this.state.listPrice}
              placeholder={"Nh???p gi?? kh??m b???nh"}
              name={"selectedPrice"}
            />
          </div>
          <div className="col-4">
            <label>Ph????ng th???c thanh to??n</label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleOnchangeSelectInfoDoctor}
              options={this.state.listPayment}
              placeholder={"Ch???n..."}
              name={"selectedPayment"}
            />
          </div>
          <div className="col-4">
            <label>Ch???n t???nh th??nh</label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleOnchangeSelectInfoDoctor}
              options={this.state.listProvince}
              placeholder={"Ch???n..."}
              name={"selectedProvince"}
            />
          </div>
          <div className="col-4">
            <label>T??n ph??ng kh??m</label>
            <input
              type="text"
              className="form-control"
              value={this.state.nameClinic}
              onChange={(e) => this.handleOnchangeText(e, "nameClinic")}
            />
          </div>
          <div className="col-4">
            <label>?????a ch??? ph??ng kh??m</label>
            <input
              type="text"
              className="form-control"
              value={this.state.addressClinic}
              onChange={(e) => this.handleOnchangeText(e, "addressClinic")}
            />
          </div>
          <div className="col-4">
            <label>Ghi ch??</label>
            <input
              type="text"
              className="form-control"
              value={this.state.note}
              onChange={(e) => this.handleOnchangeText(e, "note")}
            />
          </div>
        </div>
        <div className="doctor-markdown">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
          <button
            className={
              hasOldData
                ? "btn btn-primary mt-3 mb-5 px-2 py-1"
                : "btn btn-warning mt-3 mb-5 px-2 py-1"
            }
            onClick={() => this.handleSaveMarkdown()}
          >
            {hasOldData ? "L??u th??ng tin" : "Th??m th??ng tin"}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listDoctorsRedux: state.admin.listDoctors,
    listInfoDoctors: state.admin.listInfoDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    createInfoDoctor: (info) => dispatch(actions.createInfoDoctorStart(info)),
    getAllInfoDoctors: () => dispatch(actions.fetchAllInfoDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
