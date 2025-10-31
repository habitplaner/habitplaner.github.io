import { firebaseSignIn } from '@api/firebase.auth';

const LoginPage = () => {
  const handleLogin = async () => {
    firebaseSignIn();
  };
  return (
    <section>
      <button onClick={handleLogin}>login with Google</button>
    </section>
  );
};

export default LoginPage;
