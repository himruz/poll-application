import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const PollList = (props) => {
  if (props.polls.length === 0) {
    return <p>There is no poll</p>;
  }

  return (
    <ListGroup>
      {props.polls.map((poll) => {
        return (
          <ListGroupItem
            key={poll.id}
            style={{ cursor: "pointer" }}
            onClick={() => props.selectPoll(poll.id)}
          >
            {poll.title.length > 30 ? poll.title.substr(0, 30) + "..." : poll.title}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};
export default PollList;
