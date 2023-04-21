import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { faMessage, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./FeedDetail.module.scss";
import moment from "moment";
import useFeedDetail from "./hook/useFeedDetail";
import Comment from "./Comment";
import "moment/locale/ko";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { postComment, postFeedLike } from "api/axios/axiosSetting";
import { Querykey } from "api/react-query/QueryKey";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import DeleteConfirm from "UI/DeleteConfirm";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDetectOutsideClick } from "UI/DetectOutsideClick/useDetectOutsideClick";

const myFeedDropDownMenu = ["수정하기", "삭제하기"];

const FeedDetail = (props: any) => {
  const feedData = props.feedData;
  const {
    feedDetail,
    isLoading,
    refetch: refetchFeedDetail,
  } = useFeedDetail(feedData.id);
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const successRefetch = {
    onSuccess: () => {
      refetchFeedDetail();
      queryClient.invalidateQueries(Querykey.feedData);
      queryClient.invalidateQueries([feedData.id, Querykey.feedComment]);
    },
  };

  console.log(feedDetail);

  /**dropdown menu */
  const dropdownRef = useRef(null);
  const { isActive, setIsActive } = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => {
    setIsActive(!isActive);
  };

  const dropDownMenuEvent = (e: React.MouseEvent) => {
    const eventTarget = e.target as HTMLElement;
    const menuType = eventTarget.innerText;
    if (menuType === "수정하기")
      return navigate("/upload", { state: feedData });
    if (menuType === "삭제하기") {
      onOpen();
      return;
    }
  };

  /**게시물 좋아요 */
  const { mutate: feedLikeHandler } = useMutation((feedId: object) => {
    return postFeedLike(feedId);
  }, successRefetch);

  /**댓글달기 */
  const { mutateAsync: commentSubmitHandler, isLoading: commentLoading } =
    useMutation(
      (comment: any) => postComment(feedData.id, comment),
      successRefetch
    );

  const commentSubmit = async (data: any) => {
    await commentSubmitHandler(data);
    reset();
  };

  if (isLoading)
    return (
      <Center h="600px">
        <Spinner size="xl" margin="20px" />
      </Center>
    );

  /**작성시간 */
  const writeTime = moment(feedDetail.created_at).fromNow();

  return (
    <>
      {
        <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <DeleteConfirm
                onClose={onClose}
                // feedId={eventTarget.value}
                // refetch={refetch}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      }
      <div className={styles.feedDetailDiv}>
        <div className={styles.writerName}>
          <Avatar
            name="익명"
            size="sm"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          />
          <Flex justifyContent="space-between" w="100%">
            <h1>
              <p>익명의 개발자</p>
              {writeTime}
            </h1>
            <div className="menu-container">
              <Button onClick={() => onClick()}>
                <FontAwesomeIcon icon={faEllipsis} size="2x" />
              </Button>
              <nav
                ref={dropdownRef}
                className={`menu ${isActive ? styles.menu : styles.disable}`}
              >
                <ul className={styles.menu}>
                  {myFeedDropDownMenu.map((menu) => (
                    <li
                      className={styles.menuList}
                      key={menu}
                      onClick={(e) => dropDownMenuEvent(e)}
                    >
                      {menu}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </Flex>
        </div>
        <HStack display="flex" flexDirection="column" alignItems="flex-start">
          <Image src={feedDetail?.thumbnail} />
          <Box>
            <p className={styles.feedTitle}>{feedDetail.title}</p>
            <p className={styles.feedDescription}>{feedDetail.description}</p>
          </Box>
        </HStack>
        <ButtonGroup margin="5px 0 5px 0">
          <Button
            backgroundColor={"transparent"}
            margin={0}
            padding={2}
            leftIcon={<FontAwesomeIcon icon={faThumbsUp} size="lg" />}
            onClick={() => {
              const feedId = {
                id: feedData.id,
              };
              feedLikeHandler(feedId);
            }}
          >
            {feedDetail.like_count}
          </Button>
          <Button
            backgroundColor={"transparent"}
            margin={0}
            padding={2}
            leftIcon={<FontAwesomeIcon icon={faMessage} size="lg" />}
          >
            {feedDetail.comments_count}
          </Button>
        </ButtonGroup>

        <Comment feedId={feedData.id} />
      </div>
      <form
        className={styles.commentInput}
        onSubmit={handleSubmit(commentSubmit)}
      >
        <textarea
          placeholder="댓글달기"
          {...register("description", {
            required: true,
          })}
        />
        <Button
          type="submit"
          onSubmit={handleSubmit(commentSubmit)}
          isLoading={commentLoading}
          h="48px"
        >
          게시
        </Button>
      </form>
    </>
  );
};

export default FeedDetail;
