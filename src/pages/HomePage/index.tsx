import PageBody from '@components/Page/PageBody';
import PageContainer from '@components/Page/PageContainer';
import PageHeader from '@components/Page/PageHeader';
import { NavLink } from 'react-router';

const HomePage = () => {
  return (
    <PageContainer>
      <PageHeader header="Home Page" />
      <PageBody>
        <NavLink to="/calendar" end>
          🗓️ Calendar
        </NavLink>
        <br />
        <NavLink to="/habits" end>
          📋 Habits
        </NavLink>
      </PageBody>
    </PageContainer>
  );
};

export default HomePage;
