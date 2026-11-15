import mongoose from 'mongoose';
const schema=new mongoose.Schema({complaint:{type:mongoose.Schema.Types.ObjectId,ref:'Complaint',required:true,index:true},previousStatus:String,newStatus:{type:String,required:true},updatedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},remarks:String},{timestamps:true});
export default mongoose.model('ComplaintStatusHistory',schema);
