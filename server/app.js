require('@babel/register');

const https = require('https');
const http = require('http');
const fs = require('fs');
const YooKassa = require('yookassa');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const cors = require('cors');

const express = require('express');
const logger = require('morgan');
const path = require('path');

const router = require('./routes/index');
const regRouter = require('./routes/regRouter');
const loginRouter = require('./routes/loginRouter');
const feedBackRouter = require('./routes/feedbackRouter')
const adminRouter = require('./routes/adminRouter')
const newDateRouter = require('./routes/newDateRouter')

const profileRouter = require('./routes/profile')


const app = express();
app.set('trust proxy', 1); 
const PORT = 3003;
const host = 'duet-marriage.ru';

const HTTPS_PORT = 8443;

const sessionConfig = {
  name: 'Marriage',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Секретное слово',
  resave: false, // * если true, пересохранит сессию, даже если она не менялась
  saveUninitialized: false, // * если false, куки появятся только при установке req.session
  cookie: {
    maxAge: 9999999, // * время жизни в мс (ms)
    httpOnly: true,
    domain: 'duet-marriage.ru', // установка домена
    path: '/', // установка пути
  },
};

app.use(require('prerender-node').set('prerenderToken', '9K4AjWeqvqw9U8GnCibg'));

app.use(session(sessionConfig));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({extended: true}))
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: true, //["http://localhost:5173"]
  credentials: true }
));

app.use('/', router);
app.use('/register', regRouter);
app.use('/login', loginRouter);
app.use('/', feedBackRouter);
app.use('/', adminRouter);
app.use('/createDate', newDateRouter)

app.use('/profile', profileRouter)






const yooKassa = new YooKassa({
  shopId: '240995',
  secretKey: 'live_dNrB7Yq0u2VZFOChRTMvbwwDiQjPy1VTPGRyPwySH6g',
})



app.post('/pay', (req, res) => {
            
  const {dateTitle,
        extraOptions,
        price,
        selectedDate} = req.body.allValues     
  const prePay = price / 2  
  yooKassa.createPayment({
    amount: {
        value: prePay,
        currency: 'RUB',
    },
    capture: true,
    payment_method_data: {
        type: 'bank_card',
    },
    confirmation: {
        type: 'redirect',
        return_url: 'http://duet-marriage.ru/',
    },
    metadata: {
      dateTitle,
      extraOptions,
      price,
      selectedDate
        },
    description: 'Предоплата организации свидания',
  }).then(resp => {
    const { id, confirmation } = resp;
    res.json({ssilka: confirmation.confirmation_url})
  });
});

app.post('/payForm', (req, res) => {
             
  yooKassa.createPayment({
    amount: {
        value: 2000,
        currency: 'RUB',
    },
    capture: true,
    payment_method_data: {
        type: 'bank_card',
    },
    confirmation: {
        type: 'redirect',
        return_url: 'http://duet-marriage.ru/',
    },
    metadata: {},
    description: 'Оплата анкеты',
  }).then(resp => {
    const { id, confirmation } = resp;
    res.json({ssilka: confirmation.confirmation_url})
  });
});


app.post('/yookassa', (req, resp) => {
  const {event} = req.body
  const {metadata} = req.body.object
  req.app.locals.event = event
  req.app.locals.metadata = metadata
  resp.sendStatus(200);
});

app.post('/yookassaFeedback', (req, resp) => {
  const {event} = req.app.locals
  const {metadata} = req.app.locals
  resp.json({event, metadata});
});


// HTTPS server configuration
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, '/certs/privkey.pem')),
  cert: fs.readFileSync(path.join(__dirname, '/certs/fullchain.pem')),
};

// Create the HTTPS server
const httpsServer = https.createServer(httpsOptions, app);

// Start both HTTP and HTTPS servers to handle both protocols
http.createServer(app).listen(PORT, () => {
  console.log(`HTTP server started on PORT: ${PORT}`);
});

httpsServer.listen(HTTPS_PORT, () => {
  console.log(`HTTPS server started on PORT: ${HTTPS_PORT}`);
});
// app.listen(PORT, host, () => {
//   console.log(`Server listens http://${host}:${PORT}`);
// });
