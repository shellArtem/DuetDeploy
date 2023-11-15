/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './OtherForm.module.css';
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";

import { Select } from "antd";

export default function OtherForm() {

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const navigate = useNavigate();

  const initState = {
    Возраст: [],
    Знаки_Зодиака: "",
    Национальность: "",
    Рост: [],
    Вес: "",
    Телосложение: "",
    Цвет_волос: "",
    Длина_волос: "",
    Усы_борода: "",
    Наличие_вредных_привычек: "",
    Совместное_проживание: "",
    Материальное_положение_партнера: "",
    Автомобиль: "",
    Водительское_удостоверение: '',
    Профессиональный_статус: "",
    Образование: [],
    Желаемая_сфера_деятельности: "",
    Знание_иностранных_языков: "",
    Наличие_опыта_супружеской_жизни: "",
    Наличие_детей: "",
    Пожелания_к_характеру: "",
    Семейнобытовые_обязанности: "",
    Важно_ли_Вам_что_бы_партнёр_готовил: "",
    Увлечения_хобби: "",
    Важно_ли_Вам_чтобы_партнёр_занимался_спортом: "", 
    Дополнительные_пожелания: "",
  };

  const [otherAnketa, setotherAnketa] = useState(initState);
  const [buttons, setButtons] = useState(false);
  const [form] = useForm();
  const onFinish = async (values) => {
    setButtons(() => !buttons);
    console.log(setotherAnketa)
    try {
      const responce = await fetch("https://duet-marriage.ru:8443/partner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
      const data = await responce.json();
      console.log(data)
      // navigate("/account");
    } catch (error) {
      console.log("error", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("error:", errorInfo);
  };

  const handlePay = async (values) => {

    try {
      const respons = await fetch("https://duet-marriage.ru:8443/payForm", {
        method: "POST",
        headers: { "Content-type": "application/json" },
      });
      const resul = await respons.json();
      location.href = resul.ssilka;

    } catch (error) {
      console.log("error", error);
    }

  };

  return (
    <>
    <h1 className={styles.title} style={{ height: '50px', fontSize: '25px', }}>ПОЖЕЛАНИЯ К ПАРТНЕРУ</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: "100%", marginTop: '5%' }}
        initialValues={{ remember: true }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >

<Form.Item
          label="Возраст"
          name="Возраст"
          rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}
        >
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            onChange={handleChange}
            value={otherAnketa.Возраст}
            options={[
              { value: '18_23', label: '18-23 лет' },
              { value: '24_29', label: '24-29 лет' },
              { value: '30_35', label: '30-35 лет' },
              { value: '36_41', label: '36-41 лет' },
              { value: '42_47', label: '42-47 лет' },
              { value: '48_53', label: '48-53 лет' },
              { value: '54_59', label: '54-59 лет' },
              { value: '60_65', label: '60-65 лет' },
              { value: '66_71', label: '66-71 лет' },
              { value: '72_77', label: '72-77 лет' },
              { value: '78+', label: '78+ лет' },
            ]}
          />
        </Form.Item>

        <Form.Item
          rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}
          label="Знаки Зодиака"
          name="Знаки_Зодиака"
        >
          <Input value={otherAnketa.Знаки_Зодиака} type="text" />
        </Form.Item>

        <Form.Item label="Национальность" name="Национальность"
                  rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}>
          <Input value={otherAnketa.Национальность} type="text" />
        </Form.Item>

        <h2 className={styles.h2} style={{ height: '50px', fontSize: '25px', width: '80%'}}>Визуальные качества:</h2>
    
        <Form.Item
          label="Рост"
          name="Рост"
          rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}
        >
          <Select
            style={{ width: '100%' }}
            onChange={handleChange}
            value={otherAnketa.Рост}
            options={[
              { value: '150', label: 'до 150' },
              { value: '150_160', label: '150-160' },
              { value: '160_170', label: '160-170' },
              { value: '170_180', label: '170-180' },
              { value: '180_190', label: '180-190' },
              { value: '190+', label: '190+' },
            ]}
          />
        </Form.Item>

        <Form.Item label="Вес" name="Вес"
                  rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}>
          <Input value={otherAnketa.Вес} type="text" />
        </Form.Item>

        <Form.Item label="Телосложение" name="Телосложение"
                  rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}>
          <Input value={otherAnketa.Телосложение} type="text" />
        </Form.Item>

        <Form.Item label="Цвет волос" name="Цвет_волос"
                  rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}>
          <Input value={otherAnketa.Цвет_волос} type="text" />
        </Form.Item>

        <Form.Item label="Длина волос" name="Длина_волос"
                  rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}>
          <Input value={otherAnketa.Длина_волос} type="text" />
        </Form.Item>

        <Form.Item label="Усы борода" name="Усы_борода"
                  rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}>
          <Input value={otherAnketa.Усы_борода} type="text" />
        </Form.Item>

        <h2 className={styles.h2} style={{ height: '50px', fontSize: '25px', width: '80%'}}>Другие предпочтения:</h2>

        <Form.Item
          label="Наличие вредных привычек"
          name="Наличие_вредных_привычек"
          rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}
        >
          <Input value={otherAnketa.Наличие_вредных_привычек} type="text" />
        </Form.Item>

        <Form.Item label="Совместное проживание" name="Совместное_проживание"
                  rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}>
          <Select
            defaultValue=""
            style={{ width: "100%" }}
            onChange={handleChange}
            value={otherAnketa.Совместное_проживание}
            options={[
              { value: "в вашем доме", label: "в вашем доме" },
              { value: "в доме партнера", label: "в доме партнера" },
              { value: "по договоренности", label: "по договоренности" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Материальное положение партнера"
          name="Материальное_положение_партнера"
          rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}
        >
          <Input
            value={otherAnketa.Материальное_положение_партнера}
            type="text"
          />
        </Form.Item>

        <Form.Item label="Автомобиль" name="Автомобиль"
                  rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}>
          <Select
            defaultValue=""
            style={{ width: "100%" }}
            onChange={handleChange}
            value={otherAnketa.Автомобиль}
            options={[
              { value: "да", label: "да" },
              { value: "нет", label: "нет" },
              { value: "не имеет значения", label: "не имеет значения" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Водительское удостоверение" name="Водительское_удостоверение"
                  rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}>
          <Select
            defaultValue=""
            style={{ width: "100%" }}
            onChange={handleChange}
            value={otherAnketa.Водительское_удостоверение}
            options={[
              { value: "да", label: "да" },
              { value: "нет", label: "нет" },
              { value: "не имеет значения", label: "не имеет значения" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Профессиональный статус"
          name="Профессиональный_статус"
          rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}
        >
          <Input value={otherAnketa.Профессиональный_статус} type="text" />
        </Form.Item>

        <Form.Item label="Образование" name="Образование"
                  rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            onChange={handleChange}
            value={otherAnketa.Образование}
            options={[
              { value: "высшее", label: "высшее" },
              { value: "неполное высшее", label: "неполное высшее" },
              { value: "средне-специальное", label: "средне-специальное" },
              { value: "среднее", label: "среднее" },
              { value: "не имеет значения", label: "не имеет значения" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Желаемая сфера деятельности"
          name="Желаемая_сфера_деятельности"
          rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}
        >
          <Input value={otherAnketa.Желаемая_сфера_деятельности} type="text" />
        </Form.Item>


        <Form.Item
          label="Знание иностранных языков"
          name="Знание_иностранных_языков"
          rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}
        >
          <Select
            defaultValue=""
            style={{ width: "100%" }}
            onChange={handleChange}
            value={otherAnketa.Знание_иностранных_языков}
            options={[
              { value: "да", label: "да" },
              { value: "не имеет значения", label: "не имеет значения" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Наличие опыта супружеской жизни"
          name="Наличие_опыта_супружеской_жизни"
          rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}
        >
          <Select
            defaultValue=""
            style={{ width: "100%" }}
            onChange={handleChange}
            value={otherAnketa.Наличие_опыта_супружеской_жизни}
            options={[
              { value: "да", label: "да" },
              { value: "нет", label: "нет" },
              { value: "не имеет значения", label: "не имеет значения" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Наличие детей" name="Наличие_детей"
                  rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}>
          <Select
            defaultValue=""
            style={{ width: "100%" }}
            onChange={handleChange}
            value={otherAnketa.Наличие_детей}
            options={[
              { value: "да", label: "да" },
              { value: "нет", label: "нет" },
              { value: "не имеет значения", label: "не имеет значения" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Пожелания к характеру"
          name="Пожелания_к_характеру"
          rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}
        >
          <Input
            value={otherAnketa.Пожелания_к_характеру}
            type="text"
          />

        </Form.Item>

        <Form.Item
          label="Семейнобытовые обязанности"
          name="Семейнобытовые_обязанности"
          rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}
        >
          <Input value={otherAnketa.Семейнобытовые_обязанности} type="text" />
        </Form.Item>

        <Form.Item label="Важно ли, чтобы партнёр готовил?" name="Важно_ли_Вам_что_бы_партнёр_готовил"
                  rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}>
          <Select
            defaultValue=""
            style={{ width: "100%" }}
            onChange={handleChange}
            value={otherAnketa.Важно_ли_Вам_что_бы_партнёр_готовил}
            options={[
              { value: "да", label: "да" },
              { value: "нет", label: "нет" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Увлечения хобби" name="Увлечения_хобби"
                  rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}>
          <Input value={otherAnketa.Увлечения_хобби} type="text" />
        </Form.Item>

    

        <Form.Item label="Важен спорт в жизни партнера?" name="Важно_ли_Вам_чтобы_партнёр_занимался_спортом"
                  rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}
                  >
          <Select
            defaultValue=""
            style={{ width: "100%" }}
            onChange={handleChange}
            value={otherAnketa.Важно_ли_Вам_чтобы_партнёр_занимался_спортом}
            options={[
              { value: "да", label: "да" },
              { value: "нет", label: "нет" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Дополнительные пожелания"
          name="Дополнительные_пожелания"
          rules={[{ required: true, message: 'Пожалуйста, заполните поле ответа!' }]}
        >
          <Input value={otherAnketa.Дополнительные_пожелания} type="text" />
        </Form.Item>

        {buttons ? 
      
      <p style={{ fontSize: '3rem', margin: 'auto'}}>
        Выберите способ оплаты
      </p>
        :

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className='sendFormBtn' htmlType="submit">
            Отправить
          </Button>
        </Form.Item>
      }
      </Form>
      {buttons ? (
        <div className={styles.payBtnForm}>
          <Button className='payBtn'  onClick={handlePay}>Онлайн оплата</Button>

          <Button className='payBtn'  onClick={() => navigate('/account')}>Оплата в офисе</Button>
        </div>
      ) : (
        <span> </span>
      )}
    </>
  );
}
