import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ isAuth, setIsAuth }) => {
  const navigate = useNavigate();

  const signOutUser = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/login");
    });
  };

  return (
    <div>
      <nav class="bg-white shadow">
        <div class="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize">
          <Link
            to="/"
            class="text-gray-800 transition-colors duration-300 transform border-blue-500 mx-1.5 sm:mx-6"
          >
            home
          </Link>

          {!isAuth ? (
            <Link
              to="/login"
              class="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform  hover:border-blue-500 mx-1.5 sm:mx-6"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/createpost"
                className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform  hover:border-blue-500 mx-1.5 sm:mx-6"
              >
                Createpost
              </Link>
              <button onClick={signOutUser} className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform  hover:border-blue-500 mx-1.5 sm:mx-6">Logout</button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
