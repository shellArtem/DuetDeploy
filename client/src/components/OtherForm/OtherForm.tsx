/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import styles from './OtherForm.module.css';
import { Button, Checkbox, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";

// import type { DatePickerProps } from "antd";
import { Select } from "antd";

export default function OtherForm() {
  // const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  //   console.log(date, dateString);
  // };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const navigate = useNavigate();
  // const dispatch = useDispatch();

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

  // type FieldType = {
  //   name?: string;
  //   phone?: string;
  //   password?: string;
  //   remember?: string;
  // };

  const [otherAnketa, setotherAnketa] = useState(initState);
  const [form] = useForm();
  const onFinish = async (values) => {
    // if (values.name && values.password && values.phone.phoneNumber) {
    // for (const key in values) {
    //   key.toString().replace(' ', '_')

    // }

    console.log(setotherAnketa)
    console.log("============>", values);
    try {
      const responce = await fetch("https://77.222.53.7:3003/partner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
      const data = await responce.json();
      console.log(data)
      //dispatch({ type: "LOG_USER", payload: data.name });
      navigate("/account");
    } catch (error) {
      console.log("form error", error);
    }
    // }
    // else {
    //   setErr(() => true);
    // }
  };

  // const validator = (_, { valid }) => {
  //   if (valid) {
  //     return Promise.resolve();
  //   }
  //   return Promise.reject("Invalid phone number");
  // };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  console.log(otherAnketa);

  return (
    <>
    <h1 style={{ height: '50px', fontSize: '45px', marginLeft: '0%' }}>ПОЖЕЛАНИЯ К ПАРТНЕРУ</h1>
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
        
        {/* <Form.Item
          label="Возраст"
          name="Возраст"
          //   rules={[{ required: true, message: "Пожалуйста, введите Вашу фамилию!" }]}
        >
          <Input value={otherAnketa.Возраст} type="text" />
        </Form.Item> */}

<Form.Item
          label="Возраст"
          name="Возраст"
          // rules={[{ required: true, message: 'Пожалуйста, выберите свой возраст!' }]}
        >
          <Select
            mode="multiple"
            // defaultValue=""
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
          // <FieldType>
          label="Знаки Зодиака"
          name="Знаки_Зодиака"
          //   rules={[{ required: true, message: "Пожалуйста, введите Ваше имя!" }]}
        >
          <Input value={otherAnketa.Знаки_Зодиака} type="text" />
        </Form.Item>

        <Form.Item label="Национальность" name="Национальность">
          <Input value={otherAnketa.Национальность} type="text" />
        </Form.Item>

        <h2 style={{ height: '50px', fontSize: '30px', width: '80%', textAlign:"left", marginLeft: '40%'  }}>Визуальные качества:</h2>
    
        <Form.Item
          label="Рост"
          name="Рост"
          // rules={[{ required: true, message: 'Пожалуйста, выберите свой рост!' }]}
        >
          <Select
            mode="multiple"
            // defaultValue=""
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

        <Form.Item label="Вес" name="Вес">
          <Input value={otherAnketa.Вес} type="text" />
        </Form.Item>

        <Form.Item label="Телосложение" name="Телосложение">
          <Input value={otherAnketa.Телосложение} type="text" />
        </Form.Item>

        <Form.Item label="Цвет волос" name="Цвет_волос">
          <Input value={otherAnketa.Цвет_волос} type="text" />
        </Form.Item>

        <Form.Item label="Длина волос" name="Длина_волос">
          <Input value={otherAnketa.Длина_волос} type="text" />
        </Form.Item>

        <Form.Item label="Усы борода" name="Усы_борода">
          <Input value={otherAnketa.Усы_борода} type="text" />
        </Form.Item>

        <h2 style={{ height: '50px', fontSize: '30px', width: '80%', textAlign:"left", marginLeft: '40%'  }}>Другие предпочтения:</h2>

        <Form.Item
          label="Наличие вредных привычек"
          name="Наличие_вредных_привычек"
        >
          <Input value={otherAnketa.Наличие_вредных_привычек} type="text" />
        </Form.Item>

        <Form.Item label="Совместное проживание" name="Совместное_проживание">
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
        >
          <Input
            value={otherAnketa.Материальное_положение_партнера}
            type="text"
          />
        </Form.Item>

        <Form.Item label="Автомобиль" name="Автомобиль">
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

        <Form.Item label="Водительское удостоверение" name="Водительское_удостоверение">
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
        >
          <Input value={otherAnketa.Профессиональный_статус} type="text" />
        </Form.Item>

        <Form.Item label="Образование" name="Образование">
          <Select
            mode="multiple"
            // defaultValue=""
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
        >
          <Input value={otherAnketa.Желаемая_сфера_деятельности} type="text" />
        </Form.Item>


        <Form.Item
          label="Знание иностранных языков"
          name="Знание_иностранных_языков"
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

        <Form.Item label="Наличие детей" name="Наличие_детей">
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
        >
          <Input
            value={otherAnketa.Пожелания_к_характеру}
            type="text"
          />

        </Form.Item>

        <Form.Item
          label="Семейнобытовые обязанности"
          name="Семейнобытовые_обязанности"
        >
          <Input value={otherAnketa.Семейнобытовые_обязанности} type="text" />
        </Form.Item>

        <Form.Item label="Важно ли Вам, чтобы партнёр готовил?" name="Важно_ли_Вам_что_бы_партнёр_готовил">
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

        <Form.Item label="Увлечения хобби" name="Увлечения_хобби">
          <Input value={otherAnketa.Увлечения_хобби} type="text" />
        </Form.Item>

    

        <Form.Item label="Важно ли, чтобы партнёр занимался спортом?" name="Важно_ли_Вам_чтобы_партнёр_занимался_спортом">
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
        >
          <Input value={otherAnketa.Дополнительные_пожелания} type="text" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className={styles.otherFormBtn} htmlType="submit">
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
