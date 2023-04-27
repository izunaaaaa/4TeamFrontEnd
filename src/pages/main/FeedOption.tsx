import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import FeedOptionModal from "UI/Modal/FeedOptionModal";

const FeedOption = (props: any) => {
  const navigate = useNavigate();
  const data = props.data;
  const LoginUserData = props.LoginUserData;
  const {
    isOpen: isOptionOpen,
    onOpen: onOptionOpen,
    onClose: onOptionClose,
  } = useDisclosure();

  return (
    <>
      <FeedOptionModal
        onClose={onOptionClose}
        isOpen={isOptionOpen}
        feedData={data}
      />

      {LoginUserData?.id === data.user?.pk && (
        <Button
          onClick={() => {
            onOptionOpen();
          }}
        >
          <HiEllipsisVertical size="26" />
        </Button>
      )}
    </>
  );
};

export default FeedOption;
