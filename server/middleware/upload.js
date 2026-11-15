import multer from 'multer';import path from 'path';import fs from 'fs';
const makeStorage=folder=>multer.diskStorage({destination:(req,file,cb)=>{const dir=path.resolve(`uploads/${folder}`);fs.mkdirSync(dir,{recursive:true});cb(null,dir);},filename:(req,file,cb)=>cb(null,`${Date.now()}-${Math.round(Math.random()*1e9)}${path.extname(file.originalname).toLowerCase()}`)});
const filter=(req,file,cb)=>['image/jpeg','image/png','image/webp'].includes(file.mimetype)?cb(null,true):cb(new Error('Only JPG, PNG and WEBP images are allowed'));
export const complaintUpload=multer({storage:makeStorage('complaints'),fileFilter:filter,limits:{fileSize:5*1024*1024,files:5}}).array('images',5);
export const resolutionUpload=multer({storage:makeStorage('resolutions'),fileFilter:filter,limits:{fileSize:5*1024*1024,files:5}}).array('resolutionImages',5);
