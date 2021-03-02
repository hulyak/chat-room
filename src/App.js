import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import { Switch } from 'react-router';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Home from './pages/Home';
import Signin from './pages/Signin';
import ErrorBoundary from './components/ErrorBoundary';

import { ProfileProvider } from './context/profile.context';

function App() {
  return (
    <ErrorBoundary>
      <ProfileProvider>
        <Switch>
          <PublicRoute path="/signin">
            <Signin />
          </PublicRoute>
          <PrivateRoute path="/">
            <Home />
          </PrivateRoute>
        </Switch>
      </ProfileProvider>
    </ErrorBoundary>
  );
}

export default App;
