import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { TabMenu } from '../../../interface/Interface';

import styles from '../../../pages/mypage/MyPage.module.scss';

export default function TabMenuItem({ icon, size = 'lg', text, tabName, activeTab, onClick }: TabMenu) {
   const isActive = activeTab === tabName;
   const navigate = useNavigate();

   const handleClick = () => {
      navigate(`/mypage/${tabName}`);
      onClick(tabName);
   };

   return (
      <li className={styles.item}>
         <button onClick={handleClick} className={isActive ? styles.active : ''}>
            <FontAwesomeIcon icon={icon} size={size} />
            <p>{text}</p>
         </button>
      </li>
   );
}
