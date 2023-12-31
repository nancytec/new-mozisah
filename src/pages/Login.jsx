import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../assets/group.jpg";
import { useAuth } from "../../AuthContext";

function Login() {
  let navigate = useNavigate();
  const { signIn: contextSignIn } = useAuth(); // Rename to avoid conflict

  const signInWithGoogle = async () => {
    window.scrollTo(0, 0);

    try {
      const result = await signInWithPopup(auth, provider);
      // Authentication was successful
      console.log("User signed in:", result.user.uid);

      // Call the signIn function from the useAuth hook
      contextSignIn(result.user);

      // Show a success toast notification
      toast.success("Signed in successfully", {
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      navigate("/blog");
    } catch (error) {
      // Authentication failed
      console.error("Error signing in:", error);

      // Show an error toast notification
      toast.error("Error signing in. Please try again.", {
        position: "top-right",
        autoClose: 1000, // You can adjust the duration
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-8 px-4">
        <div className="bg-purple-100 relative md:rounded-e-full">
          <img
            src={img}
            alt="image"
            className="overflow-hidden h-[700px] object-cover md:rounded-e-full shadow-2xl rounded-md"
          />
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="shadow-2xl border p-8 rounded-md">
            <p className="text-center font-bold my-8">
              Sign In With Google to Continue
            </p>
            <button
              className="py-2 flex items-center w-fit gap-4 px-6 bg-purple-700 rounded-md text-white"
              onClick={signInWithGoogle}
              aria-label="Sign in with Google"
            >
              <span className="text-2xl">
                <FcGoogle />
              </span>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
