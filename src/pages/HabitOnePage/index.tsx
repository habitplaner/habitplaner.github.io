import HabitIcon from '@components/HabitIcon';
import PageBody from '@components/Page/PageBody';
import PageContainer from '@components/Page/PageContainer';
import PageFooter from '@components/Page/PageFooter';
import PageHeader from '@components/Page/PageHeader';
import { selectHabits } from '@store/habits/habits.slice';
import { useAppSelector } from '@store/hooks';
import Button from '@ui-kit/Button';
import { NavLink, useParams } from 'react-router';

const HabitOnePage = () => {
  const { habits } = useAppSelector(selectHabits);
  const p = useParams();
  const habitId = p.id as string;

  const habit = habits[habitId];

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
        <p>{habit.description}</p>
        <div style={{ fontSize: '10px' }}>
          <dl>
            <dt>Добавлено в календарь</dt>
            <dd>
              {habit.createdAt
                ? new Date(habit.createdAt).toLocaleString()
                : '-'}
            </dd>
            <dt>Обновлено</dt>
            <dd>
              {habit.updatedAt
                ? new Date(habit.updatedAt).toLocaleString()
                : '-'}
            </dd>
            <dt>Архив</dt>
            <dd>
              {habit.archivedAt
                ? new Date(habit.archivedAt).toLocaleString()
                : 'Неа'}
            </dd>
          </dl>
        </div>
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
