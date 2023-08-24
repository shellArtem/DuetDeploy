/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { useState, useEffect } from 'react';
import './MyDate.css';
import { Card, Button, Rate } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HeartOutlined } from '@ant-design/icons';

const { Meta } = Card;

export default function MyDate () {
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const user = useSelector((state) => state.UserReducer.name)

    const navigate = useNavigate();
    const [dates, setDates] = useState([]);
    const dispatch = useDispatch()





    
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const changeHandler = async (value, id) => {
      console.log(value, id)
      try {
        await fetch(`https://77.222.53.7:3003/newRating`, {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({value, id}),
        }); 
      } catch (error) {
        console.log('error', error)
      }
    }

    const deleteHandler = async (id) => {
      try {
        await fetch(`https://77.222.53.7:3003/createDate/deleteDate`, {
          method: 'DELETE',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({id}),
        });
        setDates(dates.filter((el) => el.id !== id))
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('https://77.222.53.7:443/dateTypes', {
                    method: 'GET',
                    headers: { 'Content-type': 'application/json' },
                });
                const result = await response.json();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
                setDates([...dates, ...result]); 
                dispatch({ type: "ALL_DATES", payload: result });
            } catch (error) {
                console.log('OMG', error);
            }
        })();
    }, []);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    function getRating (date) {
      const ratings = date.DateRatings.map((el) => el.rating )
      console.log(ratings)
       return (ratings.reduce((acc, val) => acc + val, 0)) / ratings.length
    }

    return (
      <div>
          <div className='text' style={{borderWidth: '3px 3px 1.5px',
    borderStyle: 'solid',
    borderColor:'#FF5CB8', width: '1000px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '3%', fontSize: '28px'}}>Здесь вы можете ознакомиться со всеми вариантами свиданий и мероприятиями, которые мы можем организовать. Для того, чтобы узнать больше подробностей, нажмите на кнопку "запланировать".</div>
      <div style={{display:'flex', flexWrap:'wrap', gap:'15px', justifyContent:'space-around'}}>
{dates.map((date) => 
    <Card
    
    bodyStyle={{fontSize: '30px'}}
    style={{ width: 400, backgroundColor: '#ff5cb84f' }}
    cover={
      <img
        alt="example"
        src={`https://77.222.53.7:3003${date.img}`}
        height='400px'
      />
    }
  >
    <Meta
    title={date.title}
    />
    <Button style={{marginTop:'10px'}} onClick={() => navigate(`/date/${date.id}`)}>Запланировать</Button>
    <div>
    <Rate 
    defaultValue={getRating(date)} 
    onChange={(value) => changeHandler(value, date.id)} style={{color: '#ff5cb8'}} character={<HeartOutlined />} />
    </div>
    {user === "admin" &&
    <Button onClick={() => deleteHandler(date.id)}>X</Button>
    }
  </Card>
)}
</div>
</div>
)
}