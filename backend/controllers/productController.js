import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

// function for add product
const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        // Get images from formidable's in-memory files
        const image1 = req.files.image1;
        const image2 = req.files.image2;
        const image3 = req.files.image3;
        const image4 = req.files.image4;

        // Formidable may return single file or array
        const normalize = (file) => (Array.isArray(file) ? file : file ? [file] : []);
        const images = [
            ...normalize(image1),
            ...normalize(image2),
            ...normalize(image3),
            ...normalize(image4)
        ];

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                // Upload buffer to Cloudinary
                const result = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                    if (error) throw error;
                    return result;
                });
                // We need to wrap the stream logic in a Promise
                return await new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                        if (error) return reject(error);
                        resolve(result.secure_url);
                    });
                    // item.filepath is a Buffer in memory
                    if (item && item._writeStream && item._writeStream.buffer) {
                        stream.end(item._writeStream.buffer);
                    } else if (item && item.buffer) {
                        stream.end(item.buffer);
                    } else {
                        reject(new Error('No buffer found for image upload.'));
                    }
                });
            })
        );

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for list product
const listProducts = async (req, res) => {
    try {
        
        const products = await productModel.find({});
        res.json({success:true,products})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for removing product
const removeProduct = async (req, res) => {
    try {
        
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { listProducts, addProduct, removeProduct, singleProduct }