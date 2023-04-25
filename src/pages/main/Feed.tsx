import { useFeed } from "./hook/useFeed";
import styles from "./Feed.module.scss";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
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
import InfiniteScroll from "react-infinite-scroller";
import FeedDetail from "./FeedDetail";
import FeedSkeleton from "UI/Skeleton/FeedSkeleton";
import moment from "moment";
import "moment/locale/ko";
import { postFeedLike } from "api/axios/axiosSetting";
import { useMutation, useQueryClient } from "react-query";
import { Querykey } from "api/react-query/QueryKey";
import useUser from "components/form/User/Hook/useUser";
import { DefaultFeedData } from "./interface/type";
import { useRecoilState } from "recoil";
import { likeState } from "recoil/feedlike";
import FeedOption from "./FeedOption";
import { FiThumbsUp, FiMessageSquare } from "react-icons/fi";
import { IoPaperPlaneOutline } from "react-icons/io5";

function Feed() {
  const { pk: groupPk, id: categoryId } = useParams();
  const { LoginUserData } = useUser();
  const [islike, setIsLike] = useRecoilState<any>(likeState);

  const {
    feedData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    refetch: feedRefetch,
  } = useFeed(groupPk, categoryId);

  /**게시글 보기 모달 */
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState(<FeedDetail />);

  /**좋아요누르기 */
  const queryClient = useQueryClient();

  const { mutate: likeHandler } = useMutation(
    (feedID: object) => {
      return postFeedLike(feedID);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(Querykey.feedData);
      },
    }
  );

  const onLike = (feedId: any, likeCount: number) => {
    likeHandler(feedId);
  };

  return (
    <>
      <InfiniteScroll
        loadMore={fetchNextPage}
        hasMore={hasNextPage}
        className={styles.main}
      >
        <div className={styles.feeds}>
          {feedData.pages?.map((pageData: any) =>
            pageData?.results?.map((data: DefaultFeedData) => {
              return (
                <div key={data.id} className={styles.feedDiv}>
                  <div className={styles.feedUser}>
                    <Avatar
                      name="익명"
                      size="sm"
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                    />
                    <Flex justifyContent="space-between" w="100%">
                      <h1>
                        <p>{data.group.name}의 개발자</p>
                        {moment(data.created_at).fromNow()}
                      </h1>
                      <FeedOption
                        data={data}
                        LoginUserData={LoginUserData}
                        feedRefetch={feedRefetch}
                      />
                    </Flex>
                  </div>
                  {data.thumbnail && (
                    <Image src={data.thumbnail} margin="20px 0" />
                  )}
                  <Box marginBottom="20px" fontSize="1.2rem">
                    {data.title}
                  </Box>
                  <HStack spacing="1px">
                    <Button
                      padding="0px 5px"
                      margin="0px"
                      backgroundColor="transparent"
                      h="10px"
                      key={data.id}
                      value={data.id}
                      color={islike.includes(data.id) ? "red" : "black"}
                      leftIcon={<FiThumbsUp />}
                      onClick={() => {
                        !islike.includes(data.id)
                          ? setIsLike((select: any) => [...select, data.id])
                          : setIsLike(
                              islike.filter((likeId: any) => likeId !== data.id)
                            );
                        const feedId = {
                          id: data.id,
                        };
                        onLike(feedId, data.like_count);
                      }}
                    >
                      <Box color="black">{data.like_count}</Box>
                    </Button>

                    <Button
                      padding="5px"
                      backgroundColor="transparent"
                      leftIcon={<FiMessageSquare />}
                    >
                      {data.comments_count}
                    </Button>
                    {LoginUserData?.id !== data.user?.pk && (
                      <Button
                        padding="3px"
                        paddingTop="9px"
                        backgroundColor="transparent"
                        leftIcon={<IoPaperPlaneOutline />}
                      ></Button>
                    )}
                  </HStack>

                  <div
                    className={styles.comment}
                    onClick={() => {
                      setModalType(
                        <FeedDetail
                          feedData={data}
                          data={data}
                          LoginUserData={LoginUserData}
                          feedRefetch={feedRefetch}
                        />
                      );
                      onOpen();
                    }}
                  >
                    댓글모두 보기
                  </div>
                </div>
              );
            })
          )}
          {isFetching && (
            <Spinner
              thickness="5px"
              speed="0.75s"
              emptyColor="gray.200"
              color="pink.100"
              size={{ lg: "xl", md: "lg", base: "lg" }}
              margin="30px 5% 30px 34%"
            />
          )}
          {isLoading && <FeedSkeleton />}
        </div>
      </InfiniteScroll>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>{modalType}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Feed;
