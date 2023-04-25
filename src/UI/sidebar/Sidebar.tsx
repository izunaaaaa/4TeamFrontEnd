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
import SidebarModal from "./SidebarModal";
import { Link } from "react-router-dom";

// useQuery : 데이터를 가져올 때
// useMutation : 데이터를 변경, 추가 또는 삭제

function Sidebar({ sidebar, setSidebar }: SidebarProps) {
  // 새로운 채널의 이름을 저장하는 상태 변수
  const [newChannelName, setNewChannelName] = useState("");
  // 수정된 카테고리 상태 변수
  const [updatedChannelName, setUpdatedChannelName] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // 채널 추가 모달 창 상태 변수
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 카테고리 삭제 모달 창 상태 변수
  const [selectedCategory, setSelectedCategory] = useState<{
    groupPk: number;
    id: number;
  } | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 채널 수정 모달 창 상태 변수
  const [selectedEditCategory, setSelectedEditCategory] = useState<{
    groupPk: number;
    id: number;
    name: string;
  } | null>(null);

  const groupPk = 1; // groupPk 값을 1로 설정
  const { categories, refetch } = useFeed(groupPk);

  // const queryClient = useQueryClient();

  // useEffect(() => {
  //   if (!categories) {
  //     refetch();
  //   }
  // }, []);
  useEffect(() => {
    refetch();
  }, []);

  // 새로 추가되는 카테고리
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

  // 카테고리 수정
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

  // 카테고리 삭제
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

  // const deleteCategoryMutation = useMutation(
  //   async ({ groupPk, id }: { groupPk: number; id: number }) =>
  //     await deleteCategory(groupPk, id),
  //   {
  //     onSuccess: () => {
  //       refetch();
  // //       queryClient.invalidateQueries("categories");
  //       console.log("카테고리 삭제");
  //     },
  //     onError: (error: Error) => {
  //       console.error("Error deleting category:", error);
  //     },
  //   }
  // );

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen); // 채널 추가 모달 창 열림/닫힘 상태 변경
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen); // 카테고리 삭제 모달 창 열림/닫힘 상태 변경
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const addCategory = async (name: string) => {
    addCategoryMutation.mutate(name);
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
      toggleEditModal(); // Close modal
    }
  };

  const handleDeleteChannel = () => {
    if (selectedCategory) {
      deleteCategoryMutation.mutate({
        groupPk: selectedCategory.groupPk,
        id: selectedCategory.id,
      });
      setSelectedCategory(null);
      toggleDeleteModal();
      //refetch();
    }
  };

  const openEditModal = (groupPk: number, id: number, name: string) => {
    setSelectedEditCategory({ groupPk, id, name });
    toggleEditModal();
  };

  const deleteCategorytModal = (groupPk: number, id: number) => {
    setSelectedCategory({ groupPk, id });
    toggleDeleteModal();
  };

  const renderSidebarData = () =>
    categories?.map((item: Category, id: number) => (
      <li key={id} className={styles.nav_text}>
        <Link to={`/${item.group.pk}/category/${item.id}`}>
          <div className={styles.nav_name}>
            <span>{item.name}</span>
          </div>
        </Link>
        <div className={styles.faiconContent}>
          <div onClick={() => openEditModal(item.group.pk, item.id, item.name)}>
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
    const onDelete = () => {
      handleDeleteChannel();
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
      if (selectedEditCategory && updatedChannelName.trim()) {
        handleUpdateChannel(updatedChannelName);
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
            value={updatedChannelName}
            onChange={(e) => setUpdatedChannelName(e.target.value)}
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

  const renderAddModal = () => {
    const handleAddChannel = () => {
      if (newChannelName.trim()) {
        addCategory(newChannelName);
        setNewChannelName("");
        toggleAddModal(); // 모달 창 닫기
      }
    };

    return (
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
      {isAddModalOpen && renderAddModal()}
      {isDeleteModalOpen && renderDeleteModal()}
      {isEditModalOpen && renderEditModal()}
    </>
  );
}

export default Sidebar;
