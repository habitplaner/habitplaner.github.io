import './App.css';
import '@api/firebase.auth';

import {
  FirebaseAuthCustomEvents,
  type FirebaseAuthCustomEventsPayload,
} from '@api/firebase.auth';
import AppContent from '@components/App/AppContent';
import AppFooter from '@components/App/AppFooter';
import AppHeader from '@components/App/AppHeader';
import { getISODay } from '@helpers/dateHelper';
import { getCalendarHabits } from '@store/calendar/calendar.actions';
import { getHabits } from '@store/habits/habits.actions';
import { useAppDispatch } from '@store/hooks';
import { setAuthenticationLoading, setUser } from '@store/user/user.slice';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const handleAuthStateChange = (
      e: CustomEventInit<
        FirebaseAuthCustomEventsPayload[FirebaseAuthCustomEvents.AuthStateChanged]
      >
    ) => {
      dispatch(setAuthenticationLoading(false));
      console.log('Auth state changed in effect', e.detail?.user);

      if (e.detail?.user) {
        dispatch(
          setUser({
            id: e.detail.user.uid,
            fullName: e.detail.user.displayName ?? '-',
            email: e.detail.user.email ?? '-',
            photo: e.detail.user.photoURL ?? '',
          })
        );
        dispatch(getHabits());
        dispatch(getCalendarHabits(getISODay(new Date())));
        if (
          location.state?.from?.pathname &&
          location.state.from.pathname.startsWith('/')
        ) {
          navigate(location.state.from.pathname);
        }
      } else {
        dispatch(setUser(null));
      }
    };

    window.addEventListener(
      FirebaseAuthCustomEvents.AuthStateChanged,
      handleAuthStateChange
    );

    return () => {
      window.removeEventListener(
        FirebaseAuthCustomEvents.AuthStateChanged,
        handleAuthStateChange
      );
    };
  }, [navigate, dispatch, location?.state?.from?.pathname]);

  return (
    <>
      <AppHeader />
      <AppContent />
      <AppFooter />
    </>
  );
}

export default App;
