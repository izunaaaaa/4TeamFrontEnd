import { useFeed } from "./hook/useFeed";
import styles from "./Feed.module.scss";
import { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
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
import useUser from "components/form/User/Hook/useUser";
import { DefaultFeedData } from "./interface/type";
import FeedOption from "./FeedOption";
import { FiMessageSquare } from "react-icons/fi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import LikeBtn from "./LikeBtn";

function Feed() {
  const { pk: groupPk, id: categoryId } = useParams();
  const { LoginUserData } = useUser();
  const navigate = useNavigate();

  const {
    feedData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    refetch: feedRefetch,
  } = useFeed(groupPk, categoryId);

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
                    <LikeBtn
                      id={data.id}
                      likeCount={data.like_count}
                      isLike={data.is_like}
                    />

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
                      navigate(
                        `/${groupPk}/category/${categoryId}/feedDetail/${data.id}`
                      );
                    }}
                  >
                    댓글모두 보기
                  </div>
                </div>
              );
            })
          )}

          {isFetching && (
            <Box margin="20px 5% 0px 15%" width="500px">
              <Box textAlign="center">
                <Spinner
                  thickness="5px"
                  speed="0.75s"
                  emptyColor="gray.200"
                  color="pink.100"
                  size={{ lg: "xl", md: "lg", base: "lg" }}
                />
              </Box>
            </Box>
          )}
          {isLoading && <FeedSkeleton />}
        </div>
      </InfiniteScroll>
      {/* <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{
          md: "xl",
          sm: "sm",
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>{modalType}</ModalBody>
        </ModalContent>
      </Modal> */}
      <Outlet />
    </>
  );
}

export default Feed;
