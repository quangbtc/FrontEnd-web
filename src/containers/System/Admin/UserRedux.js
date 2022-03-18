import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./UserRedux.scss";
import TableUser from "./TableUser";
import { emitter } from "../../../utils/emitter";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      img: "",
      isOpen: false, //VIEW IMAGE
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      roleId: "",
      positionId: "",
      gender: "",
      image: "",
      action: "",
      userId: "",
    };
    this.listenToEmitter();
    this.myRef = React.createRef();
  }
  handleScrollToTop = () => {
    document.getElementById("createUser").scrollIntoView({
      behavior: "smooth",
    });
  };
  listenToEmitter = () => {
    emitter.on("SCROLL_TO_TOP", this.handleScrollToTop);
  };
  handleClickInputFile = () => {
    document.getElementById("image").click();
  };

  async componentDidMount() {
    // try {
    //   let res = await getAllCodeService("gender");
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       genderArr: res.data,
    //     });
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
    this.props.getFetchGenderStart();
    this.props.getFetchPositionStart();
    this.props.getFetchRoleStart();
    this.myRef.current.scrollTo(0, 0);
  }
  //WHEN COMPONENT CHANGE DATA WIL UPDATE
  componentDidUpdate(prevProps, prevState, snapshot) {
    // Typical usage (don't forget to compare props):
    if (this.props.genderRedux !== prevProps.genderRedux) {
      let genderArr = this.props.genderRedux;
      this.setState({
        genderArr: genderArr,
        gender: genderArr && genderArr.length > 0 ? genderArr[0].keyMap : "",
      });
    }
    if (this.props.positionRedux !== prevProps.positionRedux) {
      let positionArr = this.props.positionRedux;
      this.setState({
        positionArr: positionArr,
        positionId:
          positionArr && positionArr.length > 0 ? positionArr[0].keyMap : "",
      });
    }
    if (this.props.roleRedux !== prevProps.roleRedux) {
      let roleArr = this.props.roleRedux;
      this.setState({
        roleArr: roleArr,
        roleId: roleArr && roleArr.length > 0 ? roleArr[0].keyMap : "",
      });
    }
    if (this.props.listUsers !== prevProps.listUsers) {
      let genderArr = this.props.genderRedux;
      let positionArr = this.props.positionRedux;
      let roleArr = this.props.roleRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        img: "",
        roleId: roleArr && roleArr.length > 0 ? roleArr[0].keyMap : "",
        positionId:
          positionArr && positionArr.length > 0 ? positionArr[0].keyMap : "",
        gender: genderArr && genderArr.length > 0 ? genderArr[0].keyMap : "",
        action: CRUD.ADD,
      });
    }
  }
  //PREVIEW IMAGE
  handleOnPrevViewImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      const objectUrl = URL.createObjectURL(file);
      if (objectUrl) {
        this.setState({
          img: objectUrl,
          image: base64,
        });
      }
    }
  };
  openPreviewImage = () => {
    if (this.state.img) {
      this.setState({
        isOpen: true,
      });
    }
  };
  onClickCloseImage = () => {
    this.setState({
      img: "",
      image: "",
    });
  };
  //TWO WAY BIDING INPUT
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkValidateUserInput = () => {
    let isValid = true;
    let arrayInput = [
      "email",
      "lastName",
      "firstName",
      "password",
      "address",
      "phoneNumber",
    ];
    for (let i = 0; i < arrayInput.length; i++) {
      if (!this.state[arrayInput[i]]) {
        isValid = false;
        alert(`${arrayInput[i]} is required parameter !`);
        break;
      }
    }
    return isValid;
  };
  checkIsEmail = (email) => {
    const emailRegexp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    let isEmail = emailRegexp.test(email);
    return isEmail;
  };
  //WHEN CLICK SUBMIT
  handleSaveUser = () => {
    let isValid = this.checkValidateUserInput();
    let isEmail = this.checkIsEmail(this.state.email);
    let actions = this.state.action;
    //CREATE USER
    if (actions === CRUD.ADD) {
      if (isValid) {
        //check isEmail
        if (isEmail) {
          //Call redux Api
          this.props.createUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            roleId: this.state.roleId,
            positionId: this.state.positionId,
            gender: this.state.gender,
            image: this.state.image,
          }); // truyen data tu children sang parent
        } else {
          alert("Email input isn't an email.");
        }
      }
    }
    //UPDATE USER
    if (actions === CRUD.EDIT) {
      if (isValid) {
        // call redux api
        this.props.editUserRedux({
          id: this.state.userId,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phoneNumber: this.state.phoneNumber,
          address: this.state.address,
          roleId: this.state.roleId,
          positionId: this.state.positionId,
          gender: this.state.gender,
          image: this.state.image,
        });
      }
    }
  };
  handleEditUserFormParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "Harcode",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      roleId: user.roleId,
      positionId: user.positionId,
      gender: user.gender,
      image: imageBase64,
      img: imageBase64,
      action: CRUD.EDIT,
      userId: user.id,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let language = this.props.language;
    let isLoadingGender = this.props.isLoadingGender;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;
    console.log("check roles", roles);
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      roleId,
      gender,
      positionId,
    } = this.state;

    return (
      <React.Fragment>
        <div id="createUser" className="container" ref={this.myRef}>
          <div className="row mt-3">
            <div className="col-6 mx-auto bg-light pb-4 pt-0 py-5 rounded">
              <div className="row bg-info rounded mb-3">
                <div className="title py-3 mt-0">
                  <FormattedMessage id="user-redux.add-new" />
                </div>
              </div>
              <div className="row">
                {isLoadingGender && <div className="loading">Loading</div>}
                <div className="form-group col-6 mx-auto">
                  <label>
                    {" "}
                    <FormattedMessage id="user-redux.email" />
                  </label>
                  <FormattedMessage
                    id="user-redux.placeholder-email"
                    defaultMessage=""
                  >
                    {(placeholder) => (
                      <input
                        className="form-control"
                        type="email"
                        placeholder={placeholder}
                        ref={(input) => {
                          this.nameInput = input;
                        }}
                        value={email}
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "email")
                        }
                        disabled={
                          this.state.action === CRUD.EDIT ? true : false
                        }
                      />
                    )}
                  </FormattedMessage>
                </div>
                <div className="form-group col-6 mx-auto">
                  <label>
                    {" "}
                    <FormattedMessage id="user-redux.password" />
                  </label>
                  <FormattedMessage
                    id="user-redux.placeholder-password"
                    defaultMessage=""
                  >
                    {(placeholder) => (
                      <input
                        className="form-control"
                        type="password"
                        placeholder={placeholder}
                        ref={(input) => {
                          this.nameInput = input;
                        }}
                        value={password}
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "password")
                        }
                        disabled={
                          this.state.action === CRUD.EDIT ? true : false
                        }
                      />
                    )}
                  </FormattedMessage>
                </div>
              </div>
              <div className="row mt-3">
                <div className="form-group col-6 mx-auto">
                  <div className="row">
                    <div className="col-6 form-group">
                      <label>
                        {" "}
                        <FormattedMessage id="user-redux.firstName" />
                      </label>
                      <FormattedMessage
                        id="user-redux.placeholder-firstName"
                        defaultMessage=""
                      >
                        {(placeholder) => (
                          <input
                            className="form-control"
                            type="text"
                            placeholder={placeholder}
                            ref={(input) => {
                              this.nameInput = input;
                            }}
                            value={firstName}
                            onChange={(event) =>
                              this.handleOnChangeInput(event, "firstName")
                            }
                          />
                        )}
                      </FormattedMessage>
                    </div>
                    <div className="col-6 form-group">
                      <label>
                        {" "}
                        <FormattedMessage id="user-redux.lastName" />
                      </label>
                      <FormattedMessage
                        id="user-redux.placeholder-lastName"
                        defaultMessage=""
                      >
                        {(placeholder) => (
                          <input
                            className="form-control"
                            type="text"
                            placeholder={placeholder}
                            ref={(input) => {
                              this.nameInput = input;
                            }}
                            value={lastName}
                            onChange={(event) =>
                              this.handleOnChangeInput(event, "lastName")
                            }
                          />
                        )}
                      </FormattedMessage>
                    </div>
                  </div>
                </div>
                <div className="form-group col-6 mx-auto">
                  <label>
                    {" "}
                    <FormattedMessage id="user-redux.phone-number" />
                  </label>
                  <FormattedMessage
                    id="user-redux.placeholder-phoneNumber"
                    defaultMessage=""
                  >
                    {(placeholder) => (
                      <input
                        className="form-control"
                        type="text"
                        placeholder={placeholder}
                        ref={(input) => {
                          this.nameInput = input;
                        }}
                        value={phoneNumber}
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "phoneNumber")
                        }
                      />
                    )}
                  </FormattedMessage>
                </div>
              </div>
              <div className="row mt-3">
                <div className="form-group col-12">
                  <label>
                    {" "}
                    <FormattedMessage id="user-redux.address" />
                  </label>
                  <FormattedMessage
                    id="user-redux.placeholder-address"
                    defaultMessage=""
                  >
                    {(placeholder) => (
                      <input
                        className="form-control"
                        type="text"
                        placeholder={placeholder}
                        ref={(input) => {
                          this.nameInput = input;
                        }}
                        value={address}
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "address")
                        }
                      />
                    )}
                  </FormattedMessage>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-4 form-group">
                  <label>
                    {" "}
                    <FormattedMessage id="user-redux.gender" />
                  </label>
                  <select
                    className="form-control"
                    value={gender}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "gender")
                    }
                  >
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return (
                          <option value={item.keyMap} key={index}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-4 form-group">
                  <label>
                    {" "}
                    <FormattedMessage id="user-redux.position" />
                  </label>
                  <select
                    className="form-control"
                    value={positionId}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "positionId")
                    }
                  >
                    {positions &&
                      positions.length > 0 &&
                      positions.map((item, index) => {
                        return (
                          <option value={item.keyMap} key={index}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-4 form-group">
                  <label>
                    {" "}
                    <FormattedMessage id="user-redux.role" />
                  </label>
                  <select
                    className="form-control"
                    value={roleId}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "roleId")
                    }
                  >
                    {roles &&
                      roles.length > 0 &&
                      roles.map((item, index) => {
                        return (
                          <option value={item.keyMap} key={index}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-4 form-group">
                  <button
                    className="btn btn-outline-success px-2"
                    onClick={() => this.handleClickInputFile()}
                  >
                    <FormattedMessage id="user-redux.image" />
                    <i className="fas fa-upload mx-3"></i>
                  </button>
                  {this.state.img && (
                    <div className="preview-img">
                      <i
                        className="fas fa-times icon-close"
                        onClick={() => this.onClickCloseImage()}
                      ></i>
                      <img
                        src={this.state.img}
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
                    className="form-control mt-2"
                    style={{ display: "none" }}
                    onChange={(e) => this.handleOnPrevViewImage(e)}
                  />
                </div>
              </div>
              <button
                className={
                  this.state.action === CRUD.EDIT
                    ? "btn btn-warning mt-3 py-2 w-100"
                    : "btn btn-primary mt-3 py-2 w-100"
                }
                onClick={() => this.handleSaveUser()}
              >
                {this.state.action === CRUD.EDIT ? (
                  <FormattedMessage id="user-redux.save-change" />
                ) : (
                  <FormattedMessage id="user-redux.submit" />
                )}
              </button>
            </div>
            {this.state.isOpen && (
              <Lightbox
                mainSrc={this.state.img}
                onCloseRequest={() => this.setState({ isOpen: false })}
              />
            )}
          </div>
          <div className="row">
            <div className="col-12">
              <TableUser
                handleEditUserFormParent={this.handleEditUserFormParent}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    isLoadingGender: state.admin.isLoadingGender,
    positionRedux: state.admin.positions,
    isLoadingPosition: state.admin.isLoadingPosition,
    roleRedux: state.admin.roles,
    isLoadingRole: state.admin.isLoadingRole,
    listUsers: state.admin.userArr,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFetchGenderStart: () => dispatch(actions.fetchGenderStart()),
    getFetchPositionStart: () => dispatch(actions.fetchPositionStart()),
    getFetchRoleStart: () => dispatch(actions.fetchRoleStart()),
    createUser: (data) => dispatch(actions.createUserStart(data)),
    getAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
    editUserRedux: (data) => dispatch(actions.editUserStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
