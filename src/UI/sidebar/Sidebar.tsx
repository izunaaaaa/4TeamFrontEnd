import { useState } from "react";
import styles from "./Sidebar.module.scss";
import { SidebarProps } from "../../interface/Interface";
import {
  postCategory,
  deleteCategory,
  updateCategory,
} from "api/axios/axiosSetting";
import { useMutation, useQueryClient } from "react-query";
import { useSide } from "./hook/useSide";
import { Category } from "./hook/useSide";
import { Link } from "react-router-dom";
import useUser from "components/form/User/Hook/useUser";
import { useToast } from "@chakra-ui/react";
import { BsTrash3, BsPencil, BsPlusCircleFill } from "react-icons/bs";

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
  const { categories, refetch } = useSide(groupPk);

  const toast = useToast();

  const addCategoryMutation = useMutation(
    async (name: string) => await postCategory(name, groupPk),
    {
      onSuccess: () => {
        refetch();
        console.log("카테고리 추가");
      },
      onError: (error: Error) => {
        console.error("Error adding category:", error);
        toast({
          title: "이름이 중복되었습니다.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
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
        toast({
          title: "이름이 중복되었습니다.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
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
        <Link to={`${item.group.pk}/category/${item.id}`}>
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
                <BsPencil className={styles.fapen} size="16" />
              </div>
              <div onClick={() => deleteCategorytModal(item.group.pk, item.id)}>
                <BsTrash3 size="16" />
              </div>
            </div>
          )}
      </li>
    ));

  const renderAddChannelButton = () => (
    <li className={styles.navmenu_add} onClick={() => toggleModal("add")}>
      <p>
        <BsPlusCircleFill size="18" /> <span>채널 추가</span>
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
                  <button onClick={() => toggleModal(null)}>취소</button>
                  <button onClick={handleAddChannel}>추가</button>
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
                  <button onClick={() => toggleModal(null)}>취소</button>
                  <button onClick={onDelete}>삭제</button>
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
                  <button onClick={() => toggleModal(null)}>취소</button>
                  <button onClick={onUpdate}>수정</button>
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
    <>
      <nav
        className={
          sidebar ? `${styles.nav_menu} ${styles.active}` : styles.nav_menu
        }
      >
        <ul className={styles.navmenu_items}>
          {renderSidebarData()}
          {LoginUserData?.is_coach && renderAddChannelButton()}
        </ul>
      </nav>
      {renderModal()}
    </>
  );
}

export default Sidebar;
