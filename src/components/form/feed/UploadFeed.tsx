import {
  Avatar,
  Flex,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { faCloudArrowUp, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { postFeed } from "api/axios/axiosSetting";
import { PostFeed } from "interface/Interface";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import CropUploadImg from "./CropUploadImg";
import useFeedCategory from "./hook/useFeedCategory";
import styles from "./UploadFeed.module.scss";

const UploadFeed = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFeed>();

  const toast = useToast();
  const [previewImg, setPreviewImg] = useState();
  const [cropImg, setCropImg] = useState("");
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { feedCategory } = useFeedCategory("oz");

  const { mutate: postFeedHandler } = useMutation(
    (postData) => postFeed(postData),
    {
      onSuccess: () => {
        toast({
          title: "게시글을 업로드했습니다.",
        });
      },
    }
  );

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
  const submitHandler = (data: PostFeed) => {
    const postData: any = {
      title: data.title,
      description: data.description,
      category: data.category,
      image: null,
    };
    postFeedHandler(postData);
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

      <Flex justifyContent="center" margin="20px">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className={styles.postForm}
        >
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

            <Flex flexDirection="column" w="450px" padding="10px">
              <Select
                placeholder="카테고리를 입력해주세요"
                size="sm"
                {...register("category", {
                  required: {
                    value: true,
                    message: "필수 정보입니다.",
                  },
                })}
              >
                {feedCategory.map((category: any) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </Select>
              {errors?.category && <p>{errors.category?.message}</p>}

              <Input
                placeholder="제목을 입력하세요."
                marginTop="10px"
                type="text"
                {...register("title", {
                  required: "Title is required",
                })}
              />
              {errors?.title && <p>{errors?.title?.message}</p>}

              <Textarea
                marginTop="10px"
                placeholder="내용을 입력해주세요..."
                {...register("description")}
                resize="none"
                h={"50%"}
              />
            </Flex>
          </div>
        </form>
      </Flex>
    </>
  );
};

export default UploadFeed;
