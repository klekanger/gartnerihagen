import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const Layout = ({ children }) => (
  <>
    <h1>Dette er layout-komponenten</h1>
    {children}
  </>
);

export default Layout;
