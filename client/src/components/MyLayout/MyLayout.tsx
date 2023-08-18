import React, { useEffect } from "react";
import "./MyLayout.css";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Login from "../User/Login";
import Register from "../User/Register";
const { Header, Content, Sider, Footer } = Layout;
import { Routes, Route } from "react-router-dom";
import { Button, Dropdown } from "antd";
import MyDate from "../MyDate/MyDate";
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from '../Home/Home';
import Account from '../Account/Account'
import MyForm from '../MyForm/MyForm';
import OtherForm from '../OtherForm/OtherForm';
import About from '../About/About';
import Feedback from '../Feedback/Feedback';

import Admin from "../Admin/Admin";

import OneDate from "../OneDate/OneDate";


const items1: MenuProps['items'] = ['Login', 'Register', 'Home'].map((key) => ({
  key,
  label: `${key}`,
}));

// const items2: MenuProps['items'] = [HeartOutlined, UserOutlined, LaptopOutlined, NotificationOutlined].map(
//   (icon, index) => {
//     const key = String(index + 1);

//     return {
//       key: `sub${key}`,
//       icon: React.createElement(icon),
//       label: `Найти любовь ${key}`,

//       children: new Array(4).fill(null).map((_, j) => {
//         const subKey = index * 4 + j + 1;
//         return {
//           key: subKey,
//           label: `option${subKey}`,
//         };
//       }),
//     };
//   },
// );



const MyLayout: React.FC = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  // useEffect(() => {
  //   navigate('/home')
  // },[])

  const logoutHandler = async () => {
    try {
      const response = await fetch("http://localhost:3003/logout", {
        credentials: "include",
      });
      dispatch({ type: "LOGOUT_USER", payload: "" });
      navigate('/home')
    } catch (error) {
      console.log("Не смогли выйти", error);
    }
  };

  // const items: MenuProps['items'] = [
  //   {
  //     key: '1',
  //     label: (
  //       <Button onClick={() => navigate('/account')}>
  //         Профиль
  //       </Button>
  //     ),
  //   },
  //   {
  //     key: '2',
  //     label: (
  //       <Button onClick={logoutHandler}>
  //         Выход
  //       </Button>
  //     ),
  //   },
  // ];
  const dispatch = useDispatch()
  const user = useSelector((state: any) => state.UserReducer.name);
  const photo = useSelector((state:any) => state.UserReducer.img);

  

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: '8rem',
          // marginLeft: '10%',
          // marginTop: "0%"
        }}
      >
        {/* <div className="demo-logo" style={{backgroundColor:'white'}} /> */}
        {/* <Menu theme="dark" mode="horizontal"> */}
        {user ? 
        <>
          <img onClick={() => navigate("/")} src='/src/assets/logo2.png' style={{width:'90px', height:'72px', cursor: 'pointer'}}></img>
          <a href="tel:+79201083306">
          <Button className='layoutBtn'>Позвонить нам!</Button>
      
          </a>
          {/* <Dropdown overlayStyle={{display: "unset"}} menu={{ items }} placement="bottomRight"> */}
          <Button className='layoutBtn accBtn' onClick={() => navigate('/account')} style={{borderRadius:'50%', width:'72px', height:'72px', backgroundColor:'white', backgroundImage: `url("http://localhost:3003${photo}")`}}></Button>
          {/* </Dropdown> */}
        </>
        :
        <>
          <img src='/src/assets/logo2.png' onClick={() => navigate("/")} style={{width:'90px', height:'72px', cursor: 'pointer'}}></img>
          <a href="tel:+79201083306">
          <Button className='layoutBtn'>Позвонить нам!</Button>
      
          </a>
          <Button className='layoutBtn' onClick={() => navigate("/login")}>Войти</Button>
          {/* <Button className='layoutBtn' onClick={() => navigate("/register")}>Регистрация</Button> */}
          
        </>
      }
        {/* items={items1} */}
        {/* </Menu> */}
      </Header>
      <Layout>
        <Sider 
        //   style={{
        //   overflow: 'hidden',
        //   height: '100vh',
        //   position: 'fixed',
        //   left: 8,
        //   top: 0,
        //   bottom: 0,
        //   background: "#001628",
        // }}
        width={220} style={{ background: "#001628"}}
        >
        {/* colorBgContainer */}
          {/* <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
          /> */}
          {user ? (
          <>
          <Button className="sideBtn" onClick={() => navigate("/")}>
            Домой
            </Button>
            <Button className="sideBtn" onClick={() => navigate("/form")}>
            Найти любовь
            </Button>
            <Button className="sideBtn" onClick={() => navigate("/date")}>
            Свидания и события
            </Button>
            <Button className="sideBtn" onClick={() => navigate("/account")}>
            Профиль
            </Button>
            <Button className="sideBtn" onClick={() => navigate("/about")}>
            О нас
            </Button>
            <Button className='sideBtn' onClick={() => navigate("/feedback")}>Отзывы</Button>
          </>
        ) : (
          <>
            <Button className="sideBtn" onClick={() => navigate("/register")}>
            Найти любовь
            </Button>
            <Button className="sideBtn" onClick={() => navigate("/date")}>
            <div>Свидания и события</div>
            </Button>
            <Button className="sideBtn" onClick={() => navigate("/")}>
            Домой
            </Button>
            <Button className="sideBtn" onClick={() => navigate("/about")}>
            О нас
            </Button>
            <Button className='sideBtn' onClick={() => navigate("/feedback")}>Отзывы</Button>
          </>
        )}
        </Sider>
        <Layout style={{ padding: "0 24px 24px", backgroundColor: "#FF5CB8" }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <div style={{width: "220px", backgroundColor: 'red'}}></div>
          <Content
            style={{
              padding: 24,
              margin: 0,
              color: "black",
              minHeight: 280,
              background: "#EAE4F1",
            }}
          >
            { children }
          {/* <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/form" element={<MyForm />} />
          <Route path="/partner" element={<OtherForm />} />
          <Route path="/date">
            <Route index element={<MyDate />} />
            <Route path="/date/:id">
              <Route index element={<OneDate />} />
            </Route>
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/profileAdmin" element={<Admin />} />
          </Routes> */}

          </Content>
          <Footer style={{ textAlign: 'center', backgroundColor: '#ff1c9d6b' }}>
          <div>Брачное агентство "Дуэт" ©2023</div>
          <a href="tel:+79201083306">
          <div>Телефон: +7 (920) 108-33-06</div>
          </a>
          <div>            
            <a href="https://wa.me/79201083306"><img  style={{width: '50px'}} src='WhatsApp_Logo_1_t.png' /></a>
            <a href="https://vk.com/marriegeagancy?z=article_edit-166046433_72908"> <img style={{width: '37px', marginBottom: '1px'}} src='free-png.ru-307.png' /></a>
            <a href="https://t.me/Nadya887"> <img style={{width: '42px'}} src='telegram_cvet-d23c11fa.png' /></a>
            </div>
          <div className="links"></div>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
    
  );
};

export default MyLayout;