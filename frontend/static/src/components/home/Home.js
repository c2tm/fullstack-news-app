import { useEffect, useState } from "react"
import './Home.css'
import Article from './Article'

function Home({setState, setArticle}) {

    const [articles, setArticles] = useState(null)

    const handleArticleClick = (article) => {
        setArticle(article)
        setState(2)
    }

    const handleErrors = (err) => {
        console.warn(err);
    }

    useEffect(() => {
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
    }, [])

    if (!articles) {
        return (
            <div>
                <h1>Fetching data...</h1>
            </div>
        )
    }

    const articleListHTML = articles.map(article => (
        <Article username={article.username} title={article.title} user={article.user} src={article.img} handleArticleClick={handleArticleClick} article={article}/>
    ))

 
    return (
        <div>
            <ul className="article-container">
                <h1>All Articles</h1>
                <div>
                    {articleListHTML}
                </div>
                    
            </ul> 
        </div>
        )
    


    

   
    
}

export default Home