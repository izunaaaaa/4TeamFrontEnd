import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';

import styles from '../../../pages/mypage/MyPage.module.scss';

interface Props {
   icon: IconDefinition;
   size: SizeProp;
   text: string;
   tabName: string;
   activeTab: string;
   onClick: (tabName: string) => void;
}

export default function TabMenuItem({ icon, size = 'lg', text, tabName, activeTab, onClick }: Props) {
   const isActive = activeTab === tabName;

   return (
      <li className={styles.item}>
         <button onClick={() => onClick(tabName)} className={isActive ? styles.active : ''}>
            <FontAwesomeIcon icon={icon} size={size} />
            <p>{text}</p>
         </button>
      </li>
   );
}
