import Comment from "./Comment";
import { useFeed } from "./hook/useFeed";
import styles from "./Feed.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import FeedDetail from "../../components/form/feed/FeedDetail";
import DeleteConfirm from "../../UI/DeleteConfirm";

const myFeedDropDownMenu = ["수정하기", "삭제하기"];
// const otherFeedDropDownMenu = ["쪽지 보내기"];

function Feed() {
  const feedData = useFeed();
  const navigate = useNavigate();
  const [isClickMenu, setIsClickMenu] = useState(false);
  const [dropDown, setDropDown] = useState("0");
  const [select, setSelect] = useState([]);

  /**게시글 보기 모달 */
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState(<FeedDetail />);

  /**추천 클릭시 이벤트 */

  /**feed 드롭다운 메뉴 이벤트 */
  const dropDownMenuEvent = (e) => {
    const eventTarget = e.target;
    const menuType = eventTarget.innerText;
    setIsClickMenu(!isClickMenu);
    if (menuType === "수정하기") return navigate("/upload");
    if (menuType === "삭제하기") {
      onOpen();
      return setModalType(<DeleteConfirm onClose={onClose} />);
    }
  };

  return (
    <div className={styles.feeds}>
      {feedData?.map((data, index) => (
        <div key={data.id} className={styles.feedDiv}>
          <div className={styles.feedUser}>
            <Avatar name={data.user} size="xs" />
            <h1>{data.user}</h1>
          </div>
          <div className={styles.feedMenu}>
            <button
              className={styles.dropDownBtn}
              value={data.id}
              onClick={(e) => {
                setDropDown(e.target.value);
                setIsClickMenu(!isClickMenu);
              }}
            >
              <FontAwesomeIcon icon={faEllipsis} size="2x" />
            </button>
            <ul
              className={
                dropDown === String(index + 1) ? styles.menu : styles.disable
              }
            >
              {isClickMenu &&
                myFeedDropDownMenu.map((menu) => (
                  <li
                    className={styles.menuList}
                    key={menu}
                    onClick={dropDownMenuEvent}
                  >
                    {menu}
                  </li>
                ))}
            </ul>
          </div>
          <img src={data.medias[0]} alt="" />
          <div className={styles.iconDiv}>
            <button
              key={data.id}
              value={data.id}
              onClick={() => {
                !select.includes(data.id)
                  ? setSelect((select) => [...select, data.id])
                  : setSelect(select.filter((button) => button !== data.id));
              }}
            >
              {select.includes(data.id) ? (
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  size="lg"
                  style={{ color: "red" }}
                />
              ) : (
                <FontAwesomeIcon icon={faThumbsUp} size="lg" />
              )}
            </button>
            <p>12</p>
            <button>
              <FontAwesomeIcon icon={faMessage} size="lg" />
            </button>
            <p>3</p>
          </div>

          <p>{data.description}</p>
          <div
            onClick={() => {
              setModalType(<FeedDetail feedData={data} />);
              onOpen();
            }}
          >
            댓글모두 보기
          </div>
        </div>
      ))}

      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>{modalType}</ModalBody>
        </ModalContent>
      </Modal>
      <Comment />
    </div>
  );
}

export default Feed;
