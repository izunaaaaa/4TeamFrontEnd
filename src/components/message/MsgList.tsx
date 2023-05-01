import React from "react";
import {
  useDisclosure,
  Text,
  Box,
  HStack,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { faScissors, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import useFormatDate from "./hook/useFormatDate";
import { LetterList } from "interface/Interface";
import { useMutation, useQueryClient } from "react-query";
import { deleteLetterlists } from "api/axios/axiosSetting";

const MsgList = ({
  pk,
  receiver_pk,
  created_at,
  last_letter,
  isMobile,
  refetch,
}: any) => {
  const formattedDate = useFormatDate(created_at);

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();
  const blockMutation = useMutation(deleteLetterlists, {
    onSuccess: () => {
      queryClient.invalidateQueries("Letterlists");
      refetch();
      onClose();
    },
    onError: (error) => {
      console.error("에러ㅠㅠ", error);
    },
  });

  return (
    <>
      <Link
        to={isMobile ? `mobile/${pk}` : `${pk}`}
        target={isMobile ? "_blank" : "_self"}
      >
        <Box
          px={5}
          py={5}
          borderBottom={"1px solid #dce0e7"}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <HStack justify={"space-between"}>
            <Text>익명{receiver_pk}</Text>
            <button onClick={onOpen}>
              <FontAwesomeIcon icon={faTrashCan} size="sm" />
            </button>
          </HStack>
          <HStack justify={"space-between"}>
            <Text fontWeight={"600"}>{last_letter}</Text>
            <Text fontSize={"sm"} my={3}>
              {formattedDate}
            </Text>
          </HStack>
        </Box>
      </Link>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>쪽지를 차단하시겠습니까?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>내용 </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                blockMutation.mutate(pk);
                onClose();
              }}
            >
              Delete
            </Button>

            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MsgList;
