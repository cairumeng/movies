import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import LensOutlined from '@material-ui/icons/LensOutlined'
import { ListSubheader, makeStyles, useTheme } from '@material-ui/core'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { CalendarToday, Favorite, Poll } from '@material-ui/icons'
import { yellow } from '@material-ui/core/colors'
import { Link } from 'react-router-dom'

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}))

const Sidebar = ({ handleDrawerToggle, mobileOpen }) => {
  const theme = useTheme()
  const classes = useStyles()
  const [genres, setGenres] = useState([])
  useEffect(() => {
    axios.get('/genre/movie/list').then((response) => {
      console.log(response.data.genres)
      setGenres(response.data.genres)
    })
  }, [])

  const drawer = (
    <>
      <div className={classes.toolbar} />

      <List>
        <ListSubheader component="li" disableSticky>
          Discover
        </ListSubheader>
        {[
          {
            name: 'Popular',
            icon: <Favorite color="error" />,
            slug: 'popular',
          },
          {
            name: 'Top Rated',
            icon: <Poll style={{ color: yellow[800] }} />,
            slug: 'top_rated',
          },
          {
            name: 'Upcoming',
            icon: <CalendarToday color="primary" />,
            slug: 'upcoming',
          },
        ].map((item) => (
          <ListItem
            button
            key={item.name}
            component={Link}
            to={`/discoveries/${item.slug}`}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>

      <List>
        <ListSubheader component="li" disableSticky>
          Genres
        </ListSubheader>
        {genres.map((genre) => (
          <ListItem button key={genre.id}>
            <ListItemIcon>
              <LensOutlined fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={genre.name}
              component={Link}
              to="/categories/popular"
            />
          </ListItem>
        ))}
      </List>
    </>
  )

  return (
    <nav className={classes.drawer}>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  )
}

export default Sidebar
