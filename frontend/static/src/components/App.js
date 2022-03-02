import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css';

import Home from './home/Home'
import ArticleView from './article_view/ArticleView';
import LoginForm from './login_form/LoginForm'
import ArticleCreation from './article_creation/ArticleCreation';
import AdminView from './admin_view/AdminView';

function App() {

  const [auth, setAuth] = useState(false);
  const [articles, setArticles] = useState(null);
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();

  const getUserInfo = useEffect(() => {
    if(!!Cookies.get('authorization')) {
      const getLoginInfo = async () => {
        const response = await fetch('/rest-auth/user/')

        if(!response.ok) {
          throw new Error('Response was not ok!')
        } else {
          const data = await response.json()
          setAuth(data)
        }
      }
      getLoginInfo()
    }
    else {
      return
    }
  }, [])

  const handleErrors = (err) => {
    console.warn(err);
}

  const handleLogoutClick = () => {
      const logout = async () => {
          const options = {
              method: 'POST',
              headers: {
                  'Content-type': 'application/json',
                  'X-CSRFToken': Cookies.get('csrftoken'),
              },
          }
          const response = await fetch('/rest-auth/logout/', options).catch(handleErrors);

          if(!response.ok) {
              throw new Error('Response was not ok!')
          } else {
            Cookies.remove('authorization')
          }
      }
      logout();
      setAuth(null);
      navigate('/');
  }


  const loginButtonHTML = (
    <button type="button" onClick={() => navigate('login/')}>Login</button>
  )

  const logoutButtonHTML = (
    <button type="button" onClick={handleLogoutClick}>Logout</button>
  )

  const createButtonHTML = (
    <button type="button" onClick={() => navigate('creator/')}>Create Article</button>
  )

  const adminViewButton = (
    <button type="button" onClick={() => navigate('admin/')}>Admin</button>
  )

  const isSuperUser = () => auth ? auth.is_superuser ? true : false : false;

  return (
    <div className="Appp">
      <nav className='navbar'>
        <button onClick={() => navigate('/')}>Home</button>
        {auth ? logoutButtonHTML : loginButtonHTML}
        {auth && createButtonHTML}
        {isSuperUser() && adminViewButton}
      </nav>
      <Routes path="/">
        <Route path="/" element={<Home setArticle={setArticle} articles={articles} setArticles={setArticles}/>}/>
        <Route path="article/:articleId/" element={<ArticleView article={article} setArticle={setArticle} articles={articles} setArticles={setArticles} handleErrors={handleErrors} setAuth={setAuth} auth={auth}/>}/>
        <Route path="login/" element={<LoginForm setAuth={setAuth}/>}/>
        <Route path="creator/" element={<ArticleCreation setArticle={setArticle}/>}/>
        <Route path="admin/" element={<AdminView articles={articles} setArticles={setArticles} setArticle={setArticle} handleErrors={handleErrors} auth={auth} getUserInfo={getUserInfo} setAuth={setAuth}/>}/>
      </Routes>
    
    </div>
  );
}

export default App;
