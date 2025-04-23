import uploadImageCloudinary from "../utils/uploadImageCloudinary.js"

const uploadImageController = async (request, response) => {
    try {
        const file = request.file;

        // Vérifie que le fichier est présent
        if (!file) {
            return response.status(400).json({
                message: 'Aucun fichier n\'a été téléchargé.',
                success: false,
                error: true
            });
        }

        // Upload de l'image vers Cloudinary
        const uploadImage = await uploadImageCloudinary(file);
        console.log('Image uploadée:', uploadImage);

        // Réponse après upload réussi
        return response.json({
            message: "Upload réussi",
            data: uploadImage,  // Les données renvoyées par Cloudinary
            success: true,
            error: false
        });
    } catch (error) {
        console.error('Erreur lors de l\'upload:', error.message);  // Affiche l'erreur dans la console
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

export default uploadImageController