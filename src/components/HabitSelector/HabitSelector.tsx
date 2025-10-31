import HabitItem from '@components/HabitItem';
import type { IHabit } from '@t/habit.types';
import List from '@ui-kit/List';
import { showModal } from '@ui-kit/Modal/showModal';

interface IHabitSelectorProps {
  habits: IHabit[];
  //onSelect: (habit: IHabit) => void;
}

export const selectHabitAsync = (
  props: IHabitSelectorProps
): Promise<IHabit> => {
  return new Promise((res) => {
    showModal({
      title: 'Выбор привычки',
      children: (clos) => (
        <List border>
          {props.habits.map((habit) => {
            return (
              <HabitItem
                key={habit.id}
                habit={habit}
                onClick={() => {
                  res(habit);
                  clos();
                }}
              />
            );
          })}
        </List>
      ),
    });
  });
};
