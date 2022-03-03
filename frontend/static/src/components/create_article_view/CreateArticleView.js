import {useState} from 'react'
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom';

// authorArticles, setAuthorArticles
function CreateArticleView(props) {

    const [imageState, setImageState] = useState('');
    const [imageFilePath, setImageFilePath] = useState('');
    const [titleState, setTitleState] = useState('');
    const [contentState, setContentState] = useState('');
    let navigate = useNavigate()

    if (!Cookies.get('authorization')) {
        return (
            <h1>Sorry, you must be logged in to create and article!</h1>
        )
    }

    const handleImageSubmit = (e) => {
        setImageState(e.target.files[0]);
        setImageFilePath(e.target.value);
    }

    const handleCancelClick = () => {
        setImageState(undefined);
        setTitleState('');
        setContentState('');
        navigate(-1)
    }

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        const createArticle = async () => {
    
            const newArticle = new FormData();
            newArticle.append('content', contentState);
            newArticle.append('img', imageState);
            newArticle.append('title', titleState);
            newArticle.append('phase', 'DR');
            
            const options = {
                method: 'POST',
                headers: {
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
                body: newArticle,
            }
            const response = await fetch('/api/v1/articles/create/', options).catch(props.handleErrors)

            if(!response.ok) {
                throw new Error('Response was not ok!')
            } else {
                const data = await response.json();
                props.setAuthorArticles([...props.authorArticles, data]);
            }
        }
        createArticle();
        navigate(-1);
    }

    return (
        <div>
            <form onSubmit={(e) => handleCreateSubmit(e)}>
                <label>Select Image</label>
                <input type='file' value={imageFilePath} onChange={(e) => handleImageSubmit(e)} required/>
                <label>Title</label>
                <input type='text' value={titleState} onChange={(e) => setTitleState(e.target.value)} required/>
                <label>Content</label>
                <textarea type='text' value={contentState} onChange={(e) => setContentState(e.target.value)} required/>
                <div>
                    <button type='submit'>Submit</button>
                    <button type='button' onClick={handleCancelClick}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default CreateArticleView