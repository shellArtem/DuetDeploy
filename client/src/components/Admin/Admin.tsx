/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import React, { useEffect, useState } from 'react';
import './Admin.css'
import {
  Button,
  DatePicker,
  Form,
  Input,
  Popconfirm,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/types/state';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import PhoneInput from "antd-phone-input/legacy";
import FeedbackAnswer from '../FeedbackAnswer/FeedbackAnswer';


const { RangePicker } = DatePicker;
const { TextArea } = Input;
console.log(RangePicker)

export default function Admin() {
  const [news, setNews] = useState('')
  const [img, setImg] = useState(null)
  const [dateTitle, setDateTitle] = useState('')
  const [dateDescr, setDateDescr] = useState('')
  const [datePrice, setDatePrace] = useState(0)
  const [imgDate, setImgDate] = useState(null)
  const [ankets, setAnkets] = useState([])


  const [addNewDate, setAddNewDate] = useState(true)
  const changeAddNewDate = () => {
    setAddNewDate(() => !addNewDate)
  }

  const [addNewExtraOptions, setAddNewExtraOptions] = useState(true)
  const changeaddNewExtraOptions = () => {
    setAddNewExtraOptions(() => !addNewExtraOptions)
  }


  const dispatch = useDispatch()


const deleteHandler = async (id) => {
  
  try {
    await fetch("http://77.222.53.7:3003/feedback", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id}),
      credentials: "include",
    });
    dispatch({ type: "DELETE_FEEDBACK", payload: id });
  } catch (error) {
    console.log("register error", error);
  }
}

const feedbacks = useSelector((state: RootState) => state.FeedbackReducer.feedbacks);

  useEffect(() => {
    (async () => {
        try {
            const response = await fetch('http://77.222.53.7:3003/feedback', {
                method: 'GET',
                headers: { 'Content-type': 'application/json' },
            });
            const result = await response.json();
            dispatch({ type: "ALL_FEEDBACKS", payload: result }); //feedbacks
            

            const resp = await fetch('http://77.222.53.7:3003/allAnkets', {
                method: 'GET',
                headers: { 'Content-type': 'application/json' },
            });
            const res = await resp.json();
            setAnkets(res)

        } catch (error) {
            console.log('OMG', error);
        }
    })();
}, []);

const approveHandler = async (id, approved) => {
  const curApproved = !approved
  try {
    await fetch("http://77.222.53.7:3003/feedback", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id}),
      credentials: "include",
    });
    console.log(id, curApproved)
    dispatch({ type: "APPROVE_FEEDBACK", payload: { id: id, curApproved: curApproved}});
    navigate('/feedback')
  } catch (error) {
    console.log("register error", error);
  }
}

  const user = useSelector((state: RootState) => state.UserReducer.name);

  interface DataType {
    id: React.Key;
    Имя: string;
    Полных_лет: string;
    Пол: string;
    Контактный_телефон: string;
    Ваши_достоинства_и_недостатки: string;
    Какие_качества_вы_цените_в_людях: string;
  }

  const handleDelete = async (id: React.Key) => {

    try {

      await fetch("http://77.222.53.7:3003/ankets", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id}),
      credentials: "include",
    });
      const newData = ankets.filter((item) => item.id !== id);
      setAnkets(newData);
    } catch (error) {
      console.log('error', error)
    }

    
  };
  
  const columns: ColumnsType<DataType> = [
    {
      title: 'Имя',
      dataIndex: 'Имя',
    },
    {
      title: 'Фамилия',
      dataIndex: 'Фамилия',
    },
    {
      title: 'Пол',
      dataIndex: 'Пол',
      filters: [
        {
          text: 'Мужчина',
          value: 'Мужчина',
        },
        {
          text: "Женщина",
          value: "Женщина",
        },
      ],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
      onFilter: (value: string, record) => record.Пол.indexOf(value) === 0,
    },
    {
      title: 'Контактный телефон',
      dataIndex: 'Контактный_телефон',
    },
    {
      title: 'Возраст',
      dataIndex: 'Полных_лет',
      defaultSortOrder: 'descend',
      sorter: (a, b) => Number(a.Полных_лет) - Number(b.Полных_лет),
    },
    {
      title: 'Удалить',
      dataIndex: '',
      key: 'x',
      render: (_, record) => (
        <Popconfirm title="Уверены, что хотите удалить?" onConfirm={() => handleDelete(record.id)}>
          <Button>Удалить анкету</Button>
        </Popconfirm>
      ),
    },
  ];

  
  
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const navigate = useNavigate()

  const onFinishNewExtra = async (values: any) => {
    try {
      const responce = await fetch("http://77.222.53.7:3003/extra", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
      const data = await responce.json();
      console.log(data)
      navigate("/date/1");
    } catch (error) {
      console.log("register error", error);
    }
  };


const sendNews = React.useCallback(async() => {
  const data = new FormData();
  data.append('newsBody', news)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  data.append('newsPic', img)
  await axios.put('http://77.222.53.7:3003/news', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });
  navigate("/");
}, [img, news])

const sendDate = React.useCallback(async(values) => {
  const data = new FormData();
  data.append('title', dateTitle)
  data.append('description', dateDescr)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  data.append('price', datePrice)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  data.append('datesPic', imgDate)
  await axios.post('http://77.222.53.7:3003/createDate', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });
  navigate("/date");
}, [imgDate, dateTitle, dateDescr, datePrice])

const [disabledDatesArr,setDisabledDatesArr] = useState([])

const [allEvents, setAllEvents] = useState([])

useEffect(() => {
  (async () => {
    try {
      const response = await fetch("http://77.222.53.7:3003/disabledDate", {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });
      const result = await response.json();
      setDisabledDatesArr(result);
      const resp = await fetch('http://77.222.53.7:3003/allEvents', {
        method: "GET",
        headers: { "Content-type": "application/json" },
      })
      const res = await resp.json()
      setAllEvents(res);
    } catch (error) {
      console.log("OMG", error);
    }
  })();
}, []);

const deleteDateHandler = async (id) => {
  try {
    await fetch(`http://77.222.53.7:3003/disabledDate`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({id}),
    });
    setDisabledDatesArr(disabledDatesArr.filter((el) => el.id !== id))
  } catch (error) {
    console.log(error);
  }
};


const deleteEventHandler = async (id) => {
  try {
    const response = await fetch(`http://77.222.53.7:3003/allEvents`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({id}),
    });
    const result = await response.json()
    setDisabledDatesArr(disabledDatesArr.filter((el) => el.id !== result.id))
    setAllEvents(allEvents.filter((el) => el.id !== id))
  } catch (error) {
    console.log(error);
  }
};


const exportAnketsToExcelHandler = async () => {
  try {
    const response = await fetch(`http://77.222.53.7:3003/exportToExcel`, {
      method: 'GET',
      headers: { 'Content-type': 'application/vnd.ms-excel' },
    });
    const blob = await response.blob();


    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = 'ankets.xlsx';

    downloadLink.click();
  } catch (error) {
    console.log(error);
  }
};

const exportWishToExcelHandler = async () => {
  try {
    const response = await fetch(`http://77.222.53.7:3003/exportToExcelWish`, {
      method: 'GET',
      headers: { 'Content-type': 'application/vnd.ms-excel' },
    });
    const blob = await response.blob();

    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = 'wishes.xlsx';


    downloadLink.click();
  } catch (error) {
    console.log(error);
  }
};



  const [form] = useForm();

  const [matches, setMatches] = useState([])


  const onFinish = async (values) => {
    try {
      const responce = await fetch("http://77.222.53.7:3003/profile/matches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
      const result = await responce.json();
      setMatches(result)
      
    } catch (error) {
      console.log("register error", error);
    }
  };
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  const validator = (_, {valid}) => {
    if (valid) {
      return Promise.resolve();
    }
    return Promise.reject("Invalid phone number");
  }


  return (
    <>
    <h1 style={{fontSize: '20px'}}>Личный кабинет администратора</h1>
    {user === 'admin' ? 
    <>
      <div style={{display: 'flex', justifyContent:'space-around'}}>
        
        {addNewDate ? 

          <Button className='adminAddBtn' onClick={changeAddNewDate}> Добавить Новый вид свидания</Button>
        :

      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ width: 600 }}
        onFinish={sendDate}
        name='inputsDate'
      >
        <h2 style={{fontSize: '20px'}}>Новый вид свидания</h2>
        <div className='photoDates'>

         <input name='imgDates' type="file" onChange={(e) => setImgDate(e.target.files[0])} />
        </div>
       
        <Form.Item label="Название" >
          <Input name='title' onChange={(e) => setDateTitle(e.target.value)}/>
        </Form.Item>

        <Form.Item label="Описание" >
          <Input name='description' onChange={(e) => setDateDescr(e.target.value)} />
        </Form.Item>

        <Form.Item label="Цена" >
          <Input name='price' onChange={(e) => setDatePrace(e.target.value)}/>
        </Form.Item>
       
        <Form.Item>
          <Button  htmlType="submit">Добавить</Button>
        </Form.Item>
        <Form.Item>
          <Button  onClick={changeAddNewDate}>Закрыть</Button>
        </Form.Item>

        
      </Form>
        }

        {addNewExtraOptions ? 
        
        <Button className='adminAddBtn' onClick={changeaddNewExtraOptions}> Добавить Новую доп. услугу</Button>
      :


      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ width: 600 }}
        onFinish={onFinishNewExtra}
      >
        <h2 style={{fontSize: '20px'}}>Новая дополнительная услуга</h2>
       
        <Form.Item label="Название" name="title">
          <Input />
        </Form.Item>

        <Form.Item label="Описание" name='description'>
          <Input />
        </Form.Item>

        <Form.Item label="Цена" name='price'>
          <Input />
        </Form.Item>
       
        <Form.Item>
          <Button htmlType="submit">Добавить</Button>
        </Form.Item> 
        <Form.Item>
        <Button onClick={changeaddNewExtraOptions}> Закрыть</Button>
        </Form.Item>      
      </Form>
      }

      </div >
      <div style={{overflowY:'scroll', height:'300px', display:'flex', justifyContent:'space-around', alignItems:'baseline'}}>

    <ul style={{overflowY:'scroll', height:'300px', width:'30%'}}>
       <h1 style={{fontSize: '20px'}}>Занятые даты</h1>
      {disabledDatesArr.map((disabledDate) => 
             disabledDate.isAdmin
              ? <li>{disabledDate.disabledDate} admin<button onClick={() => deleteDateHandler(disabledDate.id)}>X</button></li>
              :  <li>{disabledDate.disabledDate}<button onClick={() => deleteDateHandler(disabledDate.id)}>X</button></li>
              
      )}
      </ul>

      <div style={{display:'flex', justifyContent:'space-between', overflowY:'scroll', height:'300px', }}>
        <div>
        <h1 style={{fontSize: '20px'}}>Заявки на свидания</h1>
        {allEvents.length ? (
          allEvents.map((event) => (
            <div key={event.id} style={{borderWidth: '1.5px 3px 1.5px',
            borderStyle: 'solid',
            borderColor:'#FF5CB8'}}>
    
              <h2>У вас новый заказ свидания от: {event.clientName}, номер телефона: {event.clientPhone}</h2>
              <div>{event.dateTitle}</div>
              <div>{event.extraOptions}</div>
              <div>{event.price}</div>
              <div>{event.selectedDate}</div>
              <button onClick={() => deleteEventHandler(event.id)}>X</button>
            </div>
          ))
        ) : (
          <h1>Заявок нет</h1>
        )}
      </div>
      </div>
      </div>
      <div style={{display:'flex', justifyContent:'space-around', marginTop:'5%', alignItems: "center"}}>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ width: 500, borderWidth: '3px 3px 1.5px',
        borderStyle: 'solid',
        borderColor:'#FF5CB8'}}
      >
        <h2 style={{margin: '5%', fontSize: '20px'}}>Поменять новость</h2>
        <div className='photoNews'>

         <input style={{margin: '3%'}} name='newsPic' type="file" onChange={(e) => setImg(e.target.files[0])} />
        </div>
       
        <Form.Item style={{margin: '5%', width: '47rem'}}>
        <TextArea placeholder='Текст новости' name='newsBody' style={{height: '8rem', marginLeft: 'auto', marginRight: 'auto'}} onChange={(e) => setNews(e.target.value)}/>
        </Form.Item>

        {/* <button className='addImg' >добавить новость</button> */}
        <button style={{marginBottom: '3%'}} className='addImg' onClick={sendNews} >Добавить новость</button>
        
      </Form>
      <div style={{display:'flex', flexDirection:'column', borderWidth: '3px 3px 1.5px',
    borderStyle: 'solid',
    borderColor:'#FF5CB8',
    width: '500px',
    minHeight: '335.77px',
    }}>
      <h2 style={{fontSize: '20px', margin:'5%'}}> Модерация отзывов </h2>
        <div>

        {feedbacks.length ? feedbacks.map((el) => 
        <FeedbackAnswer
        key={el.id}
        el={el}
        approveHandler={approveHandler}
        deleteHandler={deleteHandler}
        />
          ) : 
          <div><h2> Отзывов нет </h2></div>
  }
  </div>
        </div>
      </div>
      

      <div>
        <div>
        <h2 style={{fontSize: '20px'}}>Все анкеты</h2>
        <Table columns={columns} dataSource={ankets} onChange={onChange} pagination={{ pageSize: 50 }} scroll={{ y: 240 }}
        expandable={{
          expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.Ваши_достоинства_и_недостатки} {record.Какие_качества_вы_цените_в_людях}</p>,
          
        }}
        />

        </div>
                <Button className='adminDownloadBtn' onClick={exportAnketsToExcelHandler}> Выгрузка анкет в Excel </Button>


                <Button className='adminDownloadBtn' onClick={exportWishToExcelHandler}> Выгрузка пожеланий в Excel </Button>

      </div>

      <div style={{display: 'flex', flexDirection: 'column'}}>
        <p style={{fontSize: '20px'}}> Необходимо ввести номер телефона пользователя для подбора пары </p>
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: "75%" }}
        initialValues={{ remember: true }}
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        >
      <div style={{color: '#CC0070', backgroundColor: '#ff5cb85c', height: '200px', width: '400px', marginBottom: '5%', marginLeft: '50%'}}> Критерии, по которым отсеиваются кандидаты:
<li>пол,</li>
<li>возраст,</li>
<li>рост,</li>
<li>образование,</li>
<li>спорт в жизни кандидата,</li>
<li>наличие детей,</li>
<li>наличие автомобиля.</li>
</div>

        <Form.Item
        name="phone" 
        label="Телефон"
        className="input"
        rules={[{ required: true, message: "Пожалуйста, введите номер телефона!" , validator}]}>
          <PhoneInput country="ru" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
          Отправить
          </Button>
        </Form.Item>

      </Form>
      <div className='peple' style={{display: 'flex'}}>
        <div style={{display:'flex', alignItems:'center', justifyItems: '', flexDirection: 'column', gap:'10px'}}>
      {matches.length ? matches.map((el) => 
      <div >
      <div style={{border:'solid 2px #ff5cb8', width:'100%', borderRadius:'15px', margin:'5px', overflow:'hidden'}}>
        <img src={`http://77.222.53.7:3003${el.User.photo}`} style={{width:'400px', height:'300px'}}></img>
      <div>{el.Фамилия} {el.Имя}</div>
        <p>Телефон: {el.Контактный_телефон}</p>
        <p>Возраст: {el.Полных_лет}</p>
        </div>
      </div>
      
      ) : <p>Совпадений не найдено
        </p>}

      </div>
      </div>
      </div>
      </>
    :
      <h1>Страница недоступна</h1>
    }
    </>
  )
}