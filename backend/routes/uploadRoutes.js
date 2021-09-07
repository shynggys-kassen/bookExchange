const path = require('path')
const express = require('express'); 
const multer = require('multer'); 
const router = express.Router(); 


const storage = multer.diskStorage({
  destination(req, file, cb) {
		const imageRegex = /png|jpg|jpeg/
		const fileRegex = /pdf/
		
		const isImage = imageRegex.test(path.extname(file.originalname).toLowerCase())
		const isFile = fileRegex.test(path.extname(file.originalname).toLowerCase())

		console.log(isFile)

		if (isImage){
			cb(null, 'uploads/images/');
		}
		if (isFile){
			cb(null, 'uploads/books/'); 
		}
		
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb){
	const filetypes = /jpg|jpeg|png|pdf/
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

	if(extname){
		return cb(null, true); 
	} else{
		cb('Images only'); 
	}
	
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/image', upload.single('image'), (req, res) => {
	console.log('hello'); 
  res.send(`/${req.file.path}`)
})


router.post('/file', upload.single('file'), (req, res)=> {
	res.send(`/${req.file.path}`) 
})


module.exports = router

