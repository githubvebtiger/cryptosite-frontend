import React from 'react';
import './styles.scss'
import Header from '../../components/Header';
import { PolicyConfig } from "./const";
import Join from "../../components/Join";
import Footer from "../../components/Footer"
import { useTheme } from '../../provider/ThemeProvider';


type Props = {
  title: string;
  description: string;
}
function PrivacyPolicyItem(props:Props){
    const {theme} = useTheme()
  const isDarkTheme = theme === 'dark'
  return(
    <li>
      <h4>{props.title}</h4>
      <p>{props.description}</p>
    </li>
  )
}
export default function PrivacyPolicyPage(){
  return (
    <div className='privacy-page-wrapper'>
    <div>
       <Header showNav={true} />
      <section className='privacy-policy'>
        <h1 className='privacy-policy-title'>
        Privacy Policy
        </h1>
          <h3>
            Overview
          </h3>
          <p className='mt-10 '>
          Protecting your private information is our priority. This Statement of Privacy applies to fundingpips.com, and governs data collection and usage.
          </p>
         <p className='mt-10'>
          Bttrades website is an eCommerce site. By using Bttrades website, you consent to the data practices described in this Statement and all extensions and addendums to this Statement.
          </p>
          <h4>
          Collection of your Personal Information
          </h4>
          <p>
          In order to better provide you with products and services offered, Bttrades may collect personally identifiable information, such as your:
          </p>
            <ul className='pl-10'>
              <li> <p>First and Last Name</p> </li>
              <li> <p>Home Address</p> </li>
              <li> <p> Mailing Address</p> </li>
              <li> <p>E-mail Address</p> </li>
              <li> <p>Phone Number</p></li>
              <li> <p>Financial Information</p></li>
            </ul>
          <p className='mt-10'>
            If you purchase Bttrades products and services, we collect billing and credit card information. This information is used to complete the purchase transaction
            or issue payments to you. We do not collect any personal information about you unless you voluntarily provide it to us. However, you may be required to provide
            certain personal information to us when you elect to use certain products or services. These may include: (a) registering for an account; (b) entering a sweepstake
            or contest sponsored by us or one of our partners; (c) signing up for special offers from selected third parties; (d) sending us an email message; (e) submitting your
            credit card or other payment information when ordering and purchasing products and services. To with, we will use your information for, but not limited to, communicating
            with you in relation to services and/or products you have requested from us. We also may gather additional personal or non-personal information in the future for the same
            purpose.
          </p>
          <ul>
             <PrivacyPolicyItem {...PolicyConfig[0]}/>
             <PrivacyPolicyItem {...PolicyConfig[1]}/>
             <PrivacyPolicyItem {...PolicyConfig[2]}/>
             <PrivacyPolicyItem {...PolicyConfig[3]}/>
             <PrivacyPolicyItem {...PolicyConfig[4]}/>
             <PrivacyPolicyItem {...PolicyConfig[5]}/>
             <PrivacyPolicyItem {...PolicyConfig[6]}/>
             <PrivacyPolicyItem {...PolicyConfig[7]}/>
             <li>
              <h4>Right to Deletion</h4>
              <p>Subject to certain exceptions and for those individuals who meet jurisdictional and legal requirements, on receipt of a verifiable request from you, we will:
                <ul className='pl-10'>
                   <li><p>Delete your personal information from our records; and </p></li>
                   <li><p>Direct any service providers to delete your personal information from their records.</p></li>
                </ul>
              </p>
             </li>
             <PrivacyPolicyItem {...PolicyConfig[8]}/>
             <li>
              <h4>Opt-Out & Unsubscribe from Third Party Communications</h4>
              <p>We respect your privacy and give you an opportunity to opt out of receiving announcements of certain information.
                Users may opt-out of receiving any or all communications from third-party partners of Bttrades by contacting us here:
                Email: support@fundingpips.com
              </p>
             </li>
             <li>
             <h4>E-mail Communications</h4>
              <p>From time to time, Bttrades may contact you via email for the purpose of providing announcements, promotional offers, alerts, confirmations,
                 surveys, and/or other general communication. In order to improve our Services, we may receive a notification when you open an email from Bttrades or click on a link therein.
              </p>
              <p>
              If you would like to stop receiving marketing or promotional communications via email from Bttrades, you may opt out of such communications Customers may unsubscribe from emails by clicking on the unsubscribe button found at the bottom of each email.
              </p>
             </li>
             <PrivacyPolicyItem {...PolicyConfig[9]}/>
             <PrivacyPolicyItem {...PolicyConfig[10]}/>
             <PrivacyPolicyItem {...PolicyConfig[11]}/>

          </ul>

         </section>
         <div className='container'>
          <Join />
         </div>
          <Footer />
       </div>
       </div>
  )
}
