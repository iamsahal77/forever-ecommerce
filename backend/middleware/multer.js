import formidable from 'formidable';

const upload = (req, res, next) => {
    const form = formidable({
        multiples: true,
        keepExtensions: true,
        // Do not set uploadDir, so files are kept in memory
        fileWriteStreamHandler: () => null // disables writing to disk
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({ success: false, message: 'File upload error', error: err.message });
        }
        req.body = fields;
        req.files = files;
        next();
    });
};

export default upload;