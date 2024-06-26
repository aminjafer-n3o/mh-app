import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

import { useAuth } from './../GlobalProvider';
import LoginForm from './LoginForm';

const Tab2: React.FC = () => {

  const { isLoggedIn } = useAuth();

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 2 page" />
      </IonContent> */}

      {isLoggedIn ?
        (
          <>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Tab 2</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
              {/* <IonHeader collapse="condense">
                <IonToolbar>
                  <IonTitle size="large">Tab 2</IonTitle>
                </IonToolbar>
              </IonHeader> */}
              <ExploreContainer name="Tab 2 page" />
            </IonContent>
          </>
        ) :
        (
          <LoginForm />
        )
      }
    </IonPage>
  );
};

export default Tab2;
