import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Footer from './components/Layouts/Footer';
import Header from './components/Layouts/Header';
import Products from './components/Product/products';
import ProductList from './components/Product/ProductList';
import Carting from './components/Carting/Carting';
import Profile from './components/Profile/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { checkAuthToken } from './store/apis/mainApis';
import { loadUser } from './store/apis/loginApis';
import ProtectedRoute from './components/Route/ProtectedRoute';
import AddressCard from './components/Layouts/AddressCard';
import Loader from './components/UI/Loader/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Layout from './components/Layouts/Layout';

function App() {
  const token = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.main);
  const { isAuthenticated, register } = useSelector((state) => state.login);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const initialActivity = async () => {
      try {
        if (token !== null) {
          setLoader(true);
          await dispatch(checkAuthToken({ token }));
          await dispatch(loadUser({ token }));
          setLoader(false);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoader(false);
      }
    };

    initialActivity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (error === "TOKEN_INVALID") navigate("/", { replace: true });
  }, [error, navigate]);


  if(loader) return <Loader visible={loader} />
  return (
    <div className="App">
      <ToastContainer theme="dark" />

        <Routes>
          <Route path='/' element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path='/branches/:id?' element={< Products />}>
                <Route path='subcategories/:id' element={< ProductList />}/>
            </Route>
            <Route path='/cart' element ={<Carting />} />
            <Route path='/cart/:id' element={<AddressCard/>} />
            <Route  path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Route>
            <Route path="*" element={<PageNotFound/>} />
        </Routes> 
    </div>
  );
}

export default App;
