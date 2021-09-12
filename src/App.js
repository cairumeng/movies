import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import CssBaseline from '@material-ui/core/CssBaseline'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import Discover from './pages/Discover'
import Genre from './pages/Genre'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

function App() {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <Header handleDrawerToggle={handleDrawerToggle} />
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <main className={classes.content}>
          <Switch>
            <Redirect exact from="/" to="/discoveries/popular" />
            <Route path="/discoveries/:type" component={Discover} />
            <Route path="/genres/:id/:name" component={Genre} />
          </Switch>
        </main>
      </Router>
    </div>
  )
}

export default App
