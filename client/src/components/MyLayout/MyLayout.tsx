/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import React from "react";
import "./MyLayout.css";

import type { MenuProps } from "antd";
import { Layout, theme } from "antd";

const { Header, Content, Sider, Footer } = Layout;

import { Button } from "antd";

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


const items1: MenuProps['items'] = ['Login', 'Register', 'Home'].map((key) => ({
  key,
  label: `${key}`,
}));
console.log(items1)



const MyLayout: React.FC = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  console.log(colorBgContainer)
  const navigate = useNavigate();


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
        }}
      >
        {user ? 
        <>
          <img onClick={() => navigate("/")} src='http://77.222.53.7:3003/logo2.png' style={{width:'90px', height:'72px', cursor: 'pointer'}}></img>
          <a href="tel:+79201083306">
          <Button className='layoutBtn'>Позвонить нам!</Button>
      
          </a>
          <Button className='layoutBtn accBtn' onClick={() => navigate('/account')} style={{borderRadius:'50%', width:'72px', height:'72px', backgroundColor:'white', backgroundImage: `url("http://localhost:3003${photo}")`}}></Button>
        </>
        :
        <>
          <img src='http://77.222.53.7:3003/logo2.png' onClick={() => navigate("/")} style={{width:'90px', height:'72px', cursor: 'pointer'}}></img>
          <a href="tel:+79201083306">
          <Button className='layoutBtn'>Позвонить нам!</Button>
      
          </a>
          <Button className='layoutBtn' onClick={() => navigate("/login")}>Войти</Button>
          
        </>
      }
      </Header>
      <Layout>
        <Sider 

        width={220} style={{ background: "#001628"}}
        >
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

          </Content>
          <Footer style={{ textAlign: 'center', backgroundColor: '#ff1c9d6b' }}>
          <div>Брачное агентство "Дуэт" ©2023</div>
          <a href="tel:+79201083306">
          <div>Телефон: +7 (920) 108-33-06</div>
          </a>
          <div>            
            <a href="https://wa.me/79201083306"><img  style={{width: '50px'}} src='http://77.222.53.7:3003/WhatsApp_Logo_1_t.png' /></a>
            <a href="https://vk.com/marriegeagancy?z=article_edit-166046433_72908"> <img style={{width: '37px', marginBottom: '1px'}} src='http://77.222.53.7:3003/free-png.ru-307.png' /></a>
            <a href="https://t.me/Nadya887"> <img style={{width: '42px'}} src='http://77.222.53.7:3003/telegram_cvet-d23c11fa.png' /></a>
            </div>
          <div className="links"></div>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
    
  );
};

export default MyLayout;