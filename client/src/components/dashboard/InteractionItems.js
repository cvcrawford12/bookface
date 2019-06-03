import React from 'react';

export default ({likePost, bringFocusToInput, hasLiked}) => {
  return (
    <div className="d-inline-flex justify-content-around flex-row">
      <button className="plain-btn" onClick={likePost}><i className={hasLiked ? "fas fa-heart" : "far fa-heart"}></i> {hasLiked ? 'Unlike' : 'Like'}</button>
      <button className="plain-btn" onClick={bringFocusToInput}><i className="far fa-comment"></i> Comment</button>
    </div>
  )
}
