import React from "react"
import './style.css'
import { deletePost, getPost } from "../../api/Postapi";
import  { useEffect, useState } from "react";
import HeaderSection from "../headerSection";


const ContentSection = () => {
    

    const [data, setData] = useState([])
    const [updateDataApi, setUpdateApi] = useState({})
  

    
    const getPostdata = async () => {
        const res = await getPost();
        setData(res.data)
        // console.log(res.data)
    }
    
    
    
    
    useEffect(() => {
        getPostdata();
        
    }, []);
    
    
    const handleDeletePost = async (id) => {
        try {
        
            const res = await deletePost(id);
            console.log(res)
            if (res.status === 200) {
                const newUpdatedData = data.filter((currItem) => {
                    return currItem.id !== id;
                });
                setData(newUpdatedData);
            }

        }catch(e) {
            console.log(e)
        }

    };

    // handleUpdatePost
    
    const handleUpdatePost =  (item) => setUpdateApi(item);

    
    return(
        <div className="container ">
            <HeaderSection updateDataApi = {updateDataApi} setUpdateDataApi = {setUpdateApi} data = {data} setData = {setData}/>
          
            <div className="row gap-1 justify-content-center">
                {data &&
                    data.map((item) => (
                        <div key={`${item.id}`} className="content-section col-md-3 border-start border-4 border-white text-white" >
                            <div className="p-2">
                                <p>{item.id}</p>
                                <h3>{item.title}</h3>
                                <p>{item.body}</p>
                                <button className="edt-button" onClick={ () => {handleUpdatePost(item)} }>Edit</button>
                                <button className="del-btn" onClick={ () => {handleDeletePost(item.id)} }>
                                    Delete
                                </button> 
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default ContentSection;