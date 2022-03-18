import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Button } from "reactstrap";
import _ from "lodash";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: 0,
      roleId: 0,
    };
  }
  componentDidMount() {
    let user = this.props.currentUser;
    console.log(user);
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "hardcode",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phoneNumber: user.phoneNumber,
        roleId: user.roleId,
        gender: user.gender,
      });
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  //Check validate user input
  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  //Check validate for input
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["firstName", "lastName", "address", "phoneNumber"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  //check is email input
  //   checkIsEmail = (email) => {
  //     const emailRegexp =
  //       /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  //     let isEmail = emailRegexp.test(email);
  //     return isEmail;
  //   };
  handleSaveUser = () => {
    // let isEmail = this.checkIsEmail(this.state.email);
    let isValid = this.checkValidateInput(); // goi ham kiem tra validate
    if (isValid === true) {
      //call API
      this.props.editUser(this.state); // truyen data tu children sang parent
    }
  };
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-user-container"}
        centered
        size="md"
      >
        <ModalHeader toggle={() => this.toggle()}>Edit User</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-6 from-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.email}
                  name="email"
                  disabled
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "email");
                  }}
                />
              </div>
              <div className="col-6 from-group">
                <label>Password</label>
                <input
                  type="password"
                  disabled
                  className="form-control"
                  value={this.state.password}
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "password");
                  }}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-6 from-group">
                <label>First name</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.firstName}
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "firstName");
                  }}
                />
              </div>
              <div className="col-6 from-group">
                <label>Last name</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.lastName}
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "lastName");
                  }}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12 form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.address}
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "address");
                  }}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-6 form-group">
                <label>Phone number</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.phoneNumber}
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "phoneNumber");
                  }}
                />
              </div>
              <div className="col-3 form-group">
                <label>Gender</label>
                <select
                  className="form-control"
                  value={this.state.gender}
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "gender");
                  }}
                >
                  <option value="0" key="">
                    Male
                  </option>
                  <option value="1" key="">
                    Female
                  </option>
                </select>
              </div>
              <div className="col-3 form-group">
                <label>Role</label>
                <select
                  className="form-control"
                  value={this.state.roleId}
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "roleId");
                  }}
                >
                  <option value="0" key="">
                    Admin
                  </option>
                  <option value="1" key="">
                    Doctor
                  </option>
                  <option value="2" key="">
                    Patient
                  </option>
                </select>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="btn btn-primary px-3"
            onClick={() => this.handleSaveUser()}
          >
            Update
          </Button>
          <Button
            color="secondary"
            className="btn btn-danger px-3"
            onClick={() => this.toggle()}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
