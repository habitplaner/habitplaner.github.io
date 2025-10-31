import { firebaseSignOut } from '@api/firebase.auth';
import PageContainer from '@components/Page/PageContainer';
import { useAppSelector } from '@store/hooks';
import { selectUser } from '@store/user/user.slice';
import Button from '@ui-kit/Button';
import { useNavigate } from 'react-router';

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const handleLogout = () => {
    firebaseSignOut();
    navigate('/home');
  };
  return (
    <PageContainer style={{ textAlign: 'center' }}>
      <p>
      <h2>{user?.fullName}</h2>
      <img src={user?.photo} alt="" style={{maxWidth:100}} />
      <br />
      <br />
      <br />
      <Button onClick={handleLogout}>Logout 🚪</Button>
      </p>
    </PageContainer>
  );
};

export default ProfilePage;
