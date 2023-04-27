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
import DeleteConfirm from "UI/DeleteConfirm";

const FeedOptionModal = (props: any) => {
  const isOpen = props.isOpen;
  const onClose = props.onClose;
  const feedData = props.feedData;

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
      />

      <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <ButtonGroup display="flex" flexDir="column">
              <Button
                h={70}
                bg="transparent"
                onClick={() => navigate("/upload", { state: feedData })}
              >
                수정하기
              </Button>
              <Button h={70} bg="transparent" onClick={() => onDeleteOpen()}>
                삭제하기
              </Button>
              <Button h={70} bg="transparent" onClick={() => onClose()}>
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
