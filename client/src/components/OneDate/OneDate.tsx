/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import {

  Button,

  Checkbox,

  Input,
  Form,
  Modal,
} from "antd";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/types/state";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import type { Dayjs } from "dayjs";
import { Alert, Calendar } from "antd";
import styled from "styled-components";
import "./OneDate.css";
import PhoneInput from "antd-phone-input/legacy";
import { useForm } from "antd/es/form/Form";

const initState2 = {
    otherExtra:''
}

export default function OneDate() {
  const { id } = useParams();
  // const navigate = useNavigate();
  // const [inputChange, setInputChange] = useState({ name: "", value: 3 });
  const [disabledDatesArr, setDisabledDatesArr] = useState([]);

  const [checkboxChecked, setCheckboxChecked] = useState([]);
  // const [balloon, setBalloon] = useState(1)
  // const [light, setLight] = useState(1)

  const [oneDate, setOneDate] = useState({});

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  type FieldType = {
    dinner?: string;
    music?: string;
    photographer?: string;
    flowers?: string;
    balloons?: string;
    skylights?: string;
  };
  const [extraOptions, setExtraOptions] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://duet-marriage.ru:8443/extra", {
          method: "GET",
          headers: { "Content-type": "application/json" },
        });
        const result = await response.json();
        setExtraOptions([...extraOptions, ...result]);

        const resp = await fetch("https://duet-marriage.ru:8443/oneDate", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ id }),
        });
        const res = await resp.json();
        setOneDate(res);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const [value, setValue] = useState(() => dayjs(new Date()));
  const [selectedValue, setSelectedValue] = useState(() => dayjs(new Date()));
  const [otherExtra, setOtherExtra] = useState(initState2)

  const otherExtraInputHandler = (event) => {
    setOtherExtra((pre) => ({...pre, [event.target.name]:event.target.value}))
}

  const user = useSelector((state: RootState) => state.UserReducer.name);
  const onSelect = async (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
    if (user === "admin") {
      const response = await fetch("https://duet-marriage.ru:8443/disabledDate", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          date: selectedValue.$d.toLocaleDateString(),
          isAdmin: true,
        }),
      });
      const result = await response.json();
      setDisabledDatesArr([...disabledDatesArr, result]);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://duet-marriage.ru:8443/disabledDate", {
          method: "GET",
          headers: { "Content-type": "application/json" },
        });
        const result = await response.json();
        setDisabledDatesArr(result);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const disabledDate = (date) => {
    for (let i = 0; i < disabledDatesArr.length; i += 1) {
      if (
        new Date(date).toLocaleDateString() === disabledDatesArr[i].disabledDate
      ) {
        return true;
      }
    }
  };
  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };

  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    setFinalPrice(oneDate.price);
  }, [oneDate]);

  const onChange = (e) => {
    if (e.target.checked) {
      setFinalPrice((finalPrice) => Number(finalPrice) + Number(e.target.id));
      if (!checkboxChecked.includes(e.target.name)) {
        setCheckboxChecked((prevChecked) => [...prevChecked, e.target.name]);
      }
    } else {
      setFinalPrice((finalPrice) => Number(finalPrice) - Number(e.target.id));
      setCheckboxChecked((prevChecked) =>
        prevChecked.filter((name) => name !== e.target.name)
      );
    }
  };

  const StyledWrapper = styled.div`
    width: 100%;
    height: 30%;
    border: 5px solid #f0f0f0;
    border-radius: 2px;
    itemActiveBg='#466672'
    colorPrimary='#466672'
    colorLink='#466672'
    colorPrimaryHover='#466672'
    font-size: 20px;
  `;

  const initState = {
    name: "",
    phone: "",
  };

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputs, setInputs] = useState(initState);

  console.log(setConfirmLoading, setInputs)

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const [form] = useForm();

  const validator = (_, { valid }) => {
    if (valid) {
      return Promise.resolve();
    }
    return Promise.reject("Invalid phone number");
  };
  //const [change, setChange] = useState(false)

  const handleSubmit = async (values) => {

    try {
      const allValues = {
        dateTitle: oneDate.title,
        extraOptions: checkboxChecked.join(", "),
        price: finalPrice,
        selectedDate: selectedValue.$d.toLocaleDateString(),
        otherExtra:otherExtra.otherExtra,
        clientName: values.name || null,
        phone: values.phone || null,
      };
//fetch to  create an order
      const response = await fetch("https://duet-marriage.ru:8443/order", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(allValues),
        credentials: "include",
      });
//fetch to disable date
      await response.json();
      const resp = await fetch("https://duet-marriage.ru:8443/disabledDate", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ date: selectedValue.$d.toLocaleDateString() }),
      });
      const res = await resp.json();
      setDisabledDatesArr([...disabledDatesArr, res]);
//oplata
      const respons = await fetch("https://duet-marriage.ru:8443/pay", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ allValues }),
      });
      const resul = await respons.json();
      location.href = resul.ssilka;

    } catch (error) {
      console.log("error", error);
    }

  };

  const deleteHandler = async (id) => {
    try {
      await fetch(
        `https://duet-marriage.ru:8443/createDate/deleteExtra`,
        {
          method: "DELETE",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ id }),
        }
      );
      setExtraOptions(extraOptions.filter((el) => el.id !== id));
      // const result = await response.json();
      // dispatch({ type: DELETE_TODOS, payload: id });
    } catch (error) {
      console.log(error);

    }
  };

  return (
    <>
    <link href="https://fonts.googleapis.com/css2?family=Arsenal&family=Forum&family=Inconsolata:wght@400;500;600;800&family=Montserrat:ital,wght@1,200&family=Open+Sans:wght@500&family=REM:ital,wght@1,800&family=Roboto:wght@500&display=swap" rel="stylesheet" crossOrigin="anonymous"></link>
    <div
      className="oneCardContainer"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h1 className="oneDateTitle">{oneDate.title}</h1>
      <div className="upperOneDate">
        <div className='imgText' style={{ display: "flex" }}>
         
      <h2 className='text'> <img
            className='img'
              alt="example"
              src={`https://duet-marriage.ru:8443${oneDate.img}`}
              height="400px"
            />{oneDate.description}</h2>
          </div>
        
      </div>
      <div
        className="middleOneDate"
      >
         <div style={{ display: "flex", flexDirection: "column", textAlign:'left',  fontSize: '20px' }}>
              <h1 style={{fontSize: '20px',  }}>Мы подготовим для вас:</h1>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
               <div style={{display: 'flex', gap: '5%'}}><img style={{width: '30px', height: '30px'}} src="https://duet-marriage.ru:8443/icons8-heart-balloon-64.png"></img><h3 style={{fontSize: '20px' }}> романтический декор</h3></div> 
               <div style={{display: 'flex', gap: '5%'}}><img style={{width: '30px', height: '30px'}} src="https://duet-marriage.ru:8443/icons8-table-64.png"></img><h3 style={{fontSize: '20px' }}> стол, стулья</h3></div> 
               <div style={{display: 'flex', gap: '5%'}}><img style={{width: '30px', height: '30px'}} src="https://duet-marriage.ru:8443/icons8-fireplace-64.png"></img><h3 style={{fontSize: '20px' }}>пледы</h3></div>
               <div style={{display: 'flex', gap: '5%'}}><img style={{width: '30px', height: '30px'}} src="https://duet-marriage.ru:8443/icons8-champagne-64.png"></img><h3 style={{fontSize: '20px' }}> шампанское</h3></div>
              <div style={{display: 'flex', gap: '5%'}}><img style={{width: '30px', height: '30px'}} src="https://duet-marriage.ru:8443/icons8-water-64.png"></img><h3 style={{fontSize: '20px' }}>вода</h3></div>
              <div style={{display: 'flex', gap: '5%'}}><img style={{width: '30px', height: '30px'}} src="https://duet-marriage.ru:8443/icons8-raspberry-64.png"></img><h3 style={{fontSize: '20px' }}> фруктовая тарелка</h3></div>
              </div>
            </div>
        <Form
          name="basic"
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          style={{fontSize: '20px' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >

          <div className="extra-option">
          <h1 style={{fontSize: '20px', textAlign:'left', marginRight: '5%' }}>Дополнительные услуги:</h1>
          {extraOptions.map((extraOption) => (
            <Form.Item <FieldType>
              label={extraOption.title}
              name={extraOption.title}
              key={extraOption.id}
            >
                <div style={{display:'flex', justifyContent: 'center', width: '100%', fontSize: '20px', overflow: 'inherit'}}>
              <Checkbox className="checkbox"
                id={extraOption.price}
                name={extraOption.title}
                onChange={onChange}
                />
                <div>От {extraOption.price} р.</div>
                </div>
              {user === "admin" && (
                  <Button onClick={() => deleteHandler(extraOption.id)}>X</Button>
                  )}
            </Form.Item>
          ))}
        </div>
        </Form>
      </div>
      <div
        className="lowerOneDate"
      >
                <div className="price">
          <h3 style={{fontSize: '20px',}}>Предварительная итоговая стоимость</h3>
          <h3 style={{ border: "3px solid black", borderRadius: "10px" }}>
            {" "}
            {finalPrice}р.{" "}
          </h3>
        </div>
        <div>
          <Alert
            message={`Выбранная дата свидания: ${selectedValue?.format(
              "DD.MM.YYYY"
            )}`}
          />
          <StyledWrapper>
            <Calendar
              value={value}
              fullscreen={false}
              onSelect={onSelect}
              disabledDate={disabledDate}
              onPanelChange={onPanelChange}
            />
          </StyledWrapper>
        </div>
      </div>
      <div>
        <h3 style={{fontSize: '25px',}}>Другие пожелания</h3>
        <Input.TextArea onChange={otherExtraInputHandler} value={otherExtra.otherExtra} name="otherExtra" placeholder='Пожалуйста, дайте нам знать о предпочтительном для Вас времени проведения свидания, а также сообщите о любых ваших пожеланиях, мы сделаем все возможное, чтобы Ваш праздник был незабываемым.' style={{ height: "8rem" }} />
      </div>
      <div>
        {/* <h2>Подтвердить оформление</h2> */}
        {user ? (
          <Button type="primary" className='btn-pay' onClick={handleSubmit} >
             Внести предоплату
          </Button>
        ) : (
          <>
            <Button className='btn-pay' type="primary" onClick={showModal}>
            Внести предоплату
            </Button>
            <Modal
              open={open}
              onOk={form.submit}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 800 }}
                initialValues={{ remember: true }}
                form={form}
                onFinish={handleSubmit}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <h2>Администратор свяжется с Вами для подтверждения заявки</h2>
                <Form.Item
                  label="Имя"
                  name="name"
                  className="input"
                  rules={[
                    {
                      required: true,
                      message: "Пожалуйста, введите Ваше имя!",
                    },
                  ]}
                >
                  <Input
                    value={inputs.name}
                    type="text"
                    placeholder="Введите имя"
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Телефон"
                  className="input"
                  rules={[
                    {
                      required: true,
                      message: "Пожалуйста, введите Ваш номер телефона!",
                      validator,
                    },
                  ]}
                >
                  <PhoneInput country="ru" />
                </Form.Item>
              </Form>
            </Modal>
          </>
        )}
      </div>
    </div>
    </>
  );
 }
