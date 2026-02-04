import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Products from './pages/Products'
import MainLayouts from './layouts/MainLayouts'
import Cart from './pages/Cart'
import ProductDetail from './pages/ProductDetail'
import ProtectedRoute from './routes/ProtectedRoute'
import Checkout from './pages/Checkout'
function App() {

  return (

    <Routes>
      <Route path='/' element={<MainLayouts />} >
        <Route index element={<Home />} />
        <Route path='Products' element={<Products />} />
        <Route path='products/:id' element={<ProductDetail />} />
        <Route path='Login' element={<Login />} />
        <Route path='SignUp' element={<SignUp/>}/>
        <Route path='Cart' element={<Cart />} />
        <Route path='/Checkout' element={
          <ProtectedRoute>
            <Checkout/>
          </ProtectedRoute>
        }/>
      </Route>
    </Routes>
  )
}

export default App
