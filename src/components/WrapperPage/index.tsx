import React, { useEffect, useState } from 'react';
import './styles.scss'
import Sidebar from '../SideBar';
import { LogoDarkIcon, LogoIcon } from '../../assets';
import BurgerMenu from '../BurgerMenu';
import useWindowWidth from '../../hooks/useWindowWidth';
import { useTheme } from '../../provider/ThemeProvider';

type Props = {
  children: React.ReactNode;
}
export default function WrapperPage(props: Props) {
  const {theme} = useTheme()
  const [isMobile, setIsMobile] = useState(false)
  const {windowWidth} = useWindowWidth();

  useEffect(() => {
    if (windowWidth < 880) {
      setIsMobile(true)
    } else setIsMobile(false)
  }, [windowWidth])
  return (
    <div className="page">
      <div className="header-flex">
        {isMobile && <img src={theme === 'dark' ? LogoDarkIcon : LogoIcon} alt="logoIcon"/>}
        {isMobile && <BurgerMenu>
            <Sidebar isBurger/>
        </BurgerMenu>}
      </div>
      <div className="content-flex">
        <Sidebar/>
        <div className="page-wrapper">
          {props.children}
        </div>
      </div>
    </div>

  )
}
