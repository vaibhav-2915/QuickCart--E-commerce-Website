const CLOUD_URL = `https://api.cloudinary.com/v1_1/dfitgcp0o/image/upload`
const uploadImage = async(image)=>{
    const formData = new FormData();
    formData.append("file",image); 
    formData.append("upload_preset","Ecommerce")


    const fetchToCloud = await fetch(CLOUD_URL,{
        method:"POST",
        body:formData

    })
    console.log(fetchToCloud.ok)

    return fetchToCloud.json();
}

export default uploadImage;
