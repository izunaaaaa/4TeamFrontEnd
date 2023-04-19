import {
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
import { postFeed, postUploadUrl } from "api/axios/axiosSetting";
import { PostFeed } from "../User/interface/type";
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

  const { mutateAsync: postUploadUrlHandler } = useMutation(
    async (img: any) => await postUploadUrl(img)
  );

  const { mutate: postFeedHandler, isLoading } = useMutation(
    (postData: PostFeed) => postFeed(postData),
    {
      onSuccess: () => {
        toast({
          title: "게시글을 업로드했습니다.",
        });
      },
      onError: (error: any) => {
        toast({
          title: "업로드 실패",
          description: `카테고리와 제목은 필수 입니다.`,
          status: "error",
          duration: 3000,
          isClosable: true,
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

  /**이미지url을 blob으로 변환 */
  function dataURLToBlob(dataURL: any): Blob {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  /**제출하기 */
  const submitHandler = async (data: PostFeed) => {
    let resUrl = "";
    if (cropImg) {
      const blob = dataURLToBlob(cropImg);
      const file = new File([blob], "image.jpeg", { type: "image/jpeg" });
      resUrl = await postUploadUrlHandler(file);
    }

    const postData: PostFeed = {
      title: data.title,
      category: data.category,
      ...(data.description && { description: data.description }),
      ...(resUrl && { image: resUrl }),
    };
    console.log(postData);
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
                    {...register("image")}
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
                  // required: {
                  //   value: true,
                  //   message: "필수 정보입니다.",
                  // },
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
                  // required: "Title is required",
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
