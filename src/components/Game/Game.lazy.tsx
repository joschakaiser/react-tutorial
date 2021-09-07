import React, { lazy, Suspense } from 'react';
import Game from './Game';

const LazyGame = lazy(() => import('./Game'));

const Game = (props: JSX.IntrinsicAttributes & React.RefAttributes<Game>) => (
  <Suspense fallback={null}>
    <LazyGame {...props} />
  </Suspense>
);

export default Game;
