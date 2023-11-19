import contactSchema from '../models/contactModel.js'



export const addContact=async(req,res)=>{
    try {
        const data=req.body;
        const newContact=new contactSchema(data);
        await newContact.save()
        .then(()=>{
            res.status(200).json({message:"Your inquiry data has been submitted successfully, we will connect with you shortly via mail"});
        });
    } catch (error) {
        console.log(error);
    }
}

export const getContacts=async (req,res)=>{
    try {
        const contactData= await contactSchema.find().sort({ cresponse: 1 });
        res.status(200).json(contactData);
    } catch (error) {
        console.log(error);
    }
   
    
}

export const getContactById=async(req,res)=>{
    try {
        const id=req.params.id;
        let contact = await contactSchema.findById(id)
        res.status(200).json({contact});
    } catch (error) {
        console.log(error);
    }
} 

export const updateContact=async(req,res)=>{
    try {
        const id=req.params.id;
        let updatedContact;
        updatedContact=await contactSchema.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({message:"Response status updated successfully"})
    } catch (error) {
        console.log(error);
    }
}