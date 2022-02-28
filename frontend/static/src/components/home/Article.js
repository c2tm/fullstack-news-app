function Article({username, title, src, handleArticleClick, article}) {

    return (
        <li className="article" key={article.id} onClick={() => handleArticleClick(article)}>
            <div className="img-container">
                <img className="article-image" src={src} alt="placeholder"/>
                <p className="img-caption">view article</p>
            </div>
            <h1>{title}</h1>
            <h2>{username}</h2>
        </li>
    )
}

export default Article