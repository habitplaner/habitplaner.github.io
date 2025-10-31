import PageBody from '@components/Page/PageBody';
import PageContainer from '@components/Page/PageContainer';
import PageHeader from '@components/Page/PageHeader';
import { getHabits } from '@store/habits/habits.actions';
import { selectHabits } from '@store/habits/habits.slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import React from 'react';

import HabitCardItem from './HabitsCardItem';
import styles from './styles.module.css';

const HabitsCard = () => {
  const { habits, isLoading, loadingError } = useAppSelector(selectHabits);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (Object.keys(habits).length || isLoading) return;
    dispatch(getHabits());
    console.log('Effect');
  }, [habits, isLoading, dispatch]);

  if (isLoading) return <div>Loading habits...</div>;
  if (loadingError) return <div>{loadingError.message}</div>;

  return (
    <PageContainer>
      <PageHeader header="Привычки" />
      <PageBody>
        <div className={styles.habitsList}>
          {Object.values(habits).map((h) => (
            <HabitCardItem habit={h} key={h.id} />
          ))}
        </div>
      </PageBody>
    </PageContainer>
  );
};

export default HabitsCard;
