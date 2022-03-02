function ArticleCV({username, title, src, handleArticleClick, article}) {

    const phaseNameTranslate = () => {
        if (article.phase === 'DR') {
            let copyArticle = article;
            copyArticle.phase = 'Draft';
            article=copyArticle;
        } else if (article.phase === 'SB') {
            let copyArticle = article;
            copyArticle.phase = 'Submitted';
            article=copyArticle;
        } else if (article.phase === 'RJ') {
            let copyArticle = article;
            copyArticle.phase = 'Rejected';
            article=copyArticle;
        } else if (article.phase === 'PB') {
            let copyArticle = article;
            copyArticle.phase = 'Published';
            article=copyArticle;
        } else if (article.phase === 'AR') {
            let copyArticle = article;
            copyArticle.phase = 'Archived';
            article=copyArticle;
        }
    }
    phaseNameTranslate()

    return (
        <li className="article" key={article.id} onClick={() => handleArticleClick(article)}>
            <div className="img-container">
                <img className="article-image" src={src} alt="placeholder"/>
                <p className="img-caption">view article</p>
            </div>
            <h1>{title}</h1>
            <h2>{article.phase}</h2>
        </li>
    )
}

export default ArticleCV