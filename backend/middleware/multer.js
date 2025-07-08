import formidable from 'formidable';
import fs from 'fs';

const upload = (req, res, next) => {
    const form = formidable({
        multiples: true,
        uploadDir: './uploads',
        keepExtensions: true,
    });

    // Ensure upload directory exists
    if (!fs.existsSync('./uploads')) {
        fs.mkdirSync('./uploads');
    }

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({ success: false, message: 'File upload error', error: err.message });
        }
        req.body = fields;
        // Adapt formidable's files structure to match multer's req.files
        req.files = {
            image1: files.image1 ? (Array.isArray(files.image1) ? files.image1 : [files.image1]) : undefined,
            image2: files.image2 ? (Array.isArray(files.image2) ? files.image2 : [files.image2]) : undefined,
            image3: files.image3 ? (Array.isArray(files.image3) ? files.image3 : [files.image3]) : undefined,
            image4: files.image4 ? (Array.isArray(files.image4) ? files.image4 : [files.image4]) : undefined,
        };
        next();
    });
};

export default upload;