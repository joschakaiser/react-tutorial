import React from 'react';
import PropTypes from 'prop-types';
import styles from './Square.module.css';

// const Square = () => (
//   <div className={styles.Square} data-testid="Square">
//     Square Component
//   </div>
// );

// Square.propTypes = {};

// Square.defaultProps = {};

function Square(props){
    return (
      <button 
        className="square" 
        onClick={props.onClick}
      >
        {props.value}
      </button>
    );
  }


export default Square;
