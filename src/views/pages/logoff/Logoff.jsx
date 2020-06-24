import React, { Component } from "react";

import cookie from "react-cookies";

export default class Logoff extends Component {
  constructor(props) {
    super(props);

    console.log("Logging of now");
    fetch("/api/logoff", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("200");
          console.log(res);
        } else {
          console.log(res);
          console.log("other");
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error logging OFF please try again");
      });
    this.props.history.push("/");
  }

  render() {
    return null;
  }
}
