import { signIn } from "@junobuild/core";
import { authSubscribe } from "@junobuild/core";
export const Login = () => {
  //TODO: STEP_2_AUTH_SIGN_IN
  // onClick={signIn}
  const buttonClick = () => {
    signIn();
    authSubscribe((user) => {
      console.log("User:", user);
      sessionStorage.setItem("user", user.owner);
    });
  }
  return (
    <div className="flex items-center justify-center gap-x-6">
      <button
        type="button"
        onClick={buttonClick}
      >
        <div className="flex items-center justify-center gap-1.5 text-white">
          Sign In
        </div>
      </button>
    </div>
  );
};
