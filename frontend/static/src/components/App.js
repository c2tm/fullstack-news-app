import { useState } from 'react';
import Cookies from 'js-cookie'
import './App.css';

import Home from './home/Home'
import ArticleView from './article_view/ArticleView';
import LoginForm from './login_form/LoginForm'
import ArticleCreation from './article_creation/ArticleCreation';

function App() {

  const [state, setState] = useState(1);
  const [article, setArticle] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

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
          const response = await fetch('rest-auth/logout/', options).catch(handleErrors);

          if(!response.ok) {
              throw new Error('Response was not ok!')
          }
      }
      logout();
      setUserInfo(null);
      setUserLogin(false);
  }

  const loginButtonHTML = (
    <button type="button" onClick={() => setState(3)}>Login</button>
  )

  const logoutButtonHTML = (
    <button type="button" onClick={handleLogoutClick}>Logout</button>
  )

  const createButtonHTML = (
    <button type="button" onClick={() => setState(4)}>Create Article</button>
  )

  return (
    <div className="App">
      <nav className='navbar'>
        <button onClick={() => setState(1)}>Home</button>
        {userLogin ? logoutButtonHTML : loginButtonHTML}
        {userLogin && createButtonHTML}
      </nav>
      {state == 1 && <Home setArticle={setArticle} setState={setState} />}
      {state == 2 && <ArticleView article={article} userInfo={userInfo}/>}
      {state == 3 && <LoginForm setState={setState} setUserLogin={setUserLogin} setUserInfo={setUserInfo}/>}
      {state == 4 && <ArticleCreation/>}
      {/* {state == 5 && <AdminView/>} */}
    </div>
  );
}

export default App;
