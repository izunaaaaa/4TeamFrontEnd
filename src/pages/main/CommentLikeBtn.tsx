import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { FiThumbsUp } from "react-icons/fi";

const CommentLikeBtn = (props: any) => {
  const height = props.height;
  const isLike = props.isLike;

  const [likeCount, setLikeCount] = useState(isLike);
  const onLike = () => {
    setLikeCount(!likeCount);
  };

  return (
    <Button h={height} bg="transparent" onClick={() => onLike()}>
      <FiThumbsUp />
    </Button>
  );
};

export default CommentLikeBtn;
