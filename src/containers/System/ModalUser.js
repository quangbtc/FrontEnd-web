import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Button } from "reactstrap";
import { emitter } from "../../utils/emitter";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: 0,
      roleId: 0,
    };
    this.listenToEmitter();
  }

  listenToEmitter = () => {
    emitter.on("CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        gender: 0,
        roleId: 0,
      });
    });
  };
  componentDidMount() {}

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
    let arrInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
    ];
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
  checkIsEmail = (email) => {
    const emailRegexp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    let isEmail = emailRegexp.test(email);
    return isEmail;
  };
  handleAddNewUser = () => {
    let isEmail = this.checkIsEmail(this.state.email);
    let isValid = this.checkValidateInput(); // goi ham kiem tra validate
    if (isValid === true) {
      //check isEmail
      if (isEmail) {
        this.props.createNewUser(this.state); // truyen data tu children sang parent
      } else {
        alert("Email input isn't an email.");
      }
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
        <ModalHeader toggle={() => this.toggle()}>Create New User</ModalHeader>
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
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "email");
                  }}
                />
              </div>
              <div className="col-6 from-group">
                <label>Password</label>
                <input
                  type="password"
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
              <div className="col-6 from-group">
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
                <label>Sex</label>
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
            onClick={() => this.handleAddNewUser()}
          >
            Add new
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
