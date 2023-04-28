import { useEffect, useState } from "react";
import styles from "./Sidebar.module.scss";
import { SidebarProps } from "../../interface/Interface";
import {
  faCirclePlus,
  faPen,
  faTrash,
  faTrashCan,
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
import useUser from "components/form/User/Hook/useUser";

// useQuery : 데이터를 가져올 때
// useMutation : 데이터를 변경, 추가 또는 삭제

function Sidebar({ sidebar, setSidebar }: SidebarProps) {
  // 새로운 채널의 이름을 저장하는 상태 변수
  const [newChannelName, setNewChannelName] = useState("");
  // 수정된 카테고리 상태 변수
  const [updatedChannelName, setUpdatedChannelName] = useState("");

  const [selectedCategory, setSelectedCategory] = useState<{
    groupPk: number;
    id: number;
    name: string;
  } | null>(null);

  const [modal, setModal] = useState<{
    type: "add" | "delete" | "edit" | null;
    data: any;
  }>({ type: null, data: "" });

  const groupPk = 1; // groupPk 값을 1로 설정
  const { categories, refetch } = useFeed(groupPk);

  // 코치 여부 확인
  const { LoginUserData } = useUser();

  // const queryClient = useQueryClient();

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
        handleModal(null); // close the modal after successful update
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

  const handleModal = (
    type: "add" | "delete" | "edit" | null,
    data: any = ""
  ) => {
    setModal({ type, data });
  };

  const handleAddChannel = (name: string) => {
    if (name.trim()) {
      addCategoryMutation.mutate(name);
      handleModal(null);
    }
  };

  const handleUpdateChannel = ({
    groupPk,
    id,
    newName,
  }: {
    groupPk: number;
    id: number;
    newName: string;
  }) => {
    console.log("handleUpdateChannel called with newName:", newName);
    if (newName.trim()) {
      updateCategoryMutation.mutate({
        groupPk,
        id,
        newName,
      });
    }
  };

  const handleDeleteChannel = (category: { groupPk: number; id: number }) => {
    if (category) {
      deleteCategoryMutation.mutate({
        groupPk: category.groupPk,
        id: category.id,
      });
      setSelectedCategory(null);
      handleModal(null);
    }
  };

  const handleAction = (type: "add" | "edit" | "delete", data: any) => {
    console.log(type, data);
    if (type === "add") {
      handleAddChannel(data);
    } else if (type === "edit" && selectedCategory) {
      handleUpdateChannel({
        groupPk: selectedCategory.groupPk,
        id: selectedCategory.id,
        newName: data,
      });
    } else if (type === "delete" && data) {
      handleDeleteChannel(data);
    }
  };

  const renderSidebarData = () =>
    categories?.map((item: Category, id: number) => (
      <li key={id} className={styles.nav_text}>
        <Link to={`${item.group.pk}/category/${item.id}`}>
          <div className={styles.nav_name}>
            <span>{item.name}</span>
          </div>
        </Link>
        {LoginUserData?.is_coach && (
          <div className={styles.faiconContent}>
            <div
              onClick={() =>
                handleModal("edit", {
                  groupPk: item.group.pk,
                  id: item.id,
                  name: item.name,
                })
              }
            >
              <span className={styles.fapen}>
                <FontAwesomeIcon icon={faPen} />
              </span>
            </div>
            <div
              onClick={() =>
                handleModal("delete", { groupPk: item.group.pk, id: item.id })
              }
            >
              <span>
                <FontAwesomeIcon icon={faTrashCan} />
              </span>
            </div>
          </div>
        )}
      </li>
    ));

  const renderAddChannelButton = () => (
    <li className={styles.nav_add} onClick={() => handleModal("add")}>
      <p>
        <FontAwesomeIcon icon={faCirclePlus} size="lg" /> <span>채널 추가</span>
      </p>
    </li>
  );

  return (
    <>
      <nav
        className={
          sidebar ? `${styles.nav_menu} ${styles.active}` : styles.nav_menu
        }
      >
        <ul className={styles.navmenu_items}>{renderSidebarData()}</ul>

        <div className={styles.navmenu_add}>
          {LoginUserData?.is_coach && renderAddChannelButton()}
        </div>
      </nav>
      <SidebarModal
        type={modal.type}
        data={modal.data}
        handleModal={handleModal}
        handleAction={handleAction}
      />
    </>
  );
}

export default Sidebar;
