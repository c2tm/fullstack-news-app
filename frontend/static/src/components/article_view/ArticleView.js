import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import { useParams, useNavigate } from 'react-router-dom';
import './ArticleView.css'

function ArticleView({article, setArticle, handleErrors, auth, setAuth}) {

    const [editState, setEditState] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [imageState, setImageState] = useState(``);
    const [titleState, setTitleState] = useState('');
    const [contentState, setContentState] = useState('');

    const navigate = useNavigate()
    let params = useParams();


    useEffect(() => {
        if(Cookies.get('authorization') && !article) {
            const getArticle = async () => {
                 const response = await fetch(`/api/v1/articles/creator/${params.articleId}/`).catch(handleErrors)
                 if(!response) {
                     throw new Error('Response was not ok!')
                 } else {
                     const data = await response.json()
                     setArticle(data)
                     setTitleState(data.title)
                     setContentState(data.content)
                     
                 }
            }
            getArticle()
        }
        else {
            return
        }
    },[])

    useEffect(() => {
        if(Cookies.get('authorization') && !article) {
            const getArticle = async () => {
                 const response = await fetch(`/api/v1/articles/creator/${params.articleId}/`).catch(handleErrors)
                 if(!response) {
                     throw new Error('Response was not ok!')
                 } else {
                     const data = await response.json()
                     setArticle(data)
                     setTitleState(data.title)
                     setContentState(data.content)
                     
                 }
            }
            getArticle()
        }
        else {
            return
        }
    },[])
       
    useEffect(() => {
        if(!Cookies.get('authorization') && !article) {
            const getArticle = async () => {
                 const response = await fetch(`/api/v1/articles/${params.articleId}/`).catch(handleErrors);
                 if(!response) {
                     throw new Error('Response was not ok!');
                 } else {
                     const data = await response.json();
                     setArticle(data);
                     setTitleState(data.title);
                     setContentState(data.content);
                     
                 }
            }
            getArticle();
        }
        else {
            return 
        }
    },[])

    useEffect(() => {
        if(!userInfo && Cookies.get('authorization')) {
            const getUser = async () => {
                const response = await fetch('/rest-auth/user/').catch(handleErrors);

                if(!response.ok) {
                    throw new Error('Response was not ok!');
                } else {
                    const data = await response.json();
                    setUserInfo(data);
                }
            }
            getUser();
        }
        else {
            return
        }
    }, [])


    const handleCancelClick = () => {
        setImageState('');
        setTitleState(article.title);
        setContentState(article.content);
        setEditState(false);
    }

    const handleDelete = () => {
        const deleteArticle = async() => {
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                }
            }
            const response = await fetch(`/api/v1/articles/creator/${params.articleId}/`, options)

            if(!response.ok) {
                throw new Error('Response was not ok!')
            }
        } 
        deleteArticle()
        navigate(-1);
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if(imageState === ``) {
            const articleInfo = {
                author: userInfo.username,
                content: contentState,
                title: titleState,
                phase: 'SB',
            }
            const submitArticle = async () => {
                const options = {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/JSON',
                        'X-CSRFToken': Cookies.get('csrftoken'),
                    },
                    body: JSON.stringify(articleInfo),
                }
                const response = await fetch(`/api/v1/articles/creator/${article.id}/`, options).catch(handleErrors);

                if(!response.ok) {
                    throw new Error('Response was not ok!');
                } else {
                    const editedArticle = {
                        author: userInfo.username,
                    content: contentState,
                    img: article.img,
                    title: titleState,
                    phase: 'SB',
                    }
                    setArticle(editedArticle)
                }
            }
            submitArticle();
            setEditState(false);
        }
        else {
            const articleInfo = {
                author: userInfo.username,
                content: contentState,
                img: imageState,
                title: titleState,
                phase: 'SB',
            }
            const submitArticle = async () => {
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/JSON',
                        'X-CSRFToken': Cookies.get('csrftoken'),
                    },
                    body: JSON.stringify(articleInfo),
                }
                const response = await fetch(`/creator/${article.id}`, options).catch(handleErrors);

                if(!response.ok) {
                    throw new Error('Response was not ok!')
                } else {
                    const editedArticle = {
                        author: userInfo.username,
                        content: contentState,
                        img: imageState,
                        title: titleState,
                        phase: 'SB',
                    }
                    setArticle(editedArticle)
                }
            }
            submitArticle()
            setEditState(false);
        }
    }

    const handleSubmitForReview = () => {

        console.log('iran')

        const articleInfo = {
            phase: 'SB',
        }

        const submitArticle = async () => {
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/JSON',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
                body: JSON.stringify(articleInfo),
            }
            const response = await fetch(`/api/v1/articles/creator/${article.id}/`, options).catch(handleErrors);

            if(!response.ok) {
                throw new Error('Response was not ok!');
            } else {
                const copyArticle = article
                article.phase = 'SB'
                setArticle(copyArticle)
            }
        }
        submitArticle();
        navigate(-1);
    }

    if(!article) {
        return (
            <h1>No Article Loaded...</h1>
        )
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
                <h2>{article.authorname}</h2>
            </div>
            <p>{article.content}</p>
            {userInfo && ((userInfo.username === article.authorname && (article.phase === 'DR' || article.phase === 'Draft')) && <button type='button' onClick={() => setEditState(true)}>Edit</button>)}
            {userInfo && ((userInfo.username === article.authorname && (article.phase === 'DR' || article.phase === 'Draft')) && <button type='button' onClick={() => handleSubmitForReview()}>Submit for Review</button>)}
            {(article.phase === 'DR' || article.phase === 'RJ' || article.phase === 'Draft' || article.phase === 'Rejected') && <button type='button' onClick={handleDelete}>Delete</button>}
        </div>
    )

    return (
        <div className="article-view-container">
            {editState ? editHTML : previewHTML}
        </div>
    )
}

export default ArticleView