import { useEffect, useState } from "react";
import styles from "./Sidebar.module.scss";
import { SidebarProps } from "../../interface/Interface";
import {
  faCirclePlus,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  postCategory,
  deleteCategory,
  updateCategory,
} from "api/axios/axiosSetting";
import { useMutation, useQueryClient } from "react-query";
import { useFeed } from "./hook/useSide";
import { Category } from "./hook/useSide";
import { Link } from "react-router-dom";
import useUser from "components/form/User/Hook/useUser";

function Sidebar({ sidebar, setSidebar }: SidebarProps) {
  const [newChannelName, setNewChannelName] = useState("");
  const [updatedChannelName, setUpdatedChannelName] = useState("");

  const [modalType, setModalType] = useState<"add" | "delete" | "edit" | null>(
    null
  );

  const [selectedCategory, setSelectedCategory] = useState<{
    groupPk: number;
    id: number;
  } | null>(null);

  const [selectedEditCategory, setSelectedEditCategory] = useState<{
    groupPk: number;
    id: number;
    name: string;
  } | null>(null);

  const { LoginUserData } = useUser();
  const groupPk = LoginUserData?.group?.pk;
  const { categories, refetch } = useFeed(groupPk);

  console.log(LoginUserData);

  useEffect(() => {
    refetch();
  }, []);

  const addCategoryMutation = useMutation(
    async (name: string) => await postCategory(name, groupPk),
    {
      onSuccess: () => {
        refetch();
        console.log("카테고리 추가");
      },
      onError: (error: Error) => {
        console.error("Error adding category:", error);
      },
    }
  );

  const updateCategoryMutation = useMutation(
    async ({
      groupPk,
      id,
      newName,
    }: {
      groupPk: number;
      id: number;
      newName: string;
    }) => await updateCategory(groupPk, id, newName),
    {
      onSuccess: () => {
        refetch();
        console.log("카테고리 수정");
      },
      onError: (error: Error) => {
        console.error("Error updating category:", error);
      },
    }
  );

  const deleteCategoryMutation = useMutation(
    async ({ groupPk, id }: { groupPk: number; id: number }) => {
      setTimeout(() => {
        refetch();
      }, 100);
      await deleteCategory(groupPk, id);
    },
    {
      onError: (error: Error) => {
        console.error("Error deleting category:", error);
      },
    }
  );

  const toggleModal = (type: "add" | "delete" | "edit" | null) => {
    setModalType(type);
  };

  const handleUpdateChannel = (newName: string) => {
    if (selectedEditCategory) {
      updateCategoryMutation.mutate({
        groupPk: selectedEditCategory.groupPk,
        id: selectedEditCategory.id,
        newName: newName,
      });
      setUpdatedChannelName("");
      setSelectedEditCategory(null);
      toggleModal(null); // Close modal
    }
  };

  const handleDeleteChannel = () => {
    if (selectedCategory) {
      deleteCategoryMutation.mutate({
        groupPk: selectedCategory.groupPk,
        id: selectedCategory.id,
      });
      setSelectedCategory(null);
      toggleModal(null);
    }
  };

  const openEditModal = (groupPk: number, id: number, name: string) => {
    setSelectedEditCategory({ groupPk, id, name });
    toggleModal("edit");
  };

  const deleteCategorytModal = (groupPk: number, id: number) => {
    setSelectedCategory({ groupPk, id });
    toggleModal("delete");
  };

  const renderSidebarData = () =>
    categories?.map((item: Category, id: number) => (
      <li key={id} className={styles.nav_text}>
        <Link to={`/${item.group.pk}/category/${item.id}`}>
          <div className={styles.nav_name}>
            <span>{item.name}</span>
          </div>
        </Link>
        {LoginUserData?.is_coach &&
          item.name !== "전체글" &&
          item.name !== "인기글" && (
            <div className={styles.faiconContent}>
              <div
                onClick={() => openEditModal(item.group.pk, item.id, item.name)}
              >
                <span>
                  <FontAwesomeIcon icon={faPen} />
                </span>
              </div>
              <div onClick={() => deleteCategorytModal(item.group.pk, item.id)}>
                <span>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </div>
            </div>
          )}
      </li>
    ));

  const renderAddChannelButton = () => (
    <li className={styles.nav_add} onClick={() => toggleModal("add")}>
      <p>
        <FontAwesomeIcon icon={faCirclePlus} size="lg" /> <span>채널 추가</span>
      </p>
    </li>
  );

  const renderModal = () => {
    switch (modalType) {
      case "add":
        const handleAddChannel = () => {
          if (newChannelName.trim()) {
            addCategoryMutation.mutate(newChannelName);
            setNewChannelName("");
            toggleModal(null); // Close modal
          }
        };

        return (
          <div className={styles.modal} onClick={() => toggleModal(null)}>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalinner}>
                <h2>채널 추가</h2>
                <input
                  type="text"
                  value={newChannelName}
                  onChange={(e) => setNewChannelName(e.target.value)}
                  placeholder="채널 이름 입력"
                />
                <div>
                  <button
                    className={styles.sideBtn_le}
                    onClick={handleAddChannel}
                  >
                    추가
                  </button>
                  <button
                    className={styles.sideBtn_ri}
                    onClick={() => toggleModal(null)}
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case "delete":
        const onDelete = () => {
          handleDeleteChannel();
        };

        return (
          <div className={styles.modal} onClick={() => toggleModal(null)}>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalinner}>
                <h2>카테고리 삭제</h2>
                <p>정말로 삭제하시겠습니까?</p>
                <div>
                  <button className={styles.sideBtn_le} onClick={onDelete}>
                    삭제
                  </button>
                  <button
                    className={styles.sideBtn_ri}
                    onClick={() => toggleModal(null)}
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case "edit":
        const onUpdate = () => {
          if (selectedEditCategory && updatedChannelName.trim()) {
            handleUpdateChannel(updatedChannelName);
          }
        };

        return (
          <div className={styles.modal} onClick={() => toggleModal(null)}>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalinner}>
                <h2>채널 수정</h2>
                <input
                  type="text"
                  value={updatedChannelName}
                  onChange={(e) => setUpdatedChannelName(e.target.value)}
                  placeholder="채널 이름 수정"
                />
                <div>
                  <button className={styles.sideBtn_le} onClick={onUpdate}>
                    수정
                  </button>
                  <button
                    className={styles.sideBtn_ri}
                    onClick={() => toggleModal(null)}
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={sidebar ? styles.sidebar_active : styles.sidebar}>
      <div className={styles.sidebar_content}>
        <ul>
          {renderSidebarData()}
          {LoginUserData?.is_coach && renderAddChannelButton()}
        </ul>
      </div>
      {renderModal()}
    </div>
  );
}

export default Sidebar;
