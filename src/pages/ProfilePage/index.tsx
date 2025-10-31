import { firebaseSignOut } from '@api/firebase.auth';
import { useAppSelector } from '@store/hooks';
import { selectUser } from '@store/user/user.slice';
import { useNavigate } from 'react-router';

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const handleLogout = () => {
    firebaseSignOut();
    navigate('/home');
  };
  return (
    <section style={{ textAlign: 'center' }}>
      <h2>{user?.fullName}</h2>
      <img src={user?.photo} alt="" />
      <br />
      <br />
      <br />
      <button onClick={handleLogout}>Logout</button>
    </section>
  );
};

export default ProfilePage;
