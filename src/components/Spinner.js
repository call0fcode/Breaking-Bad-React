import React from 'react';
import PropTypes from 'prop-types';
import './Spinner.css';

const Spinner = ({ cargando }) => {
  return cargando ? (
    <div className="spinner">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  ) : null;
};

Spinner.propTypes = {
  cargando: PropTypes.bool.isRequired,
};

export default Spinner;
