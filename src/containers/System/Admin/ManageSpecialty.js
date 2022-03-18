import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { CommonUtils } from "../../../utils";
import "./ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Lightbox from "react-image-lightbox";
import { createSpecialtyService } from "../../../services/specialtyService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: "",
      image: "",
      isOpen: false,
      specialtyName: "",
      descriptionHtml: "",
      descriptionMarkdown: "",
    };
  }
  async componentDidMount() {}
  componentDidUpdate() {}
  handleClickInputFile = () => {
    document.getElementById("image").click();
  };
  handleOnPrevViewImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      const objectUrl = URL.createObjectURL(file);
      if (objectUrl) {
        this.setState({
          avatar: objectUrl,
          image: base64,
        });
      }
    }
  };
  openPreviewImage = () => {
    if (this.state.avatar) {
      this.setState({
        isOpen: true,
      });
    }
  };
  onClickCloseImage = () => {
    this.setState({
      avatar: "",
      image: "",
    });
  };
  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleEditorChange = ({ html, text }) => {
    console.log("handleEditorChange", html, text);
    this.setState({
      descriptionHtml: html,
      descriptionMarkdown: text,
    });
  };
  handleSaveSpecialty = async () => {
    let message = await createSpecialtyService({
      image: this.state.image,
      specialtyName: this.state.specialtyName,
      descriptionHtml: this.state.descriptionHtml,
      descriptionMarkdown: this.state.descriptionMarkdown,
    });
    if (message && message.errCode === 0) {
      toast.success("Create specialty succeed !");
      this.setState({
        avatar: "",
        image: "",
        isOpen: false,
        specialtyName: "",
        descriptionHtml: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.warn("Error from server !");
      console.log("Check error from server :", message);
    }
    console.log("Check data send", this.state);
  };

  render() {
    return (
      <>
        <div className="manage-specialty-container">
          <div className="specialty-title">QUẢN LÝ PHÒNG KHÁM</div>
          <div className="specialty-wrapper row">
            <div className="col-6 form-group">
              <label className="specialty-label">Tên phòng khám</label>
              <input
                type="text"
                className="form-control"
                value={this.state.specialtyName}
                onChange={(event) =>
                  this.handleOnchangeInput(event, "specialtyName")
                }
              />
            </div>
            <div className="col-6 form-group">
              <label className="specialty-label">Hình ảnh phòng khám</label>
              <button
                className="btn btn-outline-success px-2 d-block"
                onClick={() => this.handleClickInputFile()}
              >
                <FormattedMessage id="user-redux.image" />
                <i className="fas fa-upload mx-3"></i>
              </button>
              {this.state.avatar && (
                <div className="preview-avatar">
                  <i
                    className="fas fa-times icon-close"
                    onClick={() => this.onClickCloseImage()}
                  ></i>
                  <img
                    src={this.state.avatar}
                    alt=""
                    style={{
                      width: "100px",
                      height: "auto",
                      marginTop: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => this.openPreviewImage()}
                  />
                </div>
              )}
              <input
                type="file"
                id="image"
                style={{ display: "none" }}
                onChange={(e) => this.handleOnPrevViewImage(e)}
              />
              {this.state.isOpen && (
                <Lightbox
                  mainSrc={this.state.avatar}
                  onCloseRequest={() => this.setState({ isOpen: false })}
                />
              )}
            </div>
          </div>
          <div className="specialty-markdown">
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div className="btn-save-specialty">
            <button onClick={() => this.handleSaveSpecialty()}>Save</button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
