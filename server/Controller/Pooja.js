const User = require('../Modals/Auth')
const PoojaBenefits = require('../Modals/PoojaBenefits')
const pooja = require('../Modals/PoojaModal')
const { uploadImageToCloudinary } = require('../Utils/uploadImage')


exports.createPooja = async(req, res)=>{
    try {
        const {title, description, address, date,templeDetail, personName, personExperience, poojaBenefits } = req.body
        console.log(title, description, address, date,templeDetail, personName, personExperience, poojaBenefits)
        const image1 = req.files.image1
        const image2 = req.files.image2
        const image3 = req.files.image3
        const image4 = req.files.image4
        const thumbnail1 = await uploadImageToCloudinary(image1, process.env.FOLDER_NAME)
        const thumbnail2 = await uploadImageToCloudinary(image2, process.env.FOLDER_NAME)
        const thumbnail3 = await uploadImageToCloudinary(image3, process.env.FOLDER_NAME)
        const thumbnail4 = await uploadImageToCloudinary(image4, process.env.FOLDER_NAME)

        await pooja.create({
            title,
            description,
            address,
            templeDetail,
            date,
            personName,
            personExperience,
            image1:thumbnail1.secure_url,
            image2:thumbnail2.secure_url,
            image3:thumbnail3.secure_url,
            image4:thumbnail4.secure_url,
            poojaBenefits:[poojaBenefits]
        })



        return res.status(200).json({
            success:true,
            message:"Created successfully"
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
    }
}


exports.getAllPooja = async(req, res)=>{
    try {
        const getPOoja = await pooja.find({}).sort({createdAt:-1}).exec()
        return res.status(200).json({
            success:true,
            data:getPOoja
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
    }
}

exports.getPoojaByid = async(req, res)=>{
    try {
        const {poojaId} = req.body
        const poojaDetails = await pooja.findById({_id:poojaId}).populate("poojaBenefits").exec()
        return res.status(200).json({
            success:true,
            data:poojaDetails
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
    }
}

exports.deletePooja = async(req, res)=>{
    try {
        const {poojaId} = req.body
        const deletePooja = await pooja.findByIdAndDelete(poojaId)
        return res.status(200).json({
            success:true,
            message:"Deleted successfully"
        })

        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
    }
}


exports.editDate = async(req, res)=>{
    try {
        const {date, poojaId}= req.body

        const updatePooja = await pooja.findByIdAndUpdate({_id:poojaId}, {
            date:date
        }, {new:true})
    
        return res.status(200).json({
            success:true,
            message:"Date update successfully"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
    }
}













exports.createBenefits = async(req, res)=>{
    try {
        const {title, description} = req.body
        const icon = req.files.icon
        const uploadIcon = await uploadImageToCloudinary(icon, process.env.FOLDER_NAME)
        const createBenefit = await PoojaBenefits.create({
            title,
            description,
            icons:uploadIcon.secure_url
        })

        return res.status(200).json({
            success:true,
            message:"Benefit created successfully"
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
    }
}

exports.getAllBenifit = async(req, res)=>{
    try {
        const getAllBenifits = await PoojaBenefits.find({})
        return res.status(200).json({
            success:true,
            data:getAllBenifits
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
    }
}