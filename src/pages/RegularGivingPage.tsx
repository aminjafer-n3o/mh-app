import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

import { useAuth } from './../GlobalProvider';
import LoginForm from './LoginForm';

const RegularGivingPage: React.FC = () => {

  const { isLoggedIn } = useAuth();

  return (
    <>
    {isLoggedIn ?
      (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Regular Giving</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Regular Giving</IonTitle>
              </IonToolbar>
            </IonHeader>

            <div style={{ background: '#f5f5f5'}}> 
              regular giving todo
            </div>
          </IonContent>
        </IonPage>
      ) :
      (
        <IonPage>
          <LoginForm />
        </IonPage>
      )
    }
  </>
  );
};

export default RegularGivingPage;
