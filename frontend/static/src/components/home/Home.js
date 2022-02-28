import { useEffect, useState } from "react"
import './Home.css'
import Article from './Article'
import { useNavigate } from "react-router-dom"

function Home({setArticle, articles, setArticles}) {

    const navigate = useNavigate();

    const handleArticleClick = (article) => {
        setArticle(article)
        navigate(`/article/${article.id}`);
    }

    const handleErrors = (err) => {
        console.warn(err);
    }

    useEffect(() => {
        if (!articles) {
            const getArticles = async () => {
                const response = await fetch('api/v1/articles/').catch(handleErrors);
                if (!response.ok) {
                    throw new Error('Response was not ok!');
                } else {
                    const data = await response.json();
                    setArticles(data);
                }
            }
            getArticles()
        }
        else {
            return
        }
    }, [])

    if (!articles) {
        return (
            <div>
                <h1>Fetching data...</h1>
            </div>
        )
    }

    const articleListHTML = articles.map(article => (
        <Article username={article.authorname} title={article.title} user={article.user} src={article.img} handleArticleClick={handleArticleClick} article={article}/>
    ))

 
    return (
        <div>
            <div className="all-articles-container">
                <h1>Featured Articles</h1>
                <ul className="article-container">
                    {articleListHTML}
                </ul>
                    
            </div> 
        </div>
        )
    


    

   
    
}

export default Home