import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {

    const navigate = useNavigate()
  return (
    <div className='notFound'>
    
    <h1 style={{fontSize: '40px'}}> Кажется, что такая страница не найдена! </h1>
    <Button className='adminAddBtn' onClick={() => navigate('/')}> Вернуться на главную страницу! </Button>
    </div>
  )
}
