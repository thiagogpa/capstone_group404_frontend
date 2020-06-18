import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <a href="http://www.wall-upcarpentry.ca/" target="_blank" rel='noopener noreferrer'>
        Wall-up Carpentry
      </a>
      &copy; 2020.
    </CFooter>
  );
};

export default React.memo(TheFooter);
