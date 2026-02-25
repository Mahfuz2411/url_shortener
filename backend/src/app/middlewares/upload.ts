import multer from 'multer';

const storage = multer.memoryStorage(); // RAM 

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
  fileFilter: (req, file, cb) => {
    
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only jpg and png allowed'));
    }
  },
});

export default upload;
