import React, { Component } from "react";

import cookie from "react-cookies";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log("click");
    let userId = "thiago";
    //cookie.save("userId", userId, { path: "/" });
    document.cookie = "cookiename=token ; expires = Thu, 01 Jan 1970 00:00:00 GMT"

    //cookie.remove("token");
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
