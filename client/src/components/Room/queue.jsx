import React from "react";
import { useSelector } from "react-redux";
import QueueItem from "./queueItem";

const Queue = () => {
  const items = useSelector((state) => state.queue.item);

  return items.map((item) => {
    <QueueItem item={item} />;
  });
};

export default Queue;
