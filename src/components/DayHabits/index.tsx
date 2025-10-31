import CalendarHabitModal from '@components/CalendarHabitModal';
import PageBody from '@components/Page/PageBody';
import PageContainer from '@components/Page/PageContainer';
import PageHeader from '@components/Page/PageHeader';
import {
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
import { showModal } from '@ui-kit/Modal/showModal';

import DayHabitItem from './DayHabitItem';

interface IDayHabitsProps {
  day: string;
}

const DayHabits: React.FC<IDayHabitsProps> = ({ day }) => {
  const { calendarHabits } = useAppSelector(selectCalendar);
  const { habits } = useAppSelector(selectHabits);
  const dispatch = useAppDispatch();
  return (
    <PageContainer>
      <PageHeader header={new Date(day).toLocaleDateString('default', {weekday:'short', day:'numeric', month:'short'})}>
        <Button
          variant={ButtonVariant.transparent}
          onClick={() => dispatch(setSelectedDate(null))}
        >
          ✕
        </Button>
      </PageHeader>
      <PageBody style={{ height: 0 }}>
        {calendarHabits
          .filter((ch) => ch.isoDate === day)
          .map((ch) => {
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
      </PageBody>
    </PageContainer>
  );
};

export default DayHabits;
