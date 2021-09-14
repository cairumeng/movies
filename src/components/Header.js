import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Search from './Search'
import { makeStyles } from '@material-ui/core'

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}))

const Header = ({ handleDrawerToggle }) => {
  const classes = useStyles()
  return (
    <AppBar
      position="absolute"
      className={classes.appBar}
      color="transparent"
      elevation={0}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <div className="flex justify-end w-full">
          <Search />
        </div>
      </Toolbar>
    </AppBar>
  )
}
export default Header
