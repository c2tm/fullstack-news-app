import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Article from "../home/Article";

import './AdminView.css'

function AdminView({setArticle, handleErrors, auth, getUserInfo, setAuth}) {

    const [adminArticles, setAdminArticles] = useState(null)
    const [state, setState] = useState(1);
    const navigate = useNavigate()

    const handleArticleClick = (article) => {
        setArticle(article)
        navigate(`/article/${article.id}`);
    }

    useEffect(() => {
        if(!!Cookies.get('authorization')) {
          const getLoginInfo = async () => {
            const response = await fetch('/rest-auth/user/');
    
            if(!response.ok) {
              throw new Error('Response was not ok!');
            } else {
              const data = await response.json();
              setAuth(data);
            }
          }
          getLoginInfo()
        }
        else {
          return
        }
      }, [])

    useEffect(() => {

        if(auth.is_superuser) {
            const getArticles = async () => {
                const response = await fetch('/api/v1/articles/admin/').catch(handleErrors);
                if (!response.ok) {
                    throw new Error('Response was not ok!');
                } else {
                    const data = await response.json();
                    setAdminArticles(data);
                }
            }
            getArticles()
        }
        else {
            return
        }

    }, [])

    useEffect(() => {

        if(auth.is_superuser) {
            const getArticles = async () => {
                const response = await fetch('/api/v1/articles/admin/').catch(handleErrors);
                if (!response.ok) {
                    throw new Error('Response was not ok!');
                } else {
                    const data = await response.json();
                    setAdminArticles(data);
                }
            }
            getArticles()
        }
        else {
            return
        }

    }, [auth])

    // ask about dupe useeffect

    if (!adminArticles) {
        return (
            <div className='admin-article-list-container'>
                <h1>Loading Articles...</h1>
                <p>Are you sure you're logged into an Admin account?</p>
            </div>
        )
    }

    const articleListHTML = adminArticles.map(article => (
        <Article username={article.authorname} title={article.title} user={article.user} src={article.img} handleArticleClick={handleArticleClick} article={article}/>
    ))

    return (
        <div className="admin-article-list-container">
            <h1>Admin View</h1>
            <ul className="admin-article-list">
                {articleListHTML}
            </ul>
        </div>
    )
}

export default AdminView