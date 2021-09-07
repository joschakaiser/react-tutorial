import React, { lazy, Suspense } from 'react';

const LazyTestLazyLoad = lazy(() => import('./TestLazyLoad'));

const TestLazyLoad = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTestLazyLoad {...props} />
  </Suspense>
);

export default TestLazyLoad;
