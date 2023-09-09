/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import axios from 'axios';
import { Button} from 'antd';
import React, { useEffect, useState } from 'react';
import './Account.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function Account() {
  const [img, setImg] = useState({});
  const [img2, setImg2] = useState(null);
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
  const phone = useSelector((state) => state.UserReducer.phone);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
  const photo = useSelector((state) => state.UserReducer.img);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
  const user = useSelector((state) => state.UserReducer.name);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);


  const [message, setMessage] = useState('');

  console.log(message)
  useEffect(() => {
    (async function () {
      try {
        const resp = await fetch('http://77.222.53.7:3003/usersEvent', {
          method: 'GET',
          credentials: 'include',
        });
        const res = await resp.json();
        setEvents(res);

        const response = await fetch('http://77.222.53.7:3003/yookassaFeedback', {
          method: 'POST',
          credentials: 'include',
        });
        const result = await response.json();
        const string = `Вы внесли предоплату в размере ${
          result.metadata.price / 2
        }р. за ${result.metadata.dateTitle}, которое состоится ${
          result.metadata.selectedDate
        }. `;
        setMessage(string);
      } catch (error) {
        console.log('eventsError', error);
      }
    })();
  }, []);

  const sendFile = React.useCallback(async () => {
    const data = new FormData();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data.append('photo', img);
    const response = await axios.put('http://77.222.53.7:3003/profile', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    dispatch({ type: 'CHANGE_IMG', payload: { photo: response.data } });
    const data2 = new FormData();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data2.append('photo2', img2);
    const response2 = await axios.put(
      'http://77.222.53.7:3003/profile/2',
      data2,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    );
    console.log(response2)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  }, [img, img2]);

  const logoutHandler = async () => {
    try {
      const response = await fetch('http://77.222.53.7:3003/logout', {
        credentials: 'include',
      });
      dispatch({ type: 'LOGOUT_USER', payload: '' });
      navigate('/');
      console.log(response)
    } catch (error) {
      console.log('Не смогли выйти', error);
    }
    
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Arsenal&family=Forum&family=Inconsolata:wght@400;500;600;800&family=Montserrat:ital,wght@1,200&family=Open+Sans:wght@500&family=REM:ital,wght@1,800&family=Roboto:wght@500&display=swap"
        crossOrigin="anonymous"
        rel="stylesheet" 
      ></link>
      <h1 className='welcome' >
        {' '}
        Добро пожаловать в брачное агентство "ДУЭТ"{' '}
      </h1>
      <div
        className="mainProfileContainer"
        style={{ display: 'flex', justifyContent: 'space-around' }}
      >
        <div
          className="photo-info-content">
          <div className="avatar">
            {photo ? (
              <img
                className="user-photo"
                style={{
                  width: '40%',
                  borderRadius: '10%',
                }}
                src={`http://77.222.53.7:3003/${photo}`}
                alt=""
              />
            ) : (
              <img
                className="userDef-photo"
                style={{
                  width: '40%',
                  borderRadius: '10%',
                }}
                src={'http://77.222.53.7:3003/avatar.png'}
                alt=""
              />
            )}
            <div className="infoName"> Имя: {user} </div>
            <div className="infoTel">Телефон: {phone}</div>

            <div className="ant">
              <p className='instr'>
                Загрузите 2 фотографии. Первая фотография крупным планом будет
                отражаться в вашем профиле и видите ее только вы и
                администратор, вторая фотография должна быть в полный рост и
                отправится администратору после заполнения анкеты.
              </p>

              <form method="post" encType="multipart/form-data">
                <div className="input-file-row">
                  <label className="input-file">
                    <input
                      name="photo"
                      type="file"
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
                      onChange={(e) => setImg(e.target.files[0])}
                    />
                    <span>Выберите первое фото</span>
                  </label>
                  <div className="input-file-list"></div>
                </div>
              </form>

              <form method="post" encType="multipart/form-data">
                <div className="input-file-row">
                  <label className="input-file">
                    <input
                      name="photo2"
                      type="file"
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
                      onChange={(e) => setImg2(e.target.files[0])}
                    />
                    <span>Выберите второе фото</span>
                  </label>
                  <div className="input-file-list"></div>
                </div>
              </form>

              <button className="addImg" onClick={sendFile}>
                добавить фото
              </button>
              {/* </div> */}
            </div>
          </div>

          <div className="formsBtnsContainer">
          <Button onClick={logoutHandler} className="logoutBtn">
              Выйти из аккаунта
            </Button>
            <Button onClick={() => navigate('/form')} className="fillFormBtn">
              Заполнить анкету
            </Button>
            <Button
              onClick={() => navigate('/partner')}
              className="fillFormBtn"
            >
              Кого Вы хотите найти?
            </Button>
            <div className='eventPost'>
        {/* <h1 style={{ fontSize: '2rem' }}>{message}</h1> */}
        {events.length 
        ? (
        <h2 style={{ cursor: 'help', width: '350px', margin: 'auto', fontSize: '20px', border:'1.5px solid #FF5CB8', marginTop: '3px' }}>
          {' '}
          В ближайшее время с Вами обязательно свяжется администрация агентства{' '}
        </h2>
        ): (
          ''
        )}
        <h3 className= 'event-title' style={{ fontSize: '25px'}}>Ваши события: </h3>
        {events.length ? (
          events.map((event) => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
            <div className="expectation" key={event.id}>
              <div className="dateInfo">
                <div style={{ fontSize: '25px'}}> {event.dateTitle} </div>
                <div>Дополнительные услуги: {event.extraOptions}</div>
                <div>Предварительная цена: {event.price}p</div>
                <div >Выбранная дата события: {event.selectedDate}</div>
              </div>
            </div>
          ))
        ) : (
          <h1 style={{ cursor: 'help', border:'3px solid #466672', width: '300px', margin: 'auto', borderBottom: '1.5px solid #46667281', fontSize: '15px' }} onClick={() => navigate('/date')}>
            У вас пока не запланировано никаких событий
          </h1>
        )}
      </div>
          </div>
        </div>
      </div>
    </>
  );
}
