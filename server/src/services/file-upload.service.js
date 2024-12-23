import multer from "multer";
import fs from "fs";
import path from "path";

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
      if (fileType === 'product_images' || fileType === "profile_image" || fileType === "company_logo") {
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
      if (fileType === "product_images") {
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
}