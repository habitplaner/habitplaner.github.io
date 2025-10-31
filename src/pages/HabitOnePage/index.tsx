import HabitIcon from '@components/HabitIcon';
import HabitUsages from '@components/HabitUsages';
import PageBody from '@components/Page/PageBody';
import PageContainer from '@components/Page/PageContainer';
import PageFooter from '@components/Page/PageFooter';
import PageHeader from '@components/Page/PageHeader';
import { selectHabits } from '@store/habits/habits.slice';
import { useAppSelector } from '@store/hooks';
import Button from '@ui-kit/Button';
import { NavLink, useParams } from 'react-router';

const HabitOnePage = () => {
  const { habits, isLoading } = useAppSelector(selectHabits);
  const p = useParams();
  const habitId = p.id as string;

  const habit = habits[habitId];

  if (isLoading) return <div>Loading...</div>;

  return (
    <PageContainer>
      <PageHeader
        header={
          <>
            <HabitIcon habit={habit} /> &nbsp;{habit.name}
          </>
        }
      />
      <PageBody>
        <div>
          <em>{habit.description}</em>
        </div>
        <div style={{ fontSize: '10px' }}>
          <table border={0} width="100%">
            <tbody>
              <tr>
                <td>Добавлено в календарь</td>
                <td>
                  {habit.createdAt
                    ? new Date(habit.createdAt).toLocaleString()
                    : '-'}
                </td>
              </tr>
              <tr>
                <td>Обновлено</td>
                <td>
                  {habit.updatedAt
                    ? new Date(habit.updatedAt).toLocaleString()
                    : '-'}
                </td>
              </tr>
              <tr>
                {' '}
                <td>Завершено</td>
                <td>
                  {habit.archivedAt
                    ? new Date(habit.archivedAt).toLocaleString()
                    : 'Неа'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <HabitUsages idHabit={habitId} />
      </PageBody>

      <PageFooter>
        <NavLink to={`/habit/${habitId}/edit`}>
          <Button>✏️ &nbsp; Изменить</Button>
        </NavLink>
      </PageFooter>
    </PageContainer>
  );
};

export default HabitOnePage;
