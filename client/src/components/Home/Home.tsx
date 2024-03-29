/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { useState, useEffect } from 'react';
import { Carousel } from 'antd';
import { MehOutlined, SmileOutlined } from '@ant-design/icons';
import './Home.css'
import video from '../../../public/pexels-dziana-hasanbekava-6401588 (1080p).mp4'

export default function Home () {
  const [news, setNews] = useState({})
  
  useEffect(() => {
    (async function () {
      const response = await fetch("http://duet-marriage.ru:8443/news", {
        credentials: "include",
      });
      const result = await response.json();
      if (result) {
       setNews(result)
      }
    })();
  }, []);

  return(
    <div className='all-posts'>
  <Carousel autoplay style={{width:'100%'}}>
    <div>

      <img alt='индивидуальный подход к каждому клиенту' className='imgCarousel' src='http://duet-marriage.ru/carousel.001.jpeg'/>
    </div>
    <div>
    <img alt='соблюдение конфидециальности' className='imgCarousel' src='http://duet-marriage.ru/carousel.002.jpeg'/>
    </div>
    <div>

      <img alt='найти свою вторую половинку' className='imgCarousel' src='http://duet-marriage.ru/carousel.003.jpeg'/>

    </div>
    <div>

      <img alt='слышим пожелания каждого клиента' className='imgCarousel' src='http://duet-marriage.ru/carousel.004.jpeg'/>
    </div>
    <div>

      <img alt='объединяем одинокие сердца' className='imgCarousel' src='http://duet-marriage.ru/carousel.005.jpeg'/>
    </div>
    <div>
      <img alt='организуем незабываемое свидание' className='imgCarousel' src='http://duet-marriage.ru/carousel.008.jpeg'/>
    </div>
    <div>
      <img alt='мы ценим ваше доверие' className='imgCarousel' src='http://duet-marriage.ru/carousel.006.jpeg'/>
    </div>
    <div>
      <img alt='большая база клиентов' className='imgCarousel' src='http://duet-marriage.ru/carousel.007.jpeg'/>
    </div>
    <div>
      <img alt='найти любовь' className='imgCarousel' src='http://duet-marriage.ru/carousel.009.jpg'/>
    </div>
  </Carousel>
  <div className='welcomeText'>
    <p className='welcomeTextTitle'>Кто мы?</p>
      <p style={{fontSize:'20px'}}>Брачное агентство - это о чувствах, это о любви. Наше агентство единственное в городе, и мы гордимся тем, как мы помогли уже десяткам людей обрести свое счастье и найти истинную любовь. Наши клиенты - не только одинокие мужчины и женщины из Рыбинска, но и из других городов, включая Ярославль, Москву и область.</p><br/>
      <p style={{fontSize:'20px'}}>Большая база клиентов, которые обратились к нам, позволит выбирать из множества потенциальных кандидатов. Мы верим, что любовь не знает границ и возраста, поэтому мы. Можем похвастаться разнообразие клиентов от 25 до 73 лет.</p><br/>
      <p style={{fontSize:'20px'}}>А если вы уже нашли свою Любовь, то мы предлагаем вам услуги организации романтических свиданий! Множество локаций и приятных сюрпризов позволяют провести самое запоминающееся свидание с вашей половинкой, чтобы добавить немного романтики в повседневную жизнь и наполнить любовью каждый миг, проведенный вместе.</p>
      <img alt='брачное агентство "Дуэт" Рыбинск' className='logo' src='http://duet-marriage.ru/Прозрачный фон (1).png'/>
</div>
  <h3 style={{fontSize:'30px', marginTop: '10%', marginBottom: '5%'}}>Наши события и новости</h3>
  <div className='newsBody'>

  <div className='news'> <img alt='новость брачного агентства' className='newsPic' src={`http://duet-marriage.ru:8443${news.pic}`}/> {news.body}</div>
   </div>

  <div className='how-we-do-it'>
    <div className='how-we-do-it-text'> 
  <div className='how-we-do-it-title' style={{fontSize:'30px'}}>
    Сделайте первый шаг навстречу любви:
  </div>
  <div className='how-we-do-it-body' style={{fontSize:'20px'}}>
 <p>⁃ Зарегистрируйтесь на нашем сайте, чтобы получить возможность найти свою любовь;</p>
 <p>- Загрузите 2 фотографии. Первая фотография крупным планом будет отражаться в вашем профиле и видите ее только вы и администратор, вторая фотография должна быть в полный рост и отправится администратору после заполнения анкеты.</p>
 <p>⁃ Заполнить анкету о себе </p>
 <p>- Заполните анкету, в которой вы расскажите о своих желаниях к партнеру</p>
 <p>⁃ Внесите оплату, чтобы специальсты начали работу по поиску потенциальных партнеров</p>
 </div>
</div>
<img alt='Сделайте первый шаг навстречу любви' className='img-how-we-do-it' src='http://duet-marriage.ru/home.jpg'/>
  </div>
  <div className='our-work'></div>
  <div className='container-dates'>
    <h3 className='dates-title'>Организовать мероприятие самому или обратиться к нам?</h3>
  <div className='about-dates'>
  <div className='our-dates' style={{fontSize:'20px'}}>
    <p className='title-our-dates'>Самостоятельная организация свидания:</p>
    <MehOutlined style={{color: '#FF5CB8'}}/><p className='prosAndCons'>Много деталей, которые нужно принять во внимание</p>
    <MehOutlined style={{color: '#FF5CB8'}}/><p className='prosAndCons'>Трата времени на поиск букета, музыкантов, места и т.д</p>
    <MehOutlined style={{color: '#FF5CB8'}}/><p className='prosAndCons'>Невозможно расслабиться и получить удовольствие, потому что стараешься контролировать ситуацию</p>
    <MehOutlined style={{color: '#FF5CB8'}}/><p className='prosAndCons'>Ограниченное количество вариантов локаци</p>
    <MehOutlined style={{color: '#FF5CB8'}}/><p className='prosAndCons'>Сложно придумать необычное свидание</p>
  </div>
  <div className='your-dates' style={{fontSize:'20px'}}>
  <p className='title-your-dates'>Организация свидания нашими силами:</p>
  <SmileOutlined style={{color: '#FF5CB8'}}/><p className='prosAndCons'>Опыт организации свиданий позволяет нам предусмотреть любые мелочи</p>
  <SmileOutlined style={{color: '#FF5CB8'}}/><p className='prosAndCons'>Наши партнеры выполнят любые ваши пожелания</p>
  <SmileOutlined style={{color: '#FF5CB8'}}/><p className='prosAndCons'>Наша команда контролирует процесс организации и подготовки</p>
  <SmileOutlined style={{color: '#FF5CB8'}}/><p className='prosAndCons'>Множество локаций, которые мы вам предлагаем, недоступны при самостоятельной организации</p>
  <SmileOutlined style={{color: '#FF5CB8'}}/><p className='prosAndCons'>Мы можем предложить креативные свидания и индивидуально подходим к каждому клиенту</p>
  </div>
  </div>
  </div>
  <div className='video'>
  <div className='video-text'> 
  <div className='video-text-title'>Как мы работаем оффлайн?</div>
  <div className='video-text-header'>Брачное агентство значительно повысит ваши шансы на счастливую семейную жизнь. Мы оказываем услуги по поиску кандидата для серьезных отношений и брака. </div>
  <div className='video-text-steps'>
  <div className='video-text-one-step'>
  <div className='video-text-one-step-title'>Первый шаг:</div>
  <div className='video-text-one-step-body'>
<p style={{fontSize: '17px'}} > 1. Позвонить по номеру телефона: 8-920-108-33-06 и записаться на бесплатную консультацию</p>
<p style={{fontSize: '17px'}}>2. Приехать в уютный офис.</p>
<p style={{fontSize: '17px'}}>3. При себе иметь желание найти своего человека! </p>
<p style={{fontSize: '17px'}}>4. За чашечкой чая или кофе обсудить со специалистом все детали. </p>
</div>
</div>
<div className='video-text-two-step'>
<div className='video-text-two-step-title'>Если вы захотите воспользоваться нашими услугами: </div>
<div className='video-text-two-step-body'>
<p style={{fontSize: '17px'}}>- принести с собой паспорт;</p>
<p style={{fontSize: '17px'}}>- принести 2 напечатанные фотографии ( первая должна быть в полный рост, а вторая крупным планом) </p>
<p style={{fontSize: '17px'}}>- быть честным и открытым;</p>
<p style={{fontSize: '17px'}}>- заполнить анкету;</p>
<p style={{fontSize: '17px'}}>- составить портфолио;</p>
<p style={{fontSize: '17px'}}>- внести оплату. </p>
<p style={{fontSize: '17px'}}>- не переживать о том, что вы пришли в агентство, и о том, что кто-то вас увидит или узнает где вы нашли свою любовь. Информация о вас  строго конфиденциальна и не будет разглашаться.</p>
</div>
</div>
</div>
<div className='video-text-end'>Далее мы анализируем вашу анкету, предпочтения и пожелания. После анализа мы пришлем вам фото кандидатов. </div>
</div>
</div>
<div className='pluses-container'>
  <div className='pluses-title'>
    Почему к нам обращаются?
  </div>
  <div className='pluses-body'>
    <div className='table1'>
    <img alt='лучше сайта знакомств' style={{opacity: "45%"}} src='http://duet-marriage.ru/icons8-email-64.png' />
    <div className='one-plus'> Сайты знакомств менее эффективны и менее безопасны</div>
    <img alt='создание семьи' style={{opacity: "45%"}} src='http://duet-marriage.ru/icons8-rings-64.png' /> 
    <div className='two-plus'> Вы имеете серьезные намерения и желание создать семью</div>
    </div>
    <div className='table2'>
    <img alt='поиск пары' src='http://duet-marriage.ru/icons8-couple-64.png' style={{opacity: "45%"}}  />
    <div className='tree-plus'> У вас есть четкое представление о том, кто вам нужен</div>
    <img alt='серьезные отношения' src='http://duet-marriage.ru/icons8-key-64.png' style={{opacity: "45%"}} /> 
    <div className='four-plus'>Хотите отношений с надежным и благополучным человеком</div>
    </div>
    <div className='table3'>
    <img alt='найти вторую половину' src='http://duet-marriage.ru/icons8-calendar-64.png' style={{opacity: "45%"}} /> 
    <div className='five-plus'> Не хотите тратить время на поиски и общение с людьми, которые вам не подходят</div>
    <img alt='найти партнёра' src='http://duet-marriage.ru/icons8-heart-64.png' style={{opacity: "45%"}} /> 
    <div className='six-plus'> Вы цените себя и свое время</div>
    </div>
  </div>
</div>
  </div>
  )
}
