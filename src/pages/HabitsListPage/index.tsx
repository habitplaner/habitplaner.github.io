import HabitItem from '@components/HabitItem';
import PageBody from '@components/Page/PageBody';
import PageContainer from '@components/Page/PageContainer';
import PageFooter from '@components/Page/PageFooter';
import PageHeader from '@components/Page/PageHeader';
import { selectHabits } from '@store/habits/habits.slice';
import { useAppSelector } from '@store/hooks';
import Button from '@ui-kit/Button';
import { NavLink, useLocation } from 'react-router';

const HabitsListPage = () => {
  const { habits, isLoading, loadingError } = useAppSelector(selectHabits);

  const location = useLocation();

  if (isLoading) return <div>Loading habits...</div>;
  if (loadingError) return <div>{loadingError.message}</div>;
  return (
    <PageContainer>
      <PageHeader header="Список привычек" />
      <PageBody>
        {Object.values(habits).map((habit) => {
          return (
            <NavLink to={`/habit/${habit.id}`}>
              <HabitItem habit={habit} key={habit.id} />
            </NavLink>
          );
        })}
      </PageBody>
      <PageFooter>
        <NavLink state={{ from: location }} to="/habit/new">
          <Button>🧸 Новая привычка</Button>
        </NavLink>
      </PageFooter>
    </PageContainer>
  );
};

export default HabitsListPage;
