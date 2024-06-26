import React, { useState } from 'react';
import { useAuth } from '../GlobalProvider';

import { useHistory } from 'react-router-dom';
import { IonContent, IonButton, IonInput, IonLabel } from '@ionic/react';
import AppLogo from '../ui/AppLogo';

const LoginForm: React.FC = () => {

  // const { isLoggedIn } = useAuth();
  const { login } = useAuth();

  const history = useHistory();
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    // Here you can add your authentication logic
    login();
    // After successful login, navigate to the main app view
    // history.push('/');
  };
  
  const handleSocialLogin = (provider: string) => {
    login();
    // Handle social login logic here
    console.log(`Logging in with ${provider}`);
    // After successful login, navigate to the main app view
    // history.push('/');
  };

  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();

  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setIsValid(undefined);

    if (value === '') return;

    validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
  };

  const markTouched = () => {
    setIsTouched(true);
  };

  return (
    // <IonPage>
      <IonContent className="ion-padding ion-justify-content-center"
        // style={{ maxWidth: 360}}
        // style={{ maxWidth: 360, margin: 'auto' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <AppLogo />
          </div>
          <div
          style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 'var(--ion-padding)' }}
          // style={{ maxWidth: 360, margin: 'auto', marginTop: '20%' }}
          >
            <IonInput
              mode='md'
              // className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
              type="email"
              fill="outline"
              label="Email"
              labelPlacement="floating"
              helperText="Enter a valid email"
              errorText="Invalid email"
              onIonInput={(event) => validate(event)}
              onIonBlur={() => markTouched()}
            ></IonInput>
            
            <IonButton color={'tertiary'} expand="block" onClick={handleLogin}>Send Magic Link</IonButton>
            
            Other options:
            <IonButton expand="block" color="light" onClick={() => handleSocialLogin('Google')}>
              Sign in with Google
            </IonButton>
            
            <IonButton expand="block" color="dark" onClick={() => handleSocialLogin('Apple ID')}>
              Sign in with Apple ID
            </IonButton>
            
            <IonButton expand="block" color="light" onClick={() => handleSocialLogin('Microsoft Account')}>
              Sign in with Microsoft Account
            </IonButton>
          </div>
      </IonContent>
    // </IonPage>
  );
};

export default LoginForm;