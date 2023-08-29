import { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import MyLayout from "./components/MyLayout/MyLayout";
import Register from "./components/User/Register";
import Home from "./components/Home/Home";
import Login from "./components/User/Login";
import { useDispatch, useSelector } from "react-redux";
import Account from "./components/Account/Account";
import MyForm from "./components/MyForm/MyForm";
import OtherForm from "./components/OtherForm/OtherForm";
import MyDate from "./components/MyDate/MyDate";
import About from "./components/About/About";
import Feedback from "./components/Feedback/Feedback";

import Admin from "./components/Admin/Admin";


import OneDate from "./components/OneDate/OneDate";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProtectedRouteNoAuth from "./components/ProtectedRoute/ProtectedRouteNoAuth";
import ProtectedRouteAdmin from "./components/ProtectedRoute/ProtectedRouteAdmin";
import NotFound from "./components/ProtectedRoute/NotFound";



function App() {

  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((state: any) => state.UserReducer.name)

  useEffect(() => {
    (async function () {
      const response = await fetch("http://77.222.53.7:3003/user", {
        credentials: "include",
      });
      const result = await response.json();
      console.log('1111111111111111111111111', result)
      if (result.name) {
        
        dispatch({ type: "SAVE_USER", payload: {name: result.name, img: result.img || null, phone: result.phone} });
      }
    })();
  }, []);

  return (

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
        <MyLayout>
      <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<ProtectedRoute user={user} redirectTo={'/'}/>}>

              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
         </Route>


         <Route element={<ProtectedRouteNoAuth user={user} redirectTo={'/'}/>}>
          <Route path="/account" element={<Account />} />
          <Route path="/form" element={<MyForm />} />
          <Route path="/partner" element={<OtherForm />} />
        </Route>
         

          <Route path="/date">
            <Route index element={<MyDate />} />
            <Route path=":id">
              <Route index element={<OneDate />} />
            </Route>
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<Feedback />} />

          <Route element={<ProtectedRouteAdmin user={user} redirectTo={'/'}/>}>
          <Route path="/profileAdmin" element={<Admin />} />
          </Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
        </MyLayout>
  
  )
}

export default App;
