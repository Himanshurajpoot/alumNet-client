import { useAuth } from '../utils/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import { Route, Routes } from 'react-router-dom'
import NoMatch from "./Nomatch";
import Feed from "./Feed";
import Headers from "./Header";
import CreatePost from "./CreatePost";
import Alumni from "./Alumni";
import Events from "./Events";
import { profileURL } from '../utils/constant';

function App() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const key = localStorage.getItem('jwt');
    console.log(key);

    if (key) {
      fetch(profileURL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${key}`
        }
      })
        .then(async (res) => {
          if (!res.ok) {
            return await res.json().then(({ message }) => {
              return Promise.reject(message);
            });
          }
          return await res.json();
        })
        .then((data) => auth.login(data.user))
        .catch((error) => {
          auth.logout();
          navigate('/');
          alert(error);
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }

  }, [])

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg font-semibold text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Headers />
    
      {auth.user && auth.user?.token ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />}
    </>
  );
}


function UnAuthenticatedRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoMatch />} />
          <Route path="/feed" element={<Feed />} />
      </Routes>

    </>
  );
}




function AuthenticatedRoutes() {
  return (
    <>
      <Routes>
        <Route path="/profile" element={<Profile />} />
          <Route path="/feed" element={<Feed />} />
        <Route path="/events" element={<Events />} />
        <Route path="/post/create" element={<CreatePost />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>


    </>
  )
}

export default App;
