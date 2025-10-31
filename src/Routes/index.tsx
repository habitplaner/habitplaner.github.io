import AboutPage from '@pages/AboutPage';
import CalendarPage from '@pages/CalendarPage';
import HabitAddPage from '@pages/HabitAddPage';
import HabitEditPage from '@pages/HabitEditPage';
import HabitOnePage from '@pages/HabitOnePage';
import HabitsListPage from '@pages/HabitsListPage';
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import ProfilePage from '@pages/ProfilePage';
import { Route, Routes } from 'react-router';

import { AuthRequiredRoutes } from './AuthRequiredRoutes';

const AllRoutes = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="login" element={<LoginPage />} />

      {/* Protected routes */}
      <Route element={<AuthRequiredRoutes />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="habit/new" element={<HabitAddPage />} />
        <Route path="habit/:id/edit" element={<HabitEditPage />} />
        <Route path="habit/:id" element={<HabitOnePage />} />
        <Route path="habits" element={<HabitsListPage />} />
        <Route path="calendar" element={<CalendarPage />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
