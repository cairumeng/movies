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
import Movie from './pages/Movie'
import Person from './pages/Person'
import SearchResult from './pages/SearchResult'

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <div className="flex">
      <Router>
        <CssBaseline />
        <Header handleDrawerToggle={handleDrawerToggle} />
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <main className="flex-grow p-3 mt-16">
          <Switch>
            <Redirect exact from="/" to="/discoveries/popular" />
            <Route path="/discoveries/:type" component={Discover} />
            <Route path="/genres/:id/:name" component={Genre} />
            <Route path="/movies/:id" component={Movie} />
            <Route path="/persons/:id" component={Person} />
            <Route path="/search/:query" component={SearchResult} />
          </Switch>
        </main>
      </Router>
    </div>
  )
}

export default App
