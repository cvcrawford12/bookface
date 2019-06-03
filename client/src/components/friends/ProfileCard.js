import React from 'react';
import { Card, CardImg, CardBody, CardHeader, ListGroupItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Context from '../../actions/Context';
import Img from '../../assets/images/profile.jpeg';

export default ({user, addOrDeleteFriend, isFriendsTab}) => {
  let addOrDeleteBtn = <Button className="primary-bg" onClick={() => addOrDeleteFriend(user._id)}><i className="fas fa-user-plus"></i> Add</Button>
  if (isFriendsTab) {
    addOrDeleteBtn = <Button className="primary-bg" onClick={() => addOrDeleteFriend(user._id, true)}><i className="fas fa-user-times"></i> Remove</Button>
  }
  return (
    <ListGroupItem className="friend-card">
      <img src={Img}/>
      <div>
        <strong className="friend-title"><Link to={"/profile/" + user._id}>{Context.fullName(user)}</Link></strong>
        {addOrDeleteBtn}
      </div>
    </ListGroupItem>
  )
}

// <Card className="friend-card">
//   <CardHeader>{addOrDeleteBtn}</CardHeader>
//   <CardBody>
//     <div className="d-inline-flex align-items-start flex-row pb-2">
//       <img src={Img} />
//       <strong className="post-author pt-4 pl-3"><Link to={"/profile/" + user._id}>{Context.fullName(user)}</Link></strong>
//     </div>
//     {user.info && user.info.location && user.info.location !== '' &&
//       <small><p className="primary-font">{user.info.location}</p></small>
//     }
//   </CardBody>
// </Card>
