import React from 'react';
import './styles.scss'
import { LogoDarkIcon, LogoIcon } from '../../assets';
import { NavConfig } from './const'
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../provider/ThemeProvider';

type Props = {
  path: string;
  name: string;
}

function FooterList(props: Props) {
  const navigate = useNavigate()

  return (
    <li><a onClick={()=>navigate(props.path)}>{props.name}</a></li>
  )
}

export default function Footer() {
  const {theme} = useTheme()
  const isDarkTheme = theme === 'dark'
  return (
    <footer>
      <div className="footer-logo container">
        <img src={ isDarkTheme ? LogoDarkIcon : LogoIcon } alt="logoIcon"/>
      </div>
      <div className="footer-content container">
        <p>
          All content published and distributed by Bttrades, and its affiliates(collectively, the Company) is to be
          treated as general information only.
          None of the information provided by the Company or contained herein is intended as investment advice, an offer
          or solicitation of an offer to buy or sell,
          or a recommendation, endorsement, or sponsorship of any security, company, or fund, Bttrades does not act as
          or conduct services as a broker. Bttrades
          does not act as or conduct services as a custodian. People who register for our programs do so at their own
          volition, Purchases of programs should not be
          considered deposits. All fees are used for operation costs including, but not limited to, staff, technology
          and other business related expenses and must bee
          paid by customer before the payout. Applicable law to be under the laws of The United Arab Emirates and USA.
        </p>

        <ul>
          <FooterList {...NavConfig[0]}/>
          <FooterList {...NavConfig[1]}/>
          <FooterList {...NavConfig[2]}/>
          <FooterList {...NavConfig[3]}/>
          <FooterList {...NavConfig[4]}/>
        </ul>
      </div>
      <div className="footer-copyright">
        <p> &copy; 2025 Bttrades. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
