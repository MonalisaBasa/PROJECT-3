import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  const ctx=useContext(AuthContext);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // use useEffect if we normally execute the code that if condition will render everytime with function execution,
  // but by using useEffect it execute when any changes(dependency changes) made .

  // Normal Execute with if condition just below code.
  //  const storeLoggedInInformation = localStorage.getItem('isLoggedIn');
  //   if(storeLoggedInInformation === '1'){
  //     setIsLoggedIn(true);
  //   }
  // }

  // useEffect(()=>{
  //   const storeLoggedInInformation = localStorage.getItem('isLoggedIn');

  //   if(storeLoggedInInformation === '1'){
  //     setIsLoggedIn(true);
  //   }
  // },[]);

  // const loginHandler = (email, password) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways
  //   localStorage.setItem('isLoggedIn','1');
  //   setIsLoggedIn(true);
  // };

  // const logoutHandler = () => {
  //   setIsLoggedIn(false);
  // };

  return (
     
      // <AuthContext.Provider 
      // value={{
      //   isLoggedIn: isLoggedIn,
      //   onLogout: logoutHandler
      //   }}
      // >
      <React.Fragment>
      <MainHeader  />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home  />}
      </main>
      </React.Fragment>
      // </AuthContext.Provider>
    
  );
}

export default App;
