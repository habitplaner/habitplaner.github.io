import CalendarHabitModal from '@components/CalendarHabitModal';
import { selectHabitAsync } from '@components/HabitSelector/HabitSelector';
import PageBody from '@components/Page/PageBody';
import PageContainer from '@components/Page/PageContainer';
import PageFooter from '@components/Page/PageFooter';
import PageHeader from '@components/Page/PageHeader';
import {
  addCalendarHabit,
  deleteCalendarHabit,
  updateCalendarHabit,
} from '@store/calendar/calendar.actions';
import {
  selectCalendar,
  setSelectedDate,
} from '@store/calendar/calendar.slice';
import { selectHabits } from '@store/habits/habits.slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import Button, { ButtonVariant } from '@ui-kit/Button';
import List from '@ui-kit/List';
import { showModal } from '@ui-kit/Modal/showModal';
import Placeholder from '@ui-kit/Placeholder';

import DayHabitItem from './DayHabitItem';

interface IDayHabitsProps {
  day: string;
}

const DayHabits: React.FC<IDayHabitsProps> = ({ day }) => {
  const { calendarHabits } = useAppSelector(selectCalendar);
  const { habits } = useAppSelector(selectHabits);
  const dispatch = useAppDispatch();
  const dayHabits = calendarHabits.filter((ch) => ch.isoDate === day);
  const date = new Date(day);
  return (
    <PageContainer>
      <PageHeader
        header={new Date(day).toLocaleDateString('default', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        })}
      >
        <Button
          variant={ButtonVariant.transparent}
          onClick={() => dispatch(setSelectedDate(null))}
        >
          ✕
        </Button>
      </PageHeader>
      <PageBody style={{ height: 0 }}>
        {!dayHabits.length && (
          <Placeholder>
            <div>
              Нет привычек на этот день
              <br />
              <small>
                {date.toLocaleDateString('default', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </small>
            </div>
          </Placeholder>
        )}
        {dayHabits.length > 0 && (
          <List border>
            {dayHabits.map((ch) => {
              const habit = habits[ch.habitId];
              return (
                <DayHabitItem
                  key={ch.id}
                  habit={habit}
                  calendarHabit={ch}
                  onClick={() => {
                    showModal({
                      title:
                        habit.name +
                        ' | ' +
                        new Date(ch.isoDate).toLocaleDateString(),
                      children: (clos) => (
                        <CalendarHabitModal
                          calendarHabit={ch}
                          habit={habit}
                          onSave={(patch) => {
                            clos();
                            console.log({ patch });
                            dispatch(updateCalendarHabit({ ...ch, ...patch }));
                          }}
                          onDelete={() => {
                            clos();
                            dispatch(deleteCalendarHabit(ch));
                          }}
                        />
                      ),
                    });
                  }}
                />
              );
            })}
          </List>
        )}
      </PageBody>
      <PageFooter>
        <Button
          onClick={async () => {
            const selectedHabit = await selectHabitAsync({
              habits: Object.values(habits),
            });
            dispatch(addCalendarHabit({ date, habitId: selectedHabit.id }));
          }}
          variant={ButtonVariant.transparent}
        >
          Добавить из списка
        </Button>
      </PageFooter>
    </PageContainer>
  );
};

export default DayHabits;
