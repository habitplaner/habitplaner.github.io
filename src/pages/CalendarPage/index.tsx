import DayHabits from '@components/DayHabits';
import HabitsCard from '@components/HabitsCard/HabitsCard';
import PageContainer from '@components/Page/PageContainer';
import { selectCalendar } from '@store/calendar/calendar.slice';
import { useAppSelector } from '@store/hooks';

import CalendarWithData from './CalendarWithData';

const CalendarPage = () => {
  const { selectedDate } = useAppSelector(selectCalendar);
  return (
    <PageContainer>
      <CalendarWithData />

      {selectedDate ? <DayHabits day={selectedDate} /> : <HabitsCard />}
    </PageContainer>
  );
};

export default CalendarPage;
