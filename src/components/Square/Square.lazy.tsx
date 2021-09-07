import React, { lazy, Suspense } from 'react';

const LazySquare = lazy(() => import('./Square'));

const Square = (props: any) => {
  return (
    <Suspense fallback={null}>
      <LazySquare {...props} />
    </Suspense>
  );
};

export default Square;
