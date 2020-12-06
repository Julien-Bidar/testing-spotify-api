import React from "react";

const QueueItem = (props) => {
  const { item } = props;

  return (
    <div>
      <div>
        <div>
          <img src="itemImg" alt="album cover" />
        </div>
        <div>
          <p>itemTitle</p>
          <p>artist</p>
        </div>
        <div>
          <p>heart icon</p>
        </div>
        <div>
          <p>avatar added by</p>
        </div>
      </div>
    </div>
  );
};

export default QueueItem;
