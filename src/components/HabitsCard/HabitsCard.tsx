import PageBody from '@components/Page/PageBody';
import PageContainer from '@components/Page/PageContainer';
import PageHeader from '@components/Page/PageHeader';
import { selectHabits } from '@store/habits/habits.slice';
import { useAppSelector } from '@store/hooks';

import HabitCardItem from './HabitsCardItem';
import styles from './styles.module.css';
import Placeholder from '@ui-kit/Placeholder';
import { NavLink } from 'react-router';

const HabitsCard = () => {
  const { habits, isLoading, loadingError } = useAppSelector(selectHabits);

  if (isLoading) return <div>Loading habits...</div>;
  if (loadingError) return <div>{loadingError.message}</div>;

  const all = Object.values(habits);
  return (
    <PageContainer>
      <PageHeader header="Привычки" />
      <PageBody>
        {!all.length && <Placeholder>
          <p style={{textAlign:'center'}}>
          <NavLink to="/habit/new">Добавьте</NavLink> свою первую привычку в <NavLink to="/habits">список</NavLink> и перетаскивайте на календарь
          </p>
        </Placeholder>}
        <div className={styles.habitsList}>
          {all.map((h) => (
            <HabitCardItem habit={h} key={h.id} />
          ))}
        </div>
      </PageBody>
    </PageContainer>
  );
};

export default HabitsCard;
