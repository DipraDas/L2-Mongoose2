import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from 'fs';

cloudinary.config({
    cloud_name: 'ddddxmu6c',
    api_key: '158554853164216',
    api_secret: '6aGfNHmWyiptaMDMgqqCYB8WwQI'
});

export const sendImageToCloudinary = async (
    imageName: string,
    path: string
) => {

    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload(
                path,
                { public_id: imageName },
                function (error, result) {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                    fs.unlink(path, err => {
                        if (err) {
                            console.error(err)
                        } else {
                            console.log('File is deleted')
                        }
                    })
                }
            )
    })
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

export const upload = multer({ storage: storage })