import { useEffect, useState } from "react";
import { SidebarData } from "./SidebarData";
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
import { useMutation, useQuery } from "react-query";
import { useFeed } from "./hook/useFeed";
import { Category } from "./hook/useFeed";

// useQuery : 데이터를 가져올 때
// useMutation : 데이터를 변경, 추가 또는 삭제

function Sidebar({ sidebar, setSidebar }: SidebarProps) {
  // 새로운 채널의 이름을 저장하는 상태 변수
  const [newChannelName, setNewChannelName] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // 채널 추가 모달 창 상태 변수
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 카테고리 삭제 모달 창 상태 변수
  const [selectedCategory, setSelectedCategory] = useState<{
    group: string;
    id: number;
  } | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 채널 수정 모달 창 상태 변수
  const [selectedEditCategory, setSelectedEditCategory] = useState<{
    group: string;
    id: number;
    name: string;
  } | null>(null);

  // 관리자 여부를 나타내는 상태
  const [isAdmin, setIsAdmin] = useState(true);
  const { categories, refetch } = useFeed();

  useEffect(() => {
    if (!categories) {
      refetch();
    }
  }, []);

  // 새로 추가되는 카테고리
  const addCategoryMutation = useMutation(
    async (name: string) => await postCategory(name, "oz"),
    {
      onSuccess: () => {
        refetch();
      },
      onError: (error: Error) => {
        console.error("Error adding category:", error);
      },
    }
  );

  const addCategory = async (name: string) => {
    addCategoryMutation.mutate(name);
  };

  const handleAddChannel = () => {
    if (newChannelName.trim()) {
      addCategory(newChannelName);
      setNewChannelName("");
      toggleAddModal(); // 모달 창 닫기
      //console.log(newChannelName);
    }
  };

  // 카테고리 삭제
  const deleteCategoryMutation = useMutation(
    async ({ group, id }: { group: string; id: number }) =>
      await deleteCategory(group, id),
    {
      onSuccess: () => {
        refetch();
      },
      onError: (error: Error) => {
        console.error("Error deleting category:", error);
      },
    }
  );

  const deleteCategoryItem = (group: string, id: number) => {
    setSelectedCategory({ group, id });
    toggleDeleteModal();
  };

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen); // 채널 추가 모달 창 열림/닫힘 상태 변경
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen); // 카테고리 삭제 모달 창 열림/닫힘 상태 변경
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  // 카테고리 수정
  const updateCategoryMutation = useMutation(
    async ({
      group,
      id,
      newName,
    }: {
      group: string;
      id: number;
      newName: string;
    }) => await updateCategory(group, id, newName),
    {
      onSuccess: () => {
        refetch();
      },
      onError: (error: Error) => {
        console.error("Error updating category:", error);
      },
    }
  );

  const openEditModal = (group: string, id: number, name: string) => {
    setSelectedEditCategory({ group, id, name });
    toggleEditModal();
  };

  const handleUpdateChannel = (id: number, newName: string) => {
    updateCategoryMutation.mutate({ group: "oz", id, newName });
    setNewChannelName("");
    toggleEditModal(); // 모달 창 닫기
  };

  const renderSidebarData = () =>
    categories?.map((item: Category, id: number) => (
      <li key={id} className={styles.nav_text}>
        <div>
          <span>{item.name}</span>
        </div>
        <div className={styles.faiconContent}>
          <div
            onClick={() => openEditModal(item.group.name, item.id, item.name)}
          >
            <span>
              <FontAwesomeIcon icon={faPen} />
            </span>
          </div>
          <div onClick={() => deleteCategoryItem(item.group.name, item.id)}>
            <span>
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </div>
        </div>
      </li>
    ));

  const renderAddChannelButton = () => (
    <li className={styles.nav_text} onClick={toggleAddModal}>
      <span>
        <FontAwesomeIcon icon={faCirclePlus} size="lg" /> 채널 추가
      </span>
    </li>
  );

  const renderDeleteModal = () => {
    const onDelete = async () => {
      if (selectedCategory) {
        await deleteCategoryMutation.mutate({
          group: selectedCategory.group,
          id: selectedCategory.id,
        });
        toggleDeleteModal();
      }
    };

    return (
      <div className={styles.modal} onClick={toggleDeleteModal}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <h2>카테고리 삭제</h2>
          <p>정말로 삭제하시겠습니까?</p>
          <div>
            <button onClick={onDelete}>삭제</button>
            <button onClick={toggleDeleteModal}>취소</button>
          </div>
        </div>
      </div>
    );
  };

  const renderEditModal = () => {
    const onUpdate = () => {
      if (selectedEditCategory && newChannelName.trim()) {
        handleUpdateChannel(selectedEditCategory.id, newChannelName);
      }
    };

    return (
      <div className={styles.modal} onClick={toggleEditModal}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <h2>채널 수정</h2>
          <input
            type="text"
            value={newChannelName}
            onChange={(e) => setNewChannelName(e.target.value)}
            placeholder="채널 이름 입력"
          />
          <div>
            <button onClick={onUpdate}>수정</button>
            <button onClick={toggleEditModal}>취소</button>
          </div>
        </div>
      </div>
    );
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
          {renderAddChannelButton()}
        </ul>
      </nav>
      {isAddModalOpen && (
        <div className={styles.modal} onClick={toggleAddModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>채널 추가</h2>
            <input
              type="text"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
              placeholder="채널 이름 입력"
            />
            <div>
              <button onClick={handleAddChannel}>추가</button>
              <button onClick={toggleAddModal}>취소</button>
            </div>
          </div>
        </div>
      )}
      {isDeleteModalOpen && renderDeleteModal()}
      {isEditModalOpen && renderEditModal()}
    </>
  );
}

export default Sidebar;
