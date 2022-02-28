import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Article from "../home/Article";

import './ArticleCreation.css';

function ArticleCreation({setArticle}) {

    const [authorArticles, setAuthorArticles] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(!authorArticles) {
            const getAutherArticles = async () => {
                const response = await fetch('/api/v1/articles/creator/')
    
                if(!response.ok) {
                    throw new Error('Reponse was not ok!')
                } else {
                    const data = await response.json();
                    setAuthorArticles(data);
                }
            }
            getAutherArticles()
        }
    }, [])

    const handleArticleClick = (article) => {
        setArticle(article)
        navigate(`/article/${article.id}`);
    }

    if(!authorArticles) {
        return (
            <div>
                <h1>Articles Loading...</h1>
                <p>Are you sure you're a creator or signed in?</p>
            </div>
        )
    }

    const articleListHTML = authorArticles.map(article => (
        <Article username={article.authorname} title={article.title} user={article.user} src={article.img} handleArticleClick={handleArticleClick} article={article}/>
    ))

    return (
        <div className="author-article-list-container">
            <h1>Your Articles</h1>
            <ul className="author-article-list">
                {articleListHTML}
            </ul>
        </div>
    )
}

export default ArticleCreation