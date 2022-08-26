import React from 'react';

function PrivateLayout({ children }: any) {
  return (
    <div>
      Private
      {children}
    </div>
  );
}

export default PrivateLayout;
