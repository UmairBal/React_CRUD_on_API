import './styles.css'

import { addPost, updateData } from '../../api/Postapi';
import { useEffect, useState } from 'react';


const HeaderSection = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
    const [addData, setAddData] = useState({
        title: '',
        body: '',
    });


    const isEmpty = Object.keys(updateDataApi).length === 0;

    useEffect(() => {
        updateDataApi && setAddData({
            title: updateDataApi.title || '',
            body: updateDataApi.body || '',
        })
    }, [updateDataApi])
    
    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value

        setAddData ((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };


    const addPostData = async () => { 
        const res = await addPost(addData);
        if (res.status === 201){
            setData([...data, res.data])
            setAddData({title: "", body:"",})
        }
    }

    const updatePostData = async () => {
       try{
        
            const res = await updateData(updateDataApi.id, addData);
            setData((prev) => {
                return prev.map((currItem) => {
                    return currItem.id === res.data.id? res.data: currItem
                })
            })
       
        }catch(e) {
            console.log(e)
       }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const action = e.nativeEvent.submitter.value;
        if (action === "Add"){
            addPostData();
        }
        else if (action === "Edit") {
            updatePostData();
        }
    };
    
    return (

        <form className='header' onSubmit={handleFormSubmit}>

            <div className='header-content'>
                <input name='title' id='title' value={addData.title} onChange={handleInputChange}  className="col" type="text" placeholder='Add title' />
                <input name= 'body' id= 'body' value={addData.body} onChange={handleInputChange} className="col" type="text" placeholder='Add Content' />

                <button className="col" type='submit' value={isEmpty? "Add": "Edit"}>
                    {isEmpty? "Add": "Edit"}
                </button>
            </div>
        </form>
    )
}

export default HeaderSection;