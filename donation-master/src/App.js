/* eslint-disable react-hooks/exhaustive-deps */
import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ContextProvider from "./context/ContextProvider";
import Loader from "./components/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBarAllNgo from "./components/Ngo/AllNgo/NavBarAllNgo";
import useAuth from "./hooks/useAuth";
import UserProfile from "./components/User/UserProfile";
const Landing = lazy(() => import("./components/Landing"));
const Navbar = lazy(() => import("./components/User/Navbar"));
const Register = lazy(() => import("./components/Register"));
const Login = lazy(() => import("./components/Login"));
const NavBarNgo = lazy(() => import("./components/Ngo/NavBarNgo"));
const Dashboard = lazy(() => import("./components/Ngo/Dashboard"));
const Profile = lazy(() => import("./components/Ngo/Profile"));
const About = lazy(() => import("./components/About"));
const Posts = lazy(() => import("./components/Ngo/Posts"));
const DashBoardMoreDetails = lazy(() =>
  import("./components/Ngo/DashBoardMoreDetails")
);

const MakeDonations = lazy(() => import("./components/User/MakeDonations"));
const UserHome = lazy(() => import("./components/User/UserHome"));
const Money = lazy(() => import("./components/User/Money"));
const Allngo = lazy(() => import("./components/Ngo/AllNgo/Allngo"));
const TrackDonation = lazy(() => import("./components/User/TrackDonation"));

function App() {
  const location = useLocation();
  const { user, ngo } = useAuth();

  return (
    <Suspense fallback={<Loader dimension={10} />}>
      <ContextProvider>
        {location.pathname.startsWith("/user") && user && <Navbar />}
        {location.pathname.startsWith("/ngo") && ngo && <NavBarNgo />}
        {location.pathname.match("/ngos") && <NavBarAllNgo />}

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/ngos" element={<Allngo />}></Route>
          <Route path="/user/signup" element={<Register type="User" />} />
          <Route path="/user/login" element={<Login type="User" />} />
          <Route path="/user/donate" element={<MakeDonations />} />
          <Route path="/user/money" element={<Money />} />
          <Route path="/ngo/signup" element={<Register type="Ngo" />} />
          <Route path="/ngo/login" element={<Login type="Ngo" />} />
          <Route path="/ngo/dashboard" element={<Dashboard />} />
          <Route path="/ngo/profile" element={<Profile />} />
          <Route path="/ngo" element={<Posts />} />
          <Route path="/partners" element={<Allngo />} />
          <Route path="/ngo/dashmore" element={<DashBoardMoreDetails />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user" element={<UserHome />} />
          <Route path="/user/donations" element={<TrackDonation />} />

          {/* <Route path="/user" element={<Comp />} />
            <Route path="/ngo" element={<Comp />} /> */}
        </Routes>
      </ContextProvider>
      <ToastContainer
        position="bottom-right"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        autoClose={2000}
      />
    </Suspense>
  );
}

export default App;
