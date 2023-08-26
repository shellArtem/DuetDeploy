/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormItem from 'antd/es/form/FormItem';
import PhoneInput from "antd-phone-input/legacy";
import styles from'./MyForm.modele.css'
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';

import type { DatePickerProps } from 'antd';
import { DatePicker, Select } from 'antd';



export default function MyForm() {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const [age, setAge] = useState(0)

  useEffect(() => {
    console.log('===================>',age)
  },[age])

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const ageFull = ((new Date() - date)/(1000 * 60 * 60 * 24 * 365.25)).toFixed(0)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setAge(ageFull)
    form.setFieldsValue({"Полных_лет":ageFull}) //Full_years

  };

  

  const navigate = useNavigate();

  const initState = {
    Фамилия: '',
    Имя: '',
    Отчество: '',
    Контактный_телефон: '',
    еmail: '',
    Дата_рождения: '',
    Полных_лет: '',
    Знак_Зодиака: '',
    Национальность: '',
    Пол: '',
    Рост: '',
    Вес: '',
    Телосложение: '',
    Цвет_глаз: '',
    Цвет_волос: '',
    Длина_волос: '',
    Общее_состояние_здоровья: '',
    Вредные_привычки: '',
    Место_жительства: '',
    Жилищные_условия: '',
    С_кем_проживаете: '',
    Материальное_положение: '',
    Наличие_автомобиля: '',
    Водительское_удостоверение: '',
    Образование: '',
    Специальность: '',
    Знание_иностранных_языков: '',
    Сфера_деятельности_в_настоящее_время: '',
    Должность: '',
    Семейное_положение: '',
    Ранее_были_замужем_или_женаты: '',
    Наличие_детей: '',
    Пол_детей: '',
    Возраст_детей: '',
    Опишите_кратко_свой_характер: '',
    Верите_ли_вы_в_любовь_с_первого_взгляда: '',
    Привлекались_ли_вы_к_уголовной_ответственности: '',
    Готовы_ли_вы_к_переменам: '',
    Какие_качества_вы_цените_в_людях: '',
    Любите_ли_вы_делать_сюрпризы: '',
    Ваши_достоинства_и_недостатки: '',
    Семейнобытовые_обязанности: '',
    Предпочтения_в_еде: '',
    Умеете_и_любите_ли_вы_готовить: '',
    Увлечения_хобби: '',
    Вы_романтик: '',
    Были_ли_в_вашей_жизни_необычные_свидания: '',
    Занимаетесь_ли_вы_спортом: '',
  };
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  const [anketa, setAnketa] = useState(initState);
  const [form] = useForm();
  // const phone = useSelector((state) => state.UserReducer.phone);

  const [buttons, setButtons] = useState(false);

  const onFinish = async (values) => {
    setButtons(() => !buttons);
    console.log(values);
    try {
      const responce = await fetch('http://77.222.53.7:3003/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        credentials: 'include',
      });
      const data = await responce.json();
      console.log(data)
    } catch (error) {
      console.log('form error', error);
    }
  };

  // const validator = (_, { valid }) => {
  //   if (valid) {
  //     return Promise.resolve();
  //   }
  //   return Promise.reject('Invalid phone number');
  // };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  const handlePay = async (values) => {

    try {
//oplata
      const respons = await fetch("http://77.222.53.7:3003/payForm", {
        method: "POST",
        headers: { "Content-type": "application/json" },
      });
      const resul = await respons.json();
      location.href = resul.ssilka;

    } catch (error) {
      console.log("orderFetchOshibka", error);
    }

  };

  return (
    <>
      <h1 className={styles.title} style={{ height: '50px', fontSize: '45px', }}>АНКЕТА ПРЕТЕНДЕНТА</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: '100%' }}
        initialValues={{ remember: true }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h2 style={{ height: '50px', fontSize: '30px', width: '50%', textAlign:"left", marginLeft: '30%' }}>Личная информация:</h2>
        <Form.Item
          label="Фамилия"
          name="Фамилия"
          rules={[
            { required: true, message: 'Пожалуйста, введите Вашу фамилию!' },
          ]}
        >
          <Input value={anketa.Фамилия} type="text" />
        </Form.Item>

        <Form.Item
          // <FieldType>
          label="Имя"
          name="Имя"
          rules={[{ required: true, message: 'Пожалуйста, введите Ваше имя!' }]}
        >
          <Input value={anketa.Имя} type="text" />
        </Form.Item>

        <Form.Item label="Отчество" name="Отчество">
          <Input value={anketa.Отчество} type="text" />
        </Form.Item>

        <FormItem
          name="Контактный_телефон"
          label="Контактный телефон"
          // rules={[
          //   {
          //     required: true,
          //     message: 'Пожалуйста, введите Ваш номер телефона!',
          //     validator,
          //   },
          // ]}
        >
          <PhoneInput country="ru" />
        </FormItem>

        <Form.Item label="еmail" name="еmail">
          <Input value={anketa.еmail} type="text" />
        </Form.Item>

        <Form.Item
          label="Дата рождения"
          name="Дата_рождения"
          // rules={[
          //   {
          //     required: true,
          //     message: 'Пожалуйста, выберите Вашу дату рождения!',
          //   },
          // ]}
        >
          {/* <Input value={anketa["Дата рождения"]} type="text" /> */}
          <DatePicker
            style={{ width: '100%', fontSize: '30px' }}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          label="Полных лет"
          name="Полных_лет"
          // rules={[{ required: true, message: 'Пожалуйста, введите свой возраст!' }]}
        >

          <Input  type="text" value={age} /> 

        </Form.Item>

        <Form.Item label="Знак Зодиака" name="Знак_Зодиака">
          <Input value={anketa.Знак_Зодиака} type="text" />
        </Form.Item>

        <Form.Item label="Национальность" name="Национальность">
          <Input value={anketa.Национальность} type="text" />
        </Form.Item>

        <Form.Item
          label="Пол"
          name="Пол"
          rules={[{ required: true, message: 'Пожалуйста, выберите пол!' }]}
        >
          <Select
            defaultValue=""
            style={{ width: '100%' }}
            onChange={handleChange}
            value={anketa.Пол}
            options={[
              { value: 'Мужчина', label: 'Мужчина' },
              { value: 'Женщина', label: 'Женщина' },
            ]}
          />
        </Form.Item>

        <h2 style={{ height: '50px', fontSize: '30px', width: '80%', textAlign:"left", marginLeft: '40%' }}> Внешний вид: </h2>


        <Form.Item
          label="Рост"
          name="Рост"
          // rules={[{ required: true, message: 'Пожалуйста, выберите свой рост!' }]}
        >
          <Select
            defaultValue=""
            style={{ width: '100%' }}
            onChange={handleChange}
            value={anketa.Рост}
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
          <Input value={anketa.Вес} type="text" />
        </Form.Item>

        <Form.Item label="Телосложение" name="Телосложение">
          <Input value={anketa.Телосложение} type="text" />
        </Form.Item>

        <Form.Item label="Цвет глаз" name="Цвет_глаз">
          <Input value={anketa.Цвет_глаз} type="text" />
        </Form.Item>

        <Form.Item label="Цвет волос" name="Цвет_волос">
          <Input value={anketa.Цвет_волос} type="text" />
        </Form.Item>

        <Form.Item label="Длина волос" name="Длина_волос">
          <Input value={anketa.Длина_волос} type="text" />
        </Form.Item>

        <Form.Item
          label="Общее состояние здоровья"
          name="Общее_состояние_здоровья"
        >
          <Input value={anketa.Общее_состояние_здоровья} type="text" />
        </Form.Item>

        <Form.Item label="Вредные привычки" name="Вредные_привычки">
          <Input value={anketa.Вредные_привычки} type="text" />
        </Form.Item>

        <Form.Item
          label="Место жительства (город, район)"
          name="Место_жительства"
        >
          <Input value={anketa.Место_жительства} type="text" />
        </Form.Item>

        <h2 style={{ height: '50px', fontSize: '30px', width: '80%', textAlign:"left", marginLeft: '40%' }}>
          {' '}
          Социальный статус:{' '}
        </h2>

        <Form.Item label="Жилищные условия" name="Жилищные_условия">
          <Input value={anketa.Жилищные_условия} type="text" />
        </Form.Item>

        <Form.Item label="С кем проживаете" name="С_кем_проживаете">
          <Input value={anketa.С_кем_проживаете} type="text" />
        </Form.Item>

        <Form.Item label="Материальное положение" name="Материальное_положение">
          <Input value={anketa.Материальное_положение} type="text" />
        </Form.Item>


        <Form.Item label="Наличие автомобиля" name="Наличие_автомобиля">
          <Select
            defaultValue=""
            style={{ width: "100%" }}
            onChange={handleChange}
            value={anketa.Наличие_автомобиля}
            options={[
              { value: "да", label: "да" },
              { value: "нет", label: "нет" },
            ]}
          />
        </Form.Item>


        {/* <Form.Item label="Наличие автомобиля" name="Наличие_автомобиля">
          <Input value={anketa.Наличие_автомобиля} type="text" />
        </Form.Item> */}

        <Form.Item
          label="Водительское удостоверение"
          name="Водительское_удостоверение"
        >
          <Input value={anketa.Водительское_удостоверение} type="text" />
        </Form.Item>


        <Form.Item label="Образование" name="Образование">
          <Select
            defaultValue=""
            style={{ width: "100%" }}
            onChange={handleChange}
            value={anketa.Образование}
            options={[
              { value: "высшее", label: "высшее" },
              { value: "неполное высшее", label: "неполное высшее" },
              { value: "средне-специальное", label: "средне-специальное" },
              { value: "среднее", label: "среднее" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Специальность" name="Специальность">
          <Input value={anketa.Специальность} type="text" />
        </Form.Item>

      

        <Form.Item label="Знание иностранных языков" name="Знание_иностранных_языков">
          <Select
            defaultValue=""
            style={{ width: "100%" }}
            onChange={handleChange}
            value={anketa.Знание_иностранных_языков}
            options={[
              { value: "да", label: "да" },
              { value: "нет", label: "нет" },
            ]}
          />
        </Form.Item>

        <Form.Item style={{marginLeft: '10px'}}
          label="Ваша деятельность сейчас"
          name="Сфера_деятельности_в_настоящее_время"
        >
          <Input
            value={anketa.Сфера_деятельности_в_настоящее_время}
            type="text"
          />
        </Form.Item>

        <Form.Item label="Должность" name="Должность">
          <Input value={anketa.Должность} type="text" />
        </Form.Item>


        <Form.Item label="Семейное положение" name="Семейное_положение">
          <Select
            defaultValue=""
            style={{ width: "100%" }}
            onChange={handleChange}
            value={anketa.Семейное_положение}
            options={[
              { value: "холост", label: "холост" },
              { value: "не_замужем", label: "не замужем" },
              { value: "замужем", label: "замужем" },
              { value: "женат", label: "женат" },
              { value: "вдова", label: "вдова" },
              { value: "вдовец", label: "вдовец" },
              { value: "разведён", label: "разведён" },
              { value: "разведена", label: "разведена" },
              
            ]}
          />
        </Form.Item>


        <h2 style={{ height: '50px', fontSize: '30px', width: '80%', textAlign:"left", marginLeft: '40%'}}>
          {' '}
          Информация о детях:{' '}
        </h2>


        <Form.Item label="Наличие детей" name="Наличие_детей">
          <Select
            defaultValue=""
            style={{ width: "100%" }}
            onChange={handleChange}
            value={anketa.Наличие_детей}
            options={[
              { value: "да", label: "да" },
              { value: "нет", label: "нет" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Пол детей" name="Пол_детей">
          <Input value={anketa.Пол_детей} type="text" />
        </Form.Item>

        <Form.Item label="Возраст детей" name="Возраст_детей">
          <Input value={anketa.Возраст_детей} type="text" />
        </Form.Item>

        <h2 style={{ height: '50px', fontSize: '30px', width: '80%', textAlign:"left", marginLeft: '40%'}}>
          {' '}
          Иные важные вопросы:{' '}
        </h2>

        <Form.Item
          label="Опишите кратко свой характер"
          name="Опишите_кратко_свой_характер"
        >
          <Input value={anketa.Опишите_кратко_свой_характер} type="text" />
        </Form.Item>

        


        <Form.Item label="Существует любовь с первого взгляда?" name="Верите_ли_вы_в_любовь_с_первого_взгляда">
          <Select
            defaultValue=""
            style={{ width: "100%" }}
            onChange={handleChange}
            value={anketa.Верите_ли_вы_в_любовь_с_первого_взгляда}
            options={[
              { value: "да", label: "да" },
              { value: "нет", label: "нет" },
            ]}
          />
        </Form.Item>

        
        <Form.Item label="Уголовная ответственность" name="Привлекались_ли_вы_к_уголовной_ответственности">
          <Select
            defaultValue=""
            style={{ width: "100%" }}
            onChange={handleChange}
            value={anketa.Привлекались_ли_вы_к_уголовной_ответственности}
            options={[
              { value: "да", label: "да" },
              { value: "нет", label: "нет" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Готовы ли вы к переменам?" name="Готовы_ли_вы_к_переменам">
          <Select
            defaultValue=""
            style={{ width: "100%" }}
            onChange={handleChange}
            value={anketa.Готовы_ли_вы_к_переменам}
            options={[
              { value: "да", label: "да" },
              { value: "нет", label: "нет" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Какие качества вы цените в людях?"
          name="Какие_качества_вы_цените_в_людях"
        >
          <Input value={anketa.Какие_качества_вы_цените_в_людях} type="text" />
        </Form.Item>


        <Form.Item label="Любите ли вы делать сюрпризы?" name="Любите_ли_вы_делать_сюрпризы">
          <Select
            defaultValue=""
            style={{ width: "100%" }}
            onChange={handleChange}
            value={anketa.Любите_ли_вы_делать_сюрпризы}
            options={[
              { value: "да", label: "да" },
              { value: "нет", label: "нет" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Ваши достоинства и недостатки"
          name="Ваши_достоинства_и_недостатки"
        >
          <Input value={anketa.Ваши_достоинства_и_недостатки} type="text" />
        </Form.Item>

        <Form.Item
          label="Семейно-бытовые обязанности"
          name="Семейнобытовые_обязанности"
        >
          <Input value={anketa.Семейнобытовые_обязанности} type="text" />
        </Form.Item>

        <Form.Item label="Предпочтения в еде" name="Предпочтения_в_еде">
          <Input value={anketa.Предпочтения_в_еде} type="text" />
        </Form.Item>

 
        <Form.Item label="Умеете и любите ли вы готовить?" name="Умеете_и_любите_ли_вы_готовить">
          <Select
            defaultValue=""
            style={{ width: "100%" }}
            onChange={handleChange}
            value={anketa.Умеете_и_любите_ли_вы_готовить}
            options={[
              { value: "да", label: "да" },
              { value: "нет", label: "нет" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Увлечения,хобби" name="Увлечения_хобби">
          <Input value={anketa.Увлечения_хобби} type="text" />
        </Form.Item>


        <Form.Item label="Вы романтик?" name="Вы_романтик">
          <Select
            defaultValue=""
            style={{ width: "100%" }}
            onChange={handleChange}
            value={anketa.Вы_романтик}
            options={[
              { value: "да", label: "да" },
              { value: "нет", label: "нет" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Любите необычные свидания?"
          name="Были_ли_в_вашей_жизни_необычные_свидания"
        >
          <Input
            value={anketa.Были_ли_в_вашей_жизни_необычные_свидания}
            type="text"
          />
        </Form.Item>

        <Form.Item label="Занимаетесь ли вы спортом?" name="Занимаетесь_ли_вы_спортом">
          <Select
            defaultValue=""
            style={{ width: "100%" }}
            onChange={handleChange}
            value={anketa.Занимаетесь_ли_вы_спортом}
            options={[
              { value: "да", label: "да" },
              { value: "нет", label: "нет" },
            ]}
          />
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
