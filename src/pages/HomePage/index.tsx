import PageBody from '@components/Page/PageBody';
import PageContainer from '@components/Page/PageContainer';
import PageHeader from '@components/Page/PageHeader';
import Button from '@ui-kit/Button';
import { NavLink } from 'react-router';

const HomePage = () => {
  return (
    <PageContainer>
      <PageHeader header="Home Page" />
      <PageBody style={{ alignItems: 'center', justifyContent: 'center', display:'flex', flexDirection:'column' }}>
      <NavLink to="/calendar" end>
          <Button>🗓️ Calendar</Button>
        </NavLink>
        <br />
        <NavLink to="/habits" end>
          <Button>📋 Habits</Button>
        </NavLink>
      </PageBody>
    </PageContainer>
  );
};

export default HomePage;
