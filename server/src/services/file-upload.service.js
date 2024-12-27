import multer from "multer";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
export class FileUploadService {
  static upload = async (req, res) => {

    const storage = multer.diskStorage({

      destination: function (req, file, cb) {
        const fileType = file.fieldname;
        let pathUrl = `storage/${req?.headers?.id}`
        const id = req.originalUrl.split('/').pop()?.split('?')[0];

        if (fileType === "product_images") {
          pathUrl = pathUrl + `/product/${id}`;
        } else if (fileType === "profile_image") {
          // Ticket editlerde endpoint yapısı support/ticketId/sessionId şeklinde yani diğerlerinden farklı
          // O yüzden ticketId yi farklı aldırmak durumundayız.
          const userId = req.originalUrl.split('/').pop()?.split('?')[0];
          pathUrl = pathUrl + `/profile/${userId}`;
        } else {
          const error = new Error('Invalid file type.');
          return cb(error, "error");
        }

        fs.mkdirSync(pathUrl, { recursive: true });

        cb(null, pathUrl);
      },

      filename: function (req, file, cb) {
        const timestamp = Date.now() + Math.floor(Math.random() * 1000);
        const originalname = file.originalname;
        const extension = path.extname(originalname);
        const filename = `${timestamp}${extension}`;
        cb(null, filename);
      },
    });

    const fileFilter = (req, file, cb) => {

      const fileType = file.fieldname;
      const ext = path.extname(file.originalname).toLowerCase();
      const mimetype = "." + file.mimetype.split('/')[1];

      // Dosya kontrolü
      if (fileType === 'productImages' || fileType === "profile_image" || fileType === "company_logo") {
        const allowedFileTypes = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        if (ext !== mimetype && !allowedFileTypes.includes(ext)) {
          const error = new Error('Invalid file type. Only JPG, JPEG, PNG, GIF, and WEBP files are allowed.');
          return cb(error, false);
        };
      } else if (fileType === 'product_guides') {
        const allowedFileTypes = ['.pdf'];
        if (ext !== mimetype && !allowedFileTypes.includes(ext)) {
          const error = new Error('Invalid file type. Only PDF files are allowed.');
          return cb(error, false);
        };
      } else {
        const error = new Error('Invalid file type.');
        return cb(error, false);
      }

      // istekten gelen max img count kontrolü
      let maxFile = 0;
      if (fileType === "productImages") {
        maxFile = 10;
      } else if (fileType === "ticket_images") {
        maxFile = 4;
      } else if (fileType === "product_guides") {
        maxFile = 2;
      } else if (fileType === "profile_image") {
        maxFile = 1;
      }

      const fileCount = Array.isArray(req.files) ? req.files.length : 1;
      if (fileCount > maxFile) {
        const error = new Error(`Maximum ${maxFile} img can be loaded.`);
        return cb(error, false);
      };
      cb(null, true);
    }

    const upload = multer({
      storage: storage,
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
      fileFilter: fileFilter,
    });

    upload.array('files', 10)(req, res, (err) => {
      if (err) {
        res.status(400).send({ message: err.message });
      } else {
        const files = req.files?.map((file) => {
          return {
            url: file.path,
            filename: file.filename,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size
          };
        });
        if (files === undefined) {
          res.status(400).send({ message: "No file uploaded" });
        }
        res.status(200).send(files);
      }

    });


  }

  static upload = async (req, res) => {

    const createFolder = (basePath) => {
      if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
      }
    };
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        const userId = req.body.userId; // Kullanıcı ID
        const productId = req.body.productId; // Ürün ID (sadece ürün resimleri için)

        if (!userId) {
          return cb(new Error('User id mu '), null);
        }

        let folderPath;
        if (file.fieldname === 'profileImage') {
          // Profil resmi için klasör
          folderPath = path.join(__dirname, 'storage', userId, 'profile');
        } else if (file.fieldname === 'productImages') {
          if (!productId) {
            return cb(new Error('Product ID gerekli!'), null);
          }
          // Ürün resimleri için klasör
          folderPath = path.join(__dirname, 'storage', userId, 'products', productId);
        }

        // Klasörü oluştur
        createFolder(folderPath);
        cb(null, folderPath);
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Dosya adı
      },
    });

    const upload = multer({ storage: storage })

    upload.array('files', 10)(req, res, (err) => {
      if (err) {
        res.status(400).send({ message: err.message });
      } else {
        const files = req.files?.map((file) => {
          return {
            url: file.path,
            filename: file.filename,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size
          };
        });
        if (files === undefined) {
          res.status(400).send({ message: "No file uploaded" });
        }
        res.status(200).send(files);
      }

    });


  }



  static delete = async (req, res) => {
    const { id } = req.params;
    const pathUrl = `storage/${id}`;
    if (fs.existsSync
      (pathUrl)) {
      fs.rmdirSync(pathUrl, { recursive: true });
    }
    res.status(200).send({ message: "Files deleted" });
  }
}


const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const fileType = file.fieldname;
    let pathUrl = `storage/${decoded?.id ?? 123456}`
    const id = req.originalUrl.split('/').pop()?.split('?')[0];

    if (fileType === "productImages") {
      pathUrl = pathUrl + `/product/${id}`;
    } else if (fileType === "profile_image") {
      // Ticket editlerde endpoint yapısı support/ticketId/sessionId şeklinde yani diğerlerinden farklı
      // O yüzden ticketId yi farklı aldırmak durumundayız.
      const userId = req.originalUrl.split('/').pop()?.split('?')[0];
      pathUrl = pathUrl + `/profile/${userId}`;
    } else {
      const error = new Error('Invalid file type.');
      return cb(error, "error");
    }

    fs.mkdirSync(pathUrl, { recursive: true });

    cb(null, pathUrl);
  },

  filename: function (req, file, cb) {
    const timestamp = Date.now() + Math.floor(Math.random() * 1000);
    const originalname = file.originalname;
    const extension = path.extname(originalname);
    const filename = `${timestamp}${extension}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {

  const fileType = file.fieldname;
  const ext = path.extname(file.originalname).toLowerCase();
  const mimetype = "." + file.mimetype.split('/')[1];

  // Dosya kontrolü
  if (fileType === 'productImages' || fileType === "profile_image" || fileType === "company_logo") {
    const allowedFileTypes = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    if (ext !== mimetype && !allowedFileTypes.includes(ext)) {
      const error = new Error('Invalid file type. Only JPG, JPEG, PNG, GIF, and WEBP files are allowed.');
      return cb(error, false);
    };
  } else if (fileType === 'product_guides') {
    const allowedFileTypes = ['.pdf'];
    if (ext !== mimetype && !allowedFileTypes.includes(ext)) {
      const error = new Error('Invalid file type. Only PDF files are allowed.');
      return cb(error, false);
    };
  } else {
    const error = new Error('Invalid file type.');
    return cb(error, false);
  }

  // istekten gelen max img count kontrolü
  let maxFile = 0;
  if (fileType === "productImages") {
    maxFile = 10;
  } else if (fileType === "ticket_images") {
    maxFile = 4;
  } else if (fileType === "product_guides") {
    maxFile = 2;
  } else if (fileType === "profile_image") {
    maxFile = 1;
  }

  const fileCount = Array.isArray(req.files) ? req.files.length : 1;
  if (fileCount > maxFile) {
    const error = new Error(`Maximum ${maxFile} img can be loaded.`);
    return cb(error, false);
  };
  cb(null, true);
}

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});