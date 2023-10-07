import path from "path"
import express from "express"
import multer from "multer"

const router = express.Router();


const storage = multer.diskStorage({
    destination: '/uploads',
    filename: function(req, file ,cb){
        const filename =Date.now() + path.extname(file.originalname);
        req.filename = filename;
        cb(null,filename);
    },
});


const upload = multer({
    storage:storage,
    fileFilter: (req, file, cb)=>{
        const acceptableFileType =['.png','.jpg','.svg','.jpeg'];
        const fileExtension = path.extname(file.originalname);

        if(acceptableFileType.includes(fileExtension.toLocaleLowerCase())){
            cb(null ,true);
        }else{
            cb(new Error('Only image file type are acceptable'))
        }
    }
});

router.post('/',upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    return res.status(200).json({
      remark: 'File uploaded successfully',
      code: 200,
      path: `${req.fileName}`
     });
  })
  
  export default router
