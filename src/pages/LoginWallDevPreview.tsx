import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonListHeader,
  IonItem,
  IonThumbnail,
  IonSkeletonText,
  IonLabel
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import TopBar from '../ui/TopBar';
import LoginWall from '../ui/LoginWall';

const LoginWallDevPreview: React.FC = () => {
  return (
    <IonPage>
      <TopBar />
      <LoginWall>

      <div className="ion-padding mx-auto max-w-800">
        <h2 className="title text-center">Gated Page</h2>
        <p className="paragraph text-center">Login to access this page</p>
        <IonSkeletonText style={{height: '200px'}} />
        <IonSkeletonText style={{height: '100px', width: '60%'}} />
        <IonSkeletonText style={{height: '50px', width: '40%'}} />
        <IonSkeletonText style={{height: '70px', width: '30%'}} />
        <IonSkeletonText style={{height: '80px', width: '20%'}} />
        <IonSkeletonText style={{height: '20px', width: '80%'}} />
      </div>


      </LoginWall>

    </IonPage>
  );
};

export default LoginWallDevPreview;
