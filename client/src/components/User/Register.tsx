/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import PhoneInput from "antd-phone-input";
import PhoneInput from "antd-phone-input/legacy";
import './User.less';
import { Button, Checkbox, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import './Register.css'

export default function Register() {
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

  const [reg, setReg] = useState(initState);
  console.log(setReg)
  const [error, setError] = useState(false)
  const [form] = useForm();

  const onFinish = async (values) => {
    try {
      const responce = await fetch("http://duet-marriage.ru/register", {
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
        
      dispatch({ type: "REG_USER", payload: {name: data.name, phone: data.phone} });
      navigate("/");
      } 
    } catch (error) {
      console.log("register error", error);
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
    <h1 style={{alignSelf: 'center'}}>Зарегистрироваться</h1>
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
          className="regForm input"
          label="Имя"
          name="name"
          rules={[{ required: true, message: "Пожалуйста, введите Ваше имя!" }]}
        >
          <Input value={reg.name} type="text" placeholder="Введите имя" />
        </Form.Item>

        <Form.Item<FieldType>
           className="regForm input"
        name="phone" 
        label="Телефон"
        rules={[{ required: true, message: "Пожалуйста, введите Ваш номер телефона!" , validator}]}>
          <PhoneInput country="ru" />
        </Form.Item>

        <Form.Item<FieldType>
           className="regForm input"
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Пожалуйста, введите Ваш пароль!" }]}
        >
          <Input.Password
            value={reg.password}
            type="text"
            placeholder="Введите пароль"
          />
        </Form.Item>

        <Form.Item<FieldType>
           className="regForm"
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}  className="regForm">
          <Button type="primary" htmlType="submit" style={{backgroundColor:'#628191'}}>
          Отправить
          </Button>
        </Form.Item>
      </Form>
      {error && <h2 style={{color:'black'}}>Такой пользователь уже существует</h2>}
    </>
  );
}
