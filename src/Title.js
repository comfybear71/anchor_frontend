import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

export default function Title(props) {
  return (
    <Typography gutterBottom variant="h5" component="h4">
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node
};
