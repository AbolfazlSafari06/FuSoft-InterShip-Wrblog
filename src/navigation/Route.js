import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const RouteWrapper = ({
  auth,
  guest,
  admin,
  user,
  children,
  ...otherProps
}) => {
  const login = !!user?.token;
  const isAdmin = !!user?.isAdmin;

  if ((auth || admin) && !login) {
    return <Redirect to="/auth/login" />;
  }
  if (admin && !isAdmin) {
    return <Redirect to="/" />;
  }
  if (guest && login) {
    return <Redirect to="/" />;
  }

  return <Route {...otherProps}>{children}</Route>;
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(RouteWrapper);

RouteWrapper.propTypes = {
  auth: PropTypes.bool,
  guest: PropTypes.bool,
};

RouteWrapper.defaultProps = {
  auth: false,
  guest: false,
};
