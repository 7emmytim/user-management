import { lazy, Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { fetchUsers } from './features/userSlice'

const HomePage = lazy(() => import('./pages/HomePage'))
const FormPage = lazy(() => import('./pages/FormPage'))

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading app...</div>}>
          <Routes>
            <Route path={'/'} element={<HomePage />} />
            <Route path={'add'} element={<FormPage />} />
            <Route path={'edit/:id'} element={<FormPage />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
