import HabitEditForm from '@components/HabitEditForm';
import PageBody from '@components/Page/PageBody';
import PageContainer from '@components/Page/PageContainer';
import PageHeader from '@components/Page/PageHeader';
import { addHabit } from '@store/habits/habits.actions';
import { selectHabits } from '@store/habits/habits.slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import type { IHabit } from '@t/habit.types';
import { useLocation, useNavigate } from 'react-router';

const HabitAddPage = () => {
  const { savingError, isSaving } = useAppSelector(selectHabits);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSave = async (d: IHabit) => {
    await dispatch(addHabit(d)).unwrap();
    navigate(location.state?.from ? location.state.from : '/habits');
  };

  const handleCancel = () => {
    navigate(location.state?.from ? location.state.from : '/habits');
  };

  return (
    <PageContainer>
      <PageHeader header="Добавление привычки" />
      <PageBody>
        <HabitEditForm
          onSave={handleSave}
          disabled={isSaving}
          onCancel={handleCancel}
          style={{ height: '100%' }}
        />
        {savingError && (
          <div style={{ color: 'red', padding: 24 }}>{savingError.message}</div>
        )}
      </PageBody>
    </PageContainer>
  );
};

export default HabitAddPage;
