import HabitItem from '@components/HabitItem';
import PageBody from '@components/Page/PageBody';
import PageContainer from '@components/Page/PageContainer';
import PageFooter from '@components/Page/PageFooter';
import PageHeader from '@components/Page/PageHeader';
import { selectHabits } from '@store/habits/habits.slice';
import { useAppSelector } from '@store/hooks';
import Button from '@ui-kit/Button';
import Placeholder from '@ui-kit/Placeholder';
import { NavLink, useLocation } from 'react-router';

const HabitsListPage = () => {
  const { habits, isLoading, loadingError } = useAppSelector(selectHabits);

  const location = useLocation();

  if (isLoading) return <div>Loading habits...</div>;
  if (loadingError) return <div>{loadingError.message}</div>;
  const all = Object.values(habits);
  return (
    <PageContainer>
      <PageHeader header="Список привычек" />
      <PageBody>
        {        !all.length && <Placeholder>
          <p style={{textAlign:'center'}}>
          Список привычек пуст.
          <br />
          <NavLink to="/habit/new">Добавьте</NavLink> свою первую привычку
          </p>
        </Placeholder>}
        {all.map((habit) => {
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
