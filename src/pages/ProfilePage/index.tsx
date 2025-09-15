import React, { useEffect, useState } from "react";
import "./styles.scss";
import WrapperPage from "../../components/WrapperPage";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { getSatellite, saveSatellite } from "../../utils/getDataFromLocalStore/satellite";
import { useTheme } from "../../provider/ThemeProvider";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../components/Navigation";
import CountrySelect from "../../components/UI/CountrySelect";
import PhoneInput from "../../components/UI/PhoneInput";
import { updateSatelliteById } from "../../api/satellites";
import { fetchSatellites } from "../../api/satellites";
import CustomDatePicker from "../../components/UI/CustomDatePicker";
import moment from "moment";
import { StatusBanner } from "../../components/Banner";
import { startEmailVerification } from '../../api/userApi';
import EmailVerificationPopup from "../../components/Modals/EmailVerificationModal";
import { startVerificationSession } from '../../api/userApi';
import { IceCreamBowlIcon } from "lucide-react";
import { AttentionIcon, CheckIcon, HourglassIcon, successIdentityIcon } from '../../assets';
import warningIcon from '../../assets/icons/warning.svg'
import successIcon from '../../assets/icons/success.svg'
import mailSuccessIcon from '../../assets/icons/mailSuccess.svg'
import warningIdentityIcon from '../../assets/icons/warningIdentity.svg'

type Props = {};

export default function ProfilePage(props: Props) {
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [documentVerified, setDocumentVerified] = useState(false);
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isEmailVerificationPopupOpen, setIsEmailVerificationPopupOpen] = useState(false);
  
  // Load user data from API
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // First, try to get data from local storage
        const satellite = getSatellite();
        if (satellite) {
          let letters, numbers;
          satellite.country && setCountry(satellite.country);
          satellite.city && setCity(satellite.city);
          satellite.born && setBirthDate(satellite.born);
          satellite.address && setAddress(satellite.address);
          satellite.phone && setPhoneNumber(satellite.phone);
          satellite.email && setEmail(satellite.email);
          
          if (satellite.phone) {
            const phone = satellite.phone as string;
            // @ts-ignore
            letters = phone?.match(/[A-Za-z]+/g)?.join("");
            // @ts-ignore
            numbers = phone?.match(/\d+/g)?.join("");
            if (numbers) {
              setPhone(numbers);
              letters && setCountryCode(letters);
            }
          }

          // Set verification status from localStorage
          if (satellite.verify_status) {
            const verifyStatus = satellite.verify_status;
            setEmailVerified(verifyStatus === 'yellow' || verifyStatus === 'green');
            setDocumentVerified(verifyStatus === 'green');
          }
        }
        
        // Fetch fresh data from API to get verification status
        // const response = await fetchSatellites();
        // if (response.data && !response.error) {
        //   const userData = response.data;
          
        //   // Update verification states based on API response
        //   setEmailVerified(userData.email_verified || false);
        //   setDocumentVerified(userData.document_verified || false);
          
        //   // Update other fields if they exist in API response
        //   if (userData.email) setEmail(userData.email);
        //   if (userData.country) setCountry(userData.country);
        //   if (userData.city) setCity(userData.city);
        //   if (userData.address) setAddress(userData.address);
        //   if (userData.born) setBirthDate(userData.born);
        //   if (userData.phone) {
        //     setPhoneNumber(userData.phone);
        //     const phone = userData.phone as string;
        //     // @ts-ignore
        //     const letters = phone?.match(/[A-Za-z]+/g)?.join("");
        //     // @ts-ignore
        //     const numbers = phone?.match(/\d+/g)?.join("");
        //     if (numbers) {
        //       setPhone(numbers);
        //       letters && setCountryCode(letters);
        //     }
        //   }
        // }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    
    loadUserData();
  }, []);
  
  const onHandleEditProfile = () => {
    const satelliteData = {
      country,
      city,
      born: moment(birthDate).format("YYYY-MM-DD"),
      address,
      phone: countryCode + phone,
      email
    }
    const satelliteId = localStorage.getItem('loginId')
    if (satelliteId) {
      updateSatelliteById(+satelliteId, satelliteData).then(data => {
        data && saveSatellite(data)
      })
    }
    navigate(ROUTES.SETTINGS_PERSONAL_INFO);
  };

  const { toggleTheme, theme } = useTheme();

  function handleChangeTheme() {
    toggleTheme();
  }

  const isDarkTheme = theme === "dark";
  const [value, setValue] = useState(new Date());

  // Handler function to open email verification popup
  const handleEmailVerification = () => {
    setIsEmailVerificationPopupOpen(true);
  };

  // Handler function to send email verification
  const handleSendEmailVerification = async (verificationEmail: string) => {
    try {
      const response = await startEmailVerification(verificationEmail);
      
      if (response?.data?.session_url) {
        // Redirect to the session URL provided by the API
        window.location.href = response.data.session_url;
      } else if (response?.data) {
        // Show success message
        alert('Verification email has been sent. Please check your inbox.');
        
        // Optionally update the email in the profile if it was changed
        if (verificationEmail !== email) {
          setEmail(verificationEmail);
        }
      }
    } catch (error: any) {
      console.error('Error starting email verification:', error);
      
      // Let the popup handle the error display
      throw error;
    }
  };

  const handleKYCVerification = async () => {
    try {
      const response = await startVerificationSession();
      if (response?.data?.session_url) {
        window.location.href = response.data.session_url;
      } else {
        console.error('No session URL received for KYC verification.');
        alert('Failed to start document verification. Please try again.');
      }
    } catch (error) {
      console.error('Error starting KYC verification:', error);
      alert('Error starting document verification. Please try again.');
    }
  };

  return (
    <div className="profile-page-wrapper">
      <div className="hide-on-mobile">
        <Header isAuth />
      </div>
      <WrapperPage>
        <div className="profile-page">
          <h2>Profile</h2>

          <div className="profile-form">
            <CountrySelect
              placeholder="Country"
              value={country}
              onCountrySelect={setCountry}
            />
            <Input
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <CustomDatePicker
              placeholder="Date of birth"
              onChange={setBirthDate}
              value={birthDate}
            />
            <Input
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <PhoneInput
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              id="phone-border"
              countryCode={countryCode}
              onChangeCode={(value) => setCountryCode(value)}
              placeholder=" 00 000 000 00"
              value={phone}
            />
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              label="Edit profile"
              onClick={onHandleEditProfile}
              fullWidth
            />
            
            {/* Verification banners with proper logic */}
            <div className="verification-banners">
              {/* Email Verification Banner */}
              {!emailVerified ? (
                <StatusBanner
                  type="warning"
                  heading="Confirm your email address"
                  message={`Please confirm your email address to ensure your account is secure ${email}`}
                  ctaLabel="Verify"
                  onCtaClick={handleEmailVerification}
                  icon={<img src={warningIcon} alt="Hourglass Icon" style={{ width: 20, height: 20 }} />}
                />
              ) : (
                <StatusBanner
                  type="success"
                  heading="Email verified!"
                  message={`Your email address ${email} has been successfully verified. Your account is now more secure.`}
                  icon={<img src={mailSuccessIcon} alt="Check Icon" style={{ width: 20, height: 20 }} />}
                />
              )}

              {/* Document/KYC Verification Banner */}
              {emailVerified ? (
                !documentVerified ? (
                  <StatusBanner
                    type="warning"
                    heading="Verify your identity"
                    message="Complete document verification (KYC) to access all platform features, including withdrawals and increased limits."
                    ctaLabel="Verify"
                    onCtaClick={handleKYCVerification}
                    icon={<img src={warningIdentityIcon} alt="Warning Icon" style={{ width: 20, height: 20 }} />}
                  />
                ) : (
                  <StatusBanner
                    type="success"
                    heading="Identity verified"
                    message="Congratulations! You have successfully completed full verification and have unrestricted access to all platform services."
                    icon={<img src={successIdentityIcon} alt="Check Icon" style={{ width: 20, height: 20 }} />}
                  />
                )
              ) : (
                <StatusBanner
                  type="warning"
                  heading="Verify your identity"
                  message="Complete document verification (KYC) to access all platform features, including withdrawals and increased limits."
                  disabled={true}
                  icon={<img src={warningIcon} alt="Warning Icon" style={{ width: 20, height: 20 }} />}
                />
              )}
            </div>
          </div>
        </div>
      </WrapperPage>
      
      {/* Email Verification Popup */}
      <EmailVerificationPopup
        isOpen={isEmailVerificationPopupOpen}
        onClose={() => setIsEmailVerificationPopupOpen(false)}
        onSendVerification={handleSendEmailVerification}
        defaultEmail={email}
      />
    </div>
  );
}