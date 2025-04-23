import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});

// Fonction d'upload de l'image vers Cloudinary
const uploadImageCloudinary = async (image) => {
    // Vérifie que l'image existe et obtient son buffer
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());
    console.log('Buffer de l\'image:', buffer);

    const uploadImage = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "binkeyit" }, (error, uploadResult) => {
            if (error) {
                reject(new Error('Échec de l\'upload sur Cloudinary : ' + error.message));
            } else {
                console.log('Résultat de l\'upload Cloudinary:', uploadResult);  // Affiche le résultat de l'upload
                resolve(uploadResult);  // Résout avec le résultat de l'upload
            }
        }).end(buffer);  // Envoie le buffer à Cloudinary
    });

    return uploadImage;  // Retourne le résultat de l'upload
};

export default uploadImageCloudinary