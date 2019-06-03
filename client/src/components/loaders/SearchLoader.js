import React from 'react';
import ContentLoader from 'react-content-loader';

export default () => {
  return (
    <ContentLoader
      height={'20rem'}
      speed={1}
      primaryColor={'#3b5998'}
      secondaryColor={'#ecebeb'}
    >
      <rect x="70" y="15" rx="4" ry="4" width="117" height="6" />
      <rect x="70" y="35" rx="3" ry="3" width="85" height="6" />
      <rect x="0" y="80" rx="3" ry="3" width="150" height="6" />
      <rect x="0" y="100" rx="3" ry="3" width="180" height="6" />
      <rect x="0" y="120" rx="3" ry="3" width="101" height="6" />
      <circle cx="30" cy="30" r="30" />
    </ContentLoader>
  )
}
