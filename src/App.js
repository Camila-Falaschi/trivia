import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/trivia" component={ Login } exact />
        <Route path="/trivia/settings" component={ Settings } />
        <Route path="/trivia/game" component={ Game } />
        <Route path="/trivia/ranking" component={ Ranking } />
        <Route path="/trivia/feedback" component={ Feedback } />
      </Switch>
    </div>
  );
}
