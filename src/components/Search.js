import React, { useState } from 'react'
import InputBase from '@material-ui/core/InputBase'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: '50px',
    border: `2px solid ${theme.palette.primary.main}`,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    color: theme.palette.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '0',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

const Search = () => {
  const classes = useStyles()
  const history = useHistory()
  const [query, setQuery] = useState('')

  const searchHandler = (e) => {
    if (e.key === 'Enter') {
      history.push(`/search/${query}?page=1`)
    }
  }
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        onKeyDown={searchHandler}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}
export default Search
