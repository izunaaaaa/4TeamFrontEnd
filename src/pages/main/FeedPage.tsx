import { useFeed } from "./hook/useFeed";
import styles from "./FeedPage.module.scss";
import { Link, Outlet, useParams } from "react-router-dom";
import { Box, Flex, Image, Img, Spinner } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroller";
import useUser from "components/form/User/Hook/useUser";
import { DefaultFeedData } from "./interface/type";
import MainFeedCard from "components/Card/MainFeedCard";
import adImage1 from "../../images/bangsam.png";

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
        <Flex>
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
            {feedData.pages?.map((pageData: any) => {
              const results =
                pageData?.results.length !== 0 ? (
                  pageData?.results?.map((data: DefaultFeedData) => (
                    <MainFeedCard
                      key={data.id}
                      data={data}
                      LoginUserData={LoginUserData}
                    />
                  ))
                ) : (
                  <Img
                    key={Math.random()}
                    margin="0 auto"
                    w="80%"
                    src="https://velog.velcdn.com/images/view_coding/post/96f6b4e2-defc-4609-8519-2a2146f44b64/image.png"
                  />
                );
              return results;
            })}

            {/* {feedData.pages?.map((pageData: any) =>
              console.log(pageData.results)
            )} */}
          </div>

          <div className={styles.sideDiv}>
            <Box
              border="1.5px solid grey"
              width="30px"
              borderRadius="9px"
              textAlign="center"
            >
              AD
            </Box>
            <Image
              src={adImage1}
              shadow="xl"
              borderRadius="10px"
              width="80%"
              cursor="pointer"
              margin="0"
              onClick={() => window.open("https://bangsam.site/")}
            />
          </div>
        </Flex>
      </InfiniteScroll>

      <Outlet />
    </>
  );
}

export default FeedPage;
