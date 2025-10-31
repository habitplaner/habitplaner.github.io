import HabitEditForm from '@components/HabitEditForm';
import PageBody from '@components/Page/PageBody';
import PageContainer from '@components/Page/PageContainer';
import PageHeader from '@components/Page/PageHeader';
import { updateHabit } from '@store/habits/habits.actions';
import { selectHabits } from '@store/habits/habits.slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import type { IHabit } from '@t/habit.types';
import { useLocation, useNavigate, useParams } from 'react-router';

const HabitEditPage = () => {
  const p = useParams();
  const { savingError, isSaving, habits } = useAppSelector(selectHabits);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSave = async (d: IHabit) => {
    await dispatch(updateHabit(d)).unwrap();
    navigate(location.state?.from ? location.state.from : '/habits');
  };

  const handleCancel = () => {
    navigate(location.state?.from ? location.state.from : '/habits');
  };

  return (
    <PageContainer>
      <PageHeader header="Редактирование привычки" />
      <PageBody>
        <HabitEditForm
          habit={habits[p.id as string]}
          onSave={handleSave}
          onCancel={handleCancel}
          disabled={isSaving}
          style={{ height: '100%' }}
        />
        {savingError && (
          <div style={{ color: 'red', padding: 24 }}>{savingError.message}</div>
        )}
      </PageBody>
    </PageContainer>
  );
};

export default HabitEditPage;
