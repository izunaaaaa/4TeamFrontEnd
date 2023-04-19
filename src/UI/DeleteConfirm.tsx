import { Button, useToast } from "@chakra-ui/react";
import { deleteFeed } from "api/axios/axiosSetting";
import React from "react";
import { useMutation } from "react-query";
import styles from "./DeleteConfirm.module.scss";

const DeleteConfirm = (props: any) => {
  const feedId = props.feedId;

  const toast = useToast();

  const { mutate: deleteFeedHandler, isLoading: deleteFeedLoading } =
    useMutation((feedId: number) => deleteFeed(feedId), {
      onSuccess: () => {
        toast({
          title: "삭제되었습니다.",
          status: "success",
          duration: 4000,
        });
        props.onClose();
        props.refetch();
      },
    });

  return (
    <>
      <div className={styles.deleteDiv}>
        <h1 className={styles.deleteTitle}>삭제하시겠습니까?</h1>
        <div className={styles.deleteBtnDiv}>
          <Button
            isLoading={deleteFeedLoading}
            onClick={() => deleteFeedHandler(feedId)}
          >
            삭제
          </Button>
          <Button onClick={props.onClose}>취소</Button>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirm;
