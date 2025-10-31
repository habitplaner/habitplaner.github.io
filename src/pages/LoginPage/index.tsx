import { firebaseSignIn } from '@api/firebase.auth';
import PageContainer from '@components/Page/PageContainer';
import PageHeader from '@components/Page/PageHeader';
import Button from '@ui-kit/Button';

const LoginPage = () => {
  const handleLogin = async () => {
    firebaseSignIn();
  };
  return (
    <PageContainer>
      <PageHeader header="Hello"/>
      <Button onClick={handleLogin}>Login with Google</Button>
    </PageContainer>
  );
};

export default LoginPage;
