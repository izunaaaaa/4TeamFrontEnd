import { useFeed } from "./hook/useFeed";
import styles from "./FeedPage.module.scss";
import { Outlet, useParams } from "react-router-dom";
import { Box, Spinner } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroller";
import useUser from "components/form/User/Hook/useUser";
import { DefaultFeedData } from "./interface/type";
import MainFeedCard from "components/Card/MainFeedCard";

function FeedPage() {
  const { pk: groupPk, id: categoryId } = useParams();
  const { LoginUserData } = useUser();

  const { feedData, fetchNextPage, hasNextPage, isFetching } = useFeed(
    groupPk,
    categoryId
  );

  return (
    <>
      <InfiniteScroll
        loadMore={fetchNextPage}
        hasMore={hasNextPage}
        className={styles.main}
      >
        {isFetching && (
          <Box textAlign="center" position="fixed" top="50%" left="50%">
            <Spinner
              thickness="5px"
              speed="0.75s"
              emptyColor="gray.200"
              color="pink.100"
              size={{ lg: "xl", md: "lg", base: "lg" }}
            />
          </Box>
        )}
        <div className={styles.feeds}>
          {feedData.pages?.map((pageData: any) =>
            pageData?.results?.map((data: DefaultFeedData) => {
              return (
                <MainFeedCard
                  key={data.id}
                  data={data}
                  LoginUserData={LoginUserData}
                />
              );
            })
          )}
        </div>
      </InfiniteScroll>

      <Outlet />
    </>
  );
}

export default FeedPage;
