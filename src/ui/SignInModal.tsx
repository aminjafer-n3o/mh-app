import React, { useRef, useEffect, useState } from 'react';
import { IonButton, IonModal } from '@ionic/react';
import LoginForm from './LoginForm';

interface SignInModalProps {
  children: React.ReactNode;
}

const SignInModal: React.FC<SignInModalProps> = ({ children }) => {
  const signInModal = useRef<HTMLIonModalElement>(null);
  const [uniqueId, setUniqueId] = useState<string>('');

  useEffect(() => {
    // Generate a unique ID for each instance of the modal
    setUniqueId(`login-modal-${Math.random().toString(36).substring(2, 11)}`);
  }, []);

  return (
    <>
      {React.cloneElement(children as React.ReactElement<any>, { id: uniqueId })}

      <IonModal
        id={`signin-modal-${uniqueId}`}
        className="signin-modal"
        ref={signInModal}
        trigger={uniqueId}
        canDismiss={true}
      >
        <LoginForm />

        <IonButton
          style={{ margin: 20, marginBottom: 30 }}
          size='small'
          fill="clear"
          onClick={() => signInModal.current?.dismiss()}>
          Maybe Later
        </IonButton>
      </IonModal>
    </>
  );
};

export default SignInModal;
