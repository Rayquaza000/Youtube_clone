import { useEffect, useState, lazy, Suspense } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home.jsx";
import CurrentPlayingVideo from "./Components/CurrentPlayingVideo.jsx";
import MainLayout from "./LayoutComponents/MainLayout.jsx";
import SigninPage from "./Components/SigninPage.jsx";
import SignupPage from "./Components/SignupPage.jsx";
import YoutubeStudio from "./Components/YoutubeStudio.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import { Navigate } from "react-router-dom";
import ErrorPage from "./Components/ErrorPage.jsx";
import SearchWindow from "./Components/SearchWindow.jsx";

function App() {
  const [hamburger, setHamburger] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Restore user session from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUser) {
      setUser(storedUser);
      setSignedIn(true);
    }
  }, []);

  const appRouter = createBrowserRouter([
    {
      element: (<MainLayout setHamburger={setHamburger} hamburger={hamburger} signedIn={signedIn} setSignedIn={setSignedIn} user={user} setUser={setUser} />
      ),
      children: [
        {
          path: "/",
          element: <Home signedIn={signedIn} hamburger={hamburger} />,
        },
        {
          path: "/currentplayingvideo/:id",
          element: <CurrentPlayingVideo signedIn={signedIn} setSignedIn={setSignedIn} user={user} setUser={setUser} />,
        },
        {
          path: "/search/:searchtext",
          element: <SearchWindow />
        }
      ],
    },
    {
      path: "/signin",
      element: signedIn ? <Navigate to="/" replace /> :
        <SigninPage setSignedIn={setSignedIn} user={user} setUser={setUser} />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      // Protected Route for YouTube Studio
      path: "/youtubestudio",
      element: (
        <ProtectedRoute signedIn={signedIn}>
          <YoutubeStudio
            user={user}
            setUser={setUser}
            signedIn={signedIn}
            setSignedIn={setSignedIn}
          />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <ErrorPage />
    }
  ]);

  return (<RouterProvider router={appRouter} />);
}

export default App;
