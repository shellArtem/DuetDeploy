import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Button, Form, Input, message, Upload } from 'antd';
import React, { ChangeEvent, useEffect, useState } from 'react';
import './Account.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function Account() {
  const [img, setImg] = useState({});
  const [img2, setImg2] = useState(null);
  const dispatch = useDispatch();
  const phone = useSelector((state) => state.UserReducer.phone);
  const photo = useSelector((state) => state.UserReducer.img);
  // const photo2 = useSelector((state) => state.UserReducer.img2);
  const user = useSelector((state) => state.UserReducer.name);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const [message, setMessage] = useState('');

  useEffect(() => {
    (async function () {
      try {
        const resp = await fetch('http://localhost:3003/usersEvent', {
          method: 'GET',
          credentials: 'include',
        });
        const res = await resp.json();
        setEvents(res);

        const response = await fetch('http://localhost:3003/yookassaFeedback', {
          method: 'POST',
          credentials: 'include',
        });
        const result = await response.json();
        console.log('88888888888888888888888', result);
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
    data.append('photo', img);
    const response = await axios.put('http://localhost:3003/profile', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    dispatch({ type: 'CHANGE_IMG', payload: { photo: response.data } });
    const data2 = new FormData();
    data2.append('photo2', img2);
    const response2 = await axios.put(
      'http://localhost:3003/profile/2',
      data2,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    );
    // dispatch({ type: "CHANGE_IMG2", payload: {photo2: response2.data} });
  }, [img, img2]);

  console.log(img, img2);

  // const sendFile = React.useCallback(async () => {
  //   const data = new FormData();
  //   data.append("photo", img);
  //   data.append("photo2", img2);
  //   const response = await axios.put("http://localhost:3003/profile", data, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //     withCredentials: true,
  //   });
  //   console.log('=====>', response.data);

  //   dispatch({ type: "CHANGE_IMG", payload: response.data });
  // }, [img, img2]);

  const logoutHandler = async () => {
    try {
      const response = await fetch('http://localhost:3003/logout', {
        credentials: 'include',
      });
      dispatch({ type: 'LOGOUT_USER', payload: '' });
      navigate('/');
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
      <h1 style={{ fontSize: '300%' }}>
        {' '}
        Добро пожаловать в брачное агентство "ДУЭТ"{' '}
      </h1>
      <div
        className="mainProfileContainer"
        style={{ display: 'flex', justifyContent: 'space-around' }}
      >
        {/* <div className='photo-name'> */}
        <div
          className="photo-info-content"
          style={{
            display: 'flex',
            gap: '5%',
            border: '3px solid #FF5CB8',
            width: '800%',
            height: '800px',
          }}
        >
          <div className="avatar">
            {photo ? (
              <img
                className="user-photo"
                style={{
                  width: '40%',
                  borderRadius: '10%',
                }}
                src={`http://localhost:3003${photo}`}
                alt=""
              />
            ) : (
              <img
                className="userDef-photo"
                style={{
                  width: '40%',
                  borderRadius: '10%',
                }}
                src={'/avatar.png'}
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

              <form method="post" enctype="multipart/form-data">
                <div className="input-file-row">
                  <label className="input-file">
                    <input
                      name="photo"
                      type="file"
                      onChange={(e) => setImg(e.target.files[0])}
                    />
                    <span>Выберите первое фото</span>
                  </label>
                  <div className="input-file-list"></div>
                </div>
              </form>

              <form method="post" enctype="multipart/form-data">
                <div className="input-file-row">
                  <label className="input-file">
                    <input
                      name="photo2"
                      type="file"
                      onChange={(e) => setImg2(e.target.files[0])}
                    />
                    <span>Выберите второе фото</span>
                  </label>
                  <div className="input-file-list"></div>
                </div>
              </form>

              {/* <input
                name="photo"
                type="file"
                onChange={(e) => setImg(e.target.files[0])}
              
              /> */}
              {/* <input
                name="photo2"
                type="file"
                onChange={(e) => setImg2(e.target.files[0])}

              /> */}

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
        <h2 style={{ fontSize: '25px', borderBottom: '1.5px solid #46667281', width:'200px', marginLeft: 'auto', marginRight:'auto'}}>Ваши события: </h2>
        {events.length ? (
          events.map((event) => (
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
            {/* <Button
              onClick={() => navigate('/partner')}
              className="eventBtn"
            >
              Запланированные события
            </Button> */}
          </div>
        </div>
      </div>
    </>
  );
}
