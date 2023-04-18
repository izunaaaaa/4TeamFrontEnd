import {
  Avatar,
  Modal,
  ModalContent,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { faCloudArrowUp, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CropUploadImg from "./CropUploadImg";
import useFeedCategory from "./hook/useFeedCategory";
import styles from "./UploadFeed.module.scss";

const UploadFeed = () => {
  const { register, handleSubmit } = useForm();
  const [previewImg, setPreviewImg] = useState();
  const [cropImg, setCropImg] = useState("");
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { feedCategory } = useFeedCategory("oz");

  /**썸네일 보기 */
  const changeImg = async (e: React.ChangeEvent) => {
    const reader: any = new FileReader();

    const target = e.currentTarget as HTMLInputElement;

    const file = target.files?.[0];
    if (!file) return;

    reader.readAsDataURL(file);
    const data: any = URL.createObjectURL(file);

    setPreviewImg(data);
    onOpen();
  };

  /**제출하기 */
  const submitHandler = (data: any) => {
    return;
  };

  /**이미지 크롭하기 */
  const getCroppedImg = (img: string) => {
    setCropImg(img);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <CropUploadImg
            previewImg={previewImg}
            getCroppedImg={getCroppedImg}
            onClose={onClose}
          />
        </ModalContent>
      </Modal>

      <form onSubmit={handleSubmit(submitHandler)} className={styles.postForm}>
        <div className={styles.postFormHeader}>
          <button onClick={() => navigate("/home")}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h3>새 게시물 작성하기</h3>
          <button onSubmit={handleSubmit(submitHandler)}>업로드하기</button>
        </div>

        <div className={styles.postFormMain}>
          <div className={styles.fileForm}>
            {!cropImg ? (
              <>
                <input
                  type="file"
                  {...register("file")}
                  accept="image/*"
                  onChange={changeImg}
                />
                <button>
                  <FontAwesomeIcon
                    icon={faCloudArrowUp}
                    size="5x"
                    style={{ color: "skyblue" }}
                  />
                </button>
              </>
            ) : (
              <img alt=" " className={styles.previewImg} src={cropImg} />
            )}
          </div>

          <div className={styles.postFormDiv}>
            <Select
              placeholder="카테고리를 입력해주세요"
              size="sm"
              {...register("category", {
                required: true,
              })}
            >
              {feedCategory.map((category: any) => {
                return <option key={category.id}>{category.name}</option>;
              })}
            </Select>
            <div className={styles.postFormNickname}>
              <Avatar name="닉네임" size="xs" />
              <p>닉네임</p>
            </div>
            <textarea
              className={styles.contents}
              placeholder="내용을 입력해주세요..."
              {...register("content")}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default UploadFeed;
