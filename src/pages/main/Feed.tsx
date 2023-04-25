import { useFeed } from "./hook/useFeed";
import styles from "./Feed.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMessage,
  faThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import { useEffect, useRef, useState } from "react";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
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
import DeleteConfirm from "../../UI/DeleteConfirm";
import FeedSkeleton from "UI/Skeleton/FeedSkeleton";
import useClickOutside from "UI/header/useClickOutside";

import moment from "moment";
import "moment/locale/ko";
import { postFeedLike } from "api/axios/axiosSetting";
import { useMutation, useQueryClient } from "react-query";
import { Querykey } from "api/react-query/QueryKey";
import useUser from "components/form/User/Hook/useUser";
import { DefaultFeedData } from "./interface/type";
import useMyFeed from "components/mypages/Hook/useMyFeed";
import { useRecoilState } from "recoil";
import { likeState } from "recoil/feedlike";

const myFeedDropDownMenu = ["수정하기", "삭제하기"];

function Feed() {
  const { id: categoryId } = useParams();
  const { LoginUserData } = useUser();
  const { data: myLikeFeed, isLoading: isLikeLoading } = useMyFeed("feedlike");
  const [select, setSelect] = useRecoilState<any>(likeState);

  /**좋아요 로직 */

  console.log(myLikeFeed);
  const likeFeed =
    myLikeFeed?.pages[0]?.results?.map((likefeed: any) => {
      return likefeed.id;
    }) ?? [];

  useEffect(() => {
    setSelect(likeFeed);
  }, [isLikeLoading]);

  const groupPk = LoginUserData?.group?.pk;

  const {
    feedData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    refetch,
  } = useFeed(groupPk, categoryId);

  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const [feedOption, setFeedOption] = useState<number[]>([]);

  /**게시글 보기 모달 */
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState(<FeedDetail />);

  /**feed 드롭다운 메뉴 이벤트 */
  const dropDownMenuEvent = (e: React.MouseEvent, data: any) => {
    const eventTarget = e.target as HTMLInputElement;
    const menuType = eventTarget.innerText;
    if (menuType === "수정하기") return navigate("/upload", { state: data });
    if (menuType === "삭제하기") {
      onOpen();
      return setModalType(
        <DeleteConfirm
          onClose={onClose}
          feedId={eventTarget.value}
          refetch={refetch}
        />
      );
    }
  };

  useClickOutside(dropdownRef, () => {
    setFeedOption([]);
  });

  /**좋아요누르기 */
  const queryClient = useQueryClient();

  const { mutate: likeHandler } = useMutation(
    (feedID: object) => {
      return postFeedLike(feedID);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(Querykey.feedData);
        // setIsLike()
      },
    }
  );

  const onLike = (feedId: any, likeCount: number) => {
    likeHandler(feedId);
  };

  return (
    <>
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        <div className={styles.feeds} ref={dropdownRef}>
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
                    <h1>
                      <p>{data.group.name}의 개발자</p>
                      {moment(data.created_at).fromNow()}
                    </h1>
                  </div>
                  <div className={styles.feedMenu}>
                    {LoginUserData?.id === data.user?.pk && (
                      <button
                        className={styles.dropDownBtn}
                        value={data.id}
                        onClick={() => {
                          !feedOption.includes(data.id)
                            ? setFeedOption((select) => [...select, data.id])
                            : setFeedOption(
                                feedOption.filter(
                                  (button) => button !== data.id
                                )
                              );
                        }}
                      >
                        <FontAwesomeIcon icon={faEllipsis} size="2x" />
                      </button>
                    )}
                    <ul
                      className={
                        feedOption.includes(data.id)
                          ? styles.menu
                          : styles.disable
                      }
                    >
                      {myFeedDropDownMenu.map((menu) => (
                        <li
                          className={styles.menuList}
                          key={menu}
                          value={data.id}
                          onClick={(e) => dropDownMenuEvent(e, data)}
                        >
                          {menu}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Image src={data.thumbnail} marginBottom="10px" />
                  <p>{data.title}</p>
                  <div className={styles.iconDiv}>
                    <Button
                      padding="5px"
                      backgroundColor="transparent"
                      key={data.id}
                      value={data.id}
                      color={select.includes(data.id) ? "red" : "black"}
                      leftIcon={<FontAwesomeIcon icon={faThumbsUp} size="lg" />}
                      onClick={() => {
                        !select.includes(data.id)
                          ? setSelect((select: any) => [...select, data.id])
                          : setSelect(
                              select.filter((button: any) => button !== data.id)
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
                      leftIcon={<FontAwesomeIcon icon={faMessage} size="lg" />}
                    >
                      {data.comments_count}
                    </Button>
                    {LoginUserData?.id !== data.user?.pk && (
                      <Button padding="5px" backgroundColor="transparent">
                        <FontAwesomeIcon icon={faEnvelope} size="lg" />
                      </Button>
                    )}
                  </div>

                  <div
                    onClick={() => {
                      setModalType(
                        <FeedDetail
                          feedData={data}
                          select={select}
                          setSelect={setSelect}
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
