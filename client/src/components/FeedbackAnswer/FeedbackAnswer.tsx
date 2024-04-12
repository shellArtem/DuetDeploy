/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { Button, Card, Input } from 'antd'
import { useState } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
export default function FeedbackAnswer({approveHandler, deleteHandler, el}) {

    const initStateAnswer = {
        text: "",
      };
    
      const [feedbackAnswer, setFeedbackAnswer] = useState(initStateAnswer)

    const [answer, setAnswer] = useState(false)
    const answerHandler = () => {
        setAnswer(() => !answer)
      }
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
      const changeHandler = (event) => {
        setFeedbackAnswer((pre) => ({...pre, [event.target.name]:event.target.value}))
      }
    
      const onFinishAnswer = async (id) => {
        try {
          await fetch("https://duet-marriage.ru:8443/feedbackAnswer", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({text: feedbackAnswer.text, id}),
            credentials: "include",
          });
          
        } catch (error) {
          console.log("register error", error);
        }
      };

  return (
    <div style={{width: '500px', display: 'flex'}} key={el.id}>
          
    <Card title={el.name} bordered={false} style={{ width: '94%', marginLeft: '2.5%'}}>
     <p>{el.body}</p>
     <Button onClick={() => approveHandler(el.id, el.approved)}> Одобрить </Button>
     <Button onClick={answerHandler}> Ответить </Button> 
     <Button onClick={() => deleteHandler(el.id)}> Удалить </Button> 

     {answer &&
      <div style={{display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '5px'}}>
        <Input style={{width: "300px"}} name='text' onChange={changeHandler} value={feedbackAnswer.text} type="text" placeholder="Введите ответ на отзыв" />
        <Button type="primary" onClick={() => onFinishAnswer(el.id)} style={{backgroundColor:'#628191'}}>
        Отправить
        </Button>
        </div>
     }
   </Card>
     <br />
  </div>
  )
}
