import { BrowserRouter, Route, NavLink } from "react-router-dom";
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Navigation.css";

export default function ProfileButton() {
  return (
    <div style={{ color: "rgba(155, 255, 200, .9)", fontSize: "50px" }}>
      <i className="fa-solid fa-flag-checkered"></i>
    </div>
  );
}

