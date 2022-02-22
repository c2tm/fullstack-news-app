import {useState} from 'react'
import './ArticleView.css'

function ArticleView({article, userInfo}) {

    const [editState, setEditState] = useState(false);
    const [imageState, setImageState] = useState(``);
    const [titleState, setTitleState] = useState(article.title);
    const [contentState, setContentState] = useState(article.content);

    const handleCancelClick = () => {
        setImageState('');
        setTitleState(article.title);
        setContentState(article.content);
        setEditState(false);
    }

    const handleEditSubmit = () => {
        let editedArticle = {}
        if(imageState === ''){
            editedArticle = {
                title: titleState,
                content: contentState,
            }
        } else {
            editedArticle = {
                img: imageState,
                title: titleState,
                content: contentState,
            }
        }
    }
    
    const editHTML = (
        <div>
            <form onSubmit={handleEditSubmit}>
                <label>Select New Image</label>
                <input type='file' value={imageState} onChange={(e) => setImageState(e.target.value)}/>
                <label>Update Title</label>
                <input type='text' value={titleState} onChange={(e) => setTitleState(e.target.value)}/>
                <label>Update Content</label>
                <textarea type='text' value={contentState} onChange={(e) => setContentState(e.target.value)}/>
                <div>
                    <button type='submit'>Submit</button>
                    <button type='button' onClick={handleCancelClick}>Cancel</button>
                </div>
            </form>
        </div>
    )

    const previewHTML = (
        <div className="article-view-article-container">
            <img src={article.img}/>
            <div className='title-user-container'>
                <h1>{article.title}</h1>
                <h2>{article.username}</h2>
            </div>
            <p>{article.content}</p>
            {userInfo && (userInfo.username === article.username && <button type='button' onClick={() => setEditState(true)}>Edit</button>)}
        </div>
    )

    return (
        <div className="article-view-container">
            {editState ? editHTML : previewHTML}
        </div>
    )
}

export default ArticleView