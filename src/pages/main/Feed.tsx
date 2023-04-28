import { useFeed } from "./hook/useFeed";
import styles from "./Feed.module.scss";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Spinner,
} from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroller";
import moment from "moment";
import "moment/locale/ko";
import useUser from "components/form/User/Hook/useUser";
import { DefaultFeedData } from "./interface/type";
import FeedOption from "./FeedOption";
import { FiMessageSquare } from "react-icons/fi";
import LikeBtn from "./LikeBtn";
import SendBtn from "UI/Button/SendBtn";

function Feed() {
  const { pk: groupPk, id: categoryId } = useParams();
  const { LoginUserData } = useUser();
  const navigate = useNavigate();

  const groupName = LoginUserData.group.name;
  const { feedData, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useFeed(groupPk, categoryId);

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
                        <p>{groupName}의 개발자</p>
                        {moment(data.created_at).fromNow()}
                      </h1>
                      <FeedOption data={data} LoginUserData={LoginUserData} />
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
                      onClick={() => {
                        navigate(
                          `/${groupPk}/category/${categoryId}/feedDetail/${data.id}`
                        );
                      }}
                    >
                      {data.comments_count}
                    </Button>
                    {LoginUserData?.id !== data.user?.pk && (
                      <SendBtn userPk={data.user.pk} />
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
          {/* {isLoading && <FeedSkeleton />} */}
        </div>
      </InfiniteScroll>

      <Outlet />
    </>
  );
}

export default Feed;
