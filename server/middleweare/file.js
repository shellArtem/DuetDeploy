const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/uploads')
    },
    filename: function (req, file, cb) {
        return cb(null, `${file.originalname}`);
    }
  })

  const types = ['/uploads/png', '/uploads/img', '/uploads/jpg']

  const fileFilter = (req, file, cb) => {
    if(types.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
  }
  
module.exports = multer({storage, fileFilter})