import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import DeleteConfirm from "./DeleteConfirm";

const FeedOptionModal = (props: any) => {
  const isOpen = props.isOpen;
  const onClose = props.onClose;
  const feedData = props.feedData;
  const feedType = props.feedType;

  const navigate = useNavigate();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  return (
    <>
      <DeleteConfirm
        onClose={onDeleteClose}
        isOpen={isDeleteOpen}
        feedId={feedData.id}
        feedType={feedType}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <ButtonGroup display="flex" flexDir="column">
              <Button
                h={70}
                bg="transparent"
                margin="3px"
                onClick={() =>
                  navigate("/community/upload", { state: feedData })
                }
              >
                수정하기
              </Button>
              <Button
                h={70}
                bg="transparent"
                margin="3px"
                onClick={() => onDeleteOpen()}
              >
                삭제하기
              </Button>
              <Button
                h={70}
                bg="transparent"
                margin="3px"
                onClick={() => onClose()}
              >
                취소
              </Button>
            </ButtonGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FeedOptionModal;
