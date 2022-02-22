function Article({username, title, src, handleArticleClick, article}) {

    return (
        <li className="article" onClick={() => handleArticleClick(article)}>
            <img className="article-image" src={src} alt="placeholder"/>
            <h1>{title}</h1>
            <h2>{username}</h2>
        </li>
    )
}

export default Article