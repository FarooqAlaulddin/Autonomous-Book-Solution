import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({

  root: props =>  ({
    borderRadius: '2px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420,
    border: props===true ? '1px solid #6f809a': ''

  }),
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px'
  }
}));


const SearchInput = props => {
  const { className, onChange, style, ...rest } = props;

  const input = useRef(null);
  const [isFocused, setisFocused] = useState(false);
  const classes = useStyles(isFocused);

  const handleOnFocus = () =>{
      setisFocused(true);
  }

  const handleOnBlur = () =>{
      setisFocused(false);
  }

  return (
    <div>
      <Paper
        {...rest}
        className={clsx(classes.root, className)}
        style={style}
      >
        <SearchIcon className={classes.icon} />
        <Input
          {...rest}
          ref={input}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          className={classes.input}
          disableUnderline
          onChange={onChange}
          placeholder='Search..'
        />
      </Paper>
    </div>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object
};

export default SearchInput;
