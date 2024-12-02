import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../actions'

import Header from './header'
import Landing from './landing'
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/surveys'>
            <Route index element={<Dashboard />} />
            <Route path='new' element={<SurveyNew />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
