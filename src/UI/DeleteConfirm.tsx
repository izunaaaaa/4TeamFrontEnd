import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { deleteFeed } from "api/axios/axiosSetting";
import { Querykey } from "api/react-query/QueryKey";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DeleteConfirm.module.scss";

const DeleteConfirm = (props: any) => {
  const feedId = props.feedId;
  const toast = useToast();
  const { id: categoryId } = useParams();
  const queryclient = useQueryClient();

  const { mutate: deleteFeedHandler, isLoading: deleteFeedLoading } =
    useMutation((feedId: number) => deleteFeed(feedId), {
      onSuccess: () => {
        toast({
          title: "삭제되었습니다.",
          status: "success",
          duration: 4000,
        });

        queryclient.invalidateQueries([Querykey.feedData, categoryId]);

        window.location.reload();
      },
    });

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} size="sm" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <div className={styles.deleteDiv}>
              <h1 className={styles.deleteTitle}>
                삭제하시겠습니까?
                <Box fontSize="0.8rem" marginTop="5px">
                  게시물이 바로 삭제됩니다.
                </Box>
              </h1>
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteConfirm;
