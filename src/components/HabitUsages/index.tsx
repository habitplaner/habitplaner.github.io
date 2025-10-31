import { getAllUserCalendarHabits } from '@services/calendar.services';
import { useAppSelector } from '@store/hooks';
import { selectUser } from '@store/user/user.slice';
import type { ICalendarHabit } from '@t/calendarHabit.types';
import List from '@ui-kit/List';
import ListItem from '@ui-kit/List/ListItem';
import React from 'react';

const HabitUsages: React.FC<{ idHabit: string }> = ({ idHabit }) => {
  const [data, setData] = React.useState<ICalendarHabit[]>([]);
  const [loading, setLoading] = React.useState(false);
  const user = useAppSelector(selectUser);

  React.useEffect(() => {
    const start = async () => {
      try {
        setLoading(true);
        if (!user?.id) throw new Error('bad user');
        const d = await getAllUserCalendarHabits(user?.id);

        setData(d.filter((ch) => ch.habitId === idHabit));
      } finally {
        setLoading(false);
      }
    };
    start();
  }, [idHabit, user]);

  if (loading) return <div>Usages loading...</div>;

  return (
    <div>
      {data.length > 0 && (
        <List border>
          {data.map((ch) => {
            return (
              <ListItem key={ch.id}>
                {new Date(ch.isoDate).toLocaleDateString()}
                <em>{ch.comment}</em>
                <span style={{ marginLeft: 'auto' }}>
                  {ch.completedAt ? '✅' : '☐'}
                </span>
              </ListItem>
            );
          })}
        </List>
      )}
    </div>
  );
};

export default HabitUsages;
