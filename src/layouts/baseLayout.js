import React from "react";
import { PageWrapper } from "../components";
const BaseLayout = ({ children }) => {
  return (
    <div>
      <PageWrapper>{children}</PageWrapper>
    </div>
  );
};

export default BaseLayout;
