import React from 'react';
import Post from './Post';
import Loader from '../loaders/Loader';

export default ({posts, userId, loading}) => {
  return (
    <React.Fragment>
      <Loader loading={loading} social={true}>
        {posts.map((post, index) => {
          return ( <Post userId={userId} post={post} index={index} key={index}/>)
        })}
      </Loader>
    </React.Fragment>
  )
}
