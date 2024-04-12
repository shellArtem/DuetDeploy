/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { useEffect, useState } from 'react';
import { Button, Card, Form, Input} from 'antd';
import { HeartTwoTone} from '@ant-design/icons';



export default function Account() {

  const [change, setChange] = useState(true)


  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    (async () => {
        try {
            const response = await fetch('http://duet-marriage.ru:8443/feedbackApp', {
                method: 'GET',
                headers: { 'Content-type': 'application/json' },
            });
            const result = await response.json();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
            setFeedbacks([...feedbacks, ...result]); 
        } catch (error) {
            console.log('error', error);
        }
    })();
}, []);

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


const onFinish = async (values: any) => {
  setChange(() => !change)
  try {
    const responce = await fetch("http://duet-marriage.ru:8443/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      credentials: "include",
    });
    const data = await responce.json();
    console.log(data)
  } catch (error) {
    console.log("error", error);
  }
};
  return (

    <div>

    {change ? 

      <div>
        <h2 style={{fontSize: '20px'}}>Оставьте свой отзыв</h2>
  <Form
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{ maxWidth: "75%" }}
  >
    <Form.Item name='name' label="Имя" rules={[{ required: true }]}>
      <Input />
    </Form.Item> 
    <Form.Item name='phone' label="Телефон">
      <Input />
    </Form.Item>
    <Form.Item name='body' label="Ваше мнение о нас">
      <Input.TextArea style={{height: '8rem'}}/>
    </Form.Item>
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
      <Button style={{backgroundColor: '#628191'}} type="primary" htmlType="submit">
        Отправить
      </Button>
    </Form.Item>
  </Form>
    </div>

    :

    <h1 style={{fontSize:'30px'}}> Спасибо за Ваш отзыв! После модерации он появится на сайте </h1>
}

    <h2 style={{fontSize:'24px'}}>Отзывы наших клиентов</h2>

  {feedbacks.length ? feedbacks.map((el) => 
    <>
    
   <Card bordered={false} style={{ width: '60%', marginBottom: '3%', marginLeft: 'auto', marginRight: 'auto'}}>
    <p style={{fontSize: '24px'}}>{el.name}</p>
    <hr />
    <p style={{backgroundColor: '#0016282f', borderRadius: '5px', marginBottom: '20px', fontSize: '20px', padding: '10px'}}>{el.body}</p>
    <div style={{textAlign:'left'}}>
    {el.answer &&
    <>
    <HeartTwoTone twoToneColor="#d12d83" style={{marginLeft: '50%'}} />
    <p style={{fontSize: '22px'}}>Ответ администратора: </p>
    <p style={{border: '0.3px solid #eae4f0', borderRadius: '5px', padding: '10px'}}> {el.answer} </p>
    </>
    }
    </div>
    </Card>
    <br />
    </>
  ) : 
  <Card title="Отзывов нет" bordered={false} style={{ width: "100%" }}>
    
  </Card>
  }



  </div>
  )
}