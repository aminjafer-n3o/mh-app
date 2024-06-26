import React, { useState, useRef } from 'react';
import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonPage, IonSkeletonText, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';

import { useAuth } from './../GlobalProvider';

import {
  close
} from 'ionicons/icons';
import SignInModal from '../ui/SignInModal';
import TopBar from '../ui/TopBar';

const DonationsPage: React.FC = () => {

  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn ?
        (
          <IonPage>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Donations</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className='ion-padding'>
              <IonHeader collapse="condense">
                <IonToolbar>
                  <IonTitle size="large">Donations</IonTitle>
                </IonToolbar>
              </IonHeader>

              <IonLabel>Loading your donations list...</IonLabel>
              <SkeletonList count={5} />

            </IonContent>
          </IonPage>
        ) :
        (
          <IonPage>
            <IonHeader>
                <TopBar />
              {/* <IonToolbar>
                <IonTitle>Donations</IonTitle>
              </IonToolbar> */}
            </IonHeader>
            <IonContent fullscreen className='ion-padding'>
              <IonHeader collapse="condense">
                <IonToolbar>
                  <IonTitle size="large">Donations</IonTitle>
                </IonToolbar>
              </IonHeader>

              <IonLabel>Not-signed-in user preview -- TODO</IonLabel>

              <IonList>
                <IonListHeader>
                  <IonSkeletonText style={{ width: '80px' }}></IonSkeletonText>
                </IonListHeader>
                <IonItem>
                  <IonThumbnail slot="start">
                    <IonSkeletonText></IonSkeletonText>
                  </IonThumbnail>
                  <IonLabel>
                    <h3>
                      <IonSkeletonText style={{ width: '80%' }}></IonSkeletonText>
                    </h3>
                    <p>
                      <IonSkeletonText style={{ width: '60%' }}></IonSkeletonText>
                    </p>
                    <p>
                      <IonSkeletonText style={{ width: '30%' }}></IonSkeletonText>
                    </p>
                  </IonLabel>
                </IonItem>
              </IonList>

              <IonLabel>Sign in to see your donations history</IonLabel>
              <br />
              <br />
              <br />

              <SignInModal>
                <IonButton>Sign In</IonButton>
              </SignInModal>

            </IonContent>


          </IonPage>
        )
      }
    </>
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