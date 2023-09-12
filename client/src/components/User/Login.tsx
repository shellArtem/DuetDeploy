/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormItem from "antd/es/form/FormItem";
// import PhoneInput from "antd-phone-input";
import PhoneInput from "antd-phone-input/legacy";
import './Login.css';
import { Button, Checkbox, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initState = {
    name: "",
    phone: "",
    password: "",
  };

  type FieldType = {
    name?: string;
    phone?: string;
    password?: string;
    remember?: string;
  };

 const [log, setLog] = useState(initState);
 const [error, setError] = useState(false)
 const [err, setErr] = useState(false)
  const [form] = useForm();
  const onFinish = async (values) => {
    if (values.name && values.password && values.phone.phoneNumber) {
    try {
      const responce = await fetch("http://duet-marriage.ru/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
      const data = await responce.json();
      if(data.err) {
        setError(() => true)
      } 
      else {
        dispatch({ type: "LOG_USER", payload: {name: data.name, photo: data.img, phone: data.phone} });
      navigate("/");
      } 
    } catch (error) {
      console.log("error", error);
    }
  } else {
    setErr(() => true)
  }
  };

  const validator = (_, {valid}) => {
    if (valid) {
      return Promise.resolve();
    }
    return Promise.reject("Invalid phone number");
  }

const onFinishFailed = (errorInfo: any) => {
  console.log('error:', errorInfo);
};

  return (
    <>
    <h1 style={{alignSelf: 'center'}}>Войти</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
        
        <Form.Item<FieldType>
          className="loginForm"
          label="Имя"
          name="name"
          rules={[{ required: true, message: "Пожалуйста, введите Ваше имя!" }]}
        >
          <Input value={log.name} type="text" placeholder="Введите имя" />
        </Form.Item>

        <FormItem
        className="loginForm"
         name="phone" 
         label="Телефон"
         rules={[{ required: true, message: "Пожалуйста, введите Ваш номер телефона!" , validator}]}>
          <PhoneInput
          country="ru" style={{width: '100%'}}/>
  
        </FormItem>

        <Form.Item<FieldType>
          className="loginForm"
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Пожалуйста, введите Ваш пароль!" }]}
        >
          <Input.Password
            value={log.password}
            type="text"
            placeholder="Введите пароль"
          />
        </Form.Item>
        <p onClick={() => navigate("/register")} style={{marginLeft:'auto'}}>Если у Вас ещё нет аккаунта - <Button className='' onClick={() => navigate("/register")}>Зарегистрироваться</Button> </p>
        
        <Form.Item<FieldType>
           className="loginForm"
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}  className="loginForm">
          <Button type="primary" htmlType="submit" style={{backgroundColor:'#628191'}}>
          Отправить
          </Button>
        </Form.Item>
      </Form>
      {error && <h2 style={{color:'black'}}>Имя пользователя или пароль неверные</h2> }
      {err && <h2 style={{color:'black'}}>Пожалуйста, введите Ваш номер телефона!</h2>}
    </>
  );
}
