// upload image and return image url

import axios from "axios"
import useAxiosPublic from "../Hooks/useAxiosPublic"


export const photoUpload = async imageData => {
    
    const formData = new FormData()
    formData.append('image', imageData)

    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)

    return data.data.display_url
    
}

export const userSave = async (user) =>{
    const axiosPublic = useAxiosPublic();

    await axiosPublic.post(`/user/${user?.email}`, {
        name:user?.displayName,
        image:user?.photoURL,
        email:user?.email,
        
      })
}