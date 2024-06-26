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

import { useAuth } from './../GlobalProvider';
import LoginWall from '../ui/LoginWall';
import TopBar from '../ui/TopBar';

const DonationsPage: React.FC = () => {

  const { isLoggedIn } = useAuth();

  return (
    <IonPage>
      <TopBar />
      {isLoggedIn ?
        (
          <>
            <IonContent fullscreen>
              <div className='max-w-800 mx-auto ion-padding flex flex-col gap'>

                <h2 className="title text-center font-bold">Donations</h2>

                <IonLabel>Loading your Donations record...</IonLabel>
                <div className='shadow-xl rounded-md'>
                  <SkeletonList count={10}/>
                </div>
              </div>
            </IonContent>
          </>
        ) :
        (
          <IonContent>
            <LoginWall>
              <div id='mockup-content' style={{ position: 'relative', zIndex: 0 }} className='ion-padding max-w-800 mx-auto flex flex-col gap'>

                <h2 className="title text-center font-bold">Donations</h2>
                <p className="paragraph text-center">Login to see your Donations</p>

                <div className='flex flex-col gap-sm'>
                  {Array.from(Array(7).keys()).map((_, i) => (
                    <IonList lines="none" class="skeleton-text" key={i}>
                      <IonListHeader>
                        <IonLabel>
                          <IonSkeletonText style={{ width: '20%' }} />
                        </IonLabel>
                      </IonListHeader>
                      <IonItem>
                        <IonThumbnail slot="start">
                          <IonSkeletonText style={{ width: '100%' }} />
                        </IonThumbnail>
                        <IonLabel>
                          <IonSkeletonText style={{ width: '30%' }} />
                        </IonLabel>
                        <IonLabel>
                          <IonSkeletonText style={{ width: '20%' }} />
                        </IonLabel>
                      </IonItem>
                    </IonList>
                  ))}
                </div>
              </div>
            </LoginWall>

          </IonContent>
        )
      }
    </IonPage>
  );
};

export default DonationsPage;


const SkeletonListItem: React.FC = () => (
  <IonList>
    <IonListHeader>
      <IonSkeletonText animated={true} style={{ width: '80px' }}></IonSkeletonText>
    </IonListHeader>
    <IonItem>
      <IonThumbnail slot="start">
        <IonSkeletonText animated={true}></IonSkeletonText>
      </IonThumbnail>
      <IonLabel>
        <h3>
          <IonSkeletonText animated={true} style={{ width: '80%' }}></IonSkeletonText>
        </h3>
        <p>
          <IonSkeletonText animated={true} style={{ width: '60%' }}></IonSkeletonText>
        </p>
        <p>
          <IonSkeletonText animated={true} style={{ width: '30%' }}></IonSkeletonText>
        </p>
      </IonLabel>
    </IonItem>
  </IonList>
);

const SkeletonList: React.FC<{ count: number }> = ({ count }) => {
  const items = Array.from({ length: count }, (_, index) => (
    <SkeletonListItem key={index} />
  ));

  return <>{items}</>;
};