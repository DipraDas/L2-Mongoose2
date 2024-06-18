import { v2 as cloudinary } from 'cloudinary';

export const sendImageToCloudinary = async () => {
    cloudinary.config({
        cloud_name: 'ddddxmu6c',
        api_key: '158554853164216',
        api_secret: '6aGfNHmWyiptaMDMgqqCYB8WwQI' // Click 'View Credentials' below to copy your API secret
    });
    const uploadResult = await cloudinary.uploader
        .upload(
            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
            public_id: 'shoes',
        }
        )
        .catch((error) => {
            console.log(error);
        });

    console.log(uploadResult);
}