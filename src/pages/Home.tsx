import { useAuth } from './../GlobalProvider';

import React, { useState } from 'react';
import {
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonButton,
  IonList,
  IonListHeader,
  IonSkeletonText,
  IonThumbnail,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonAvatar,
  IonIcon,
  IonBadge,
} from '@ionic/react';

import StoriesCarousel from '../ui/StoriesCarousel';
import ContentCarousel from '../ui/ContentCarousel';
import { EmblaOptionsType } from 'embla-carousel'
import SignInModal from '../ui/SignInModal';
import { basketOutline, notificationsOutline } from 'ionicons/icons';
import AppLogo from '../ui/AppLogo';
import HomeSegments from './HomeSegments';
import TopBar from '../ui/TopBar';

const OPTIONS: EmblaOptionsType = { align: 'start', dragFree: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const Home: React.FC = () => {
  const { isLoggedIn } = useAuth();

  const [selectedSegment, setSelectedSegment] = useState<string>('updates');
  
  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    window.location.reload();
    event.detail.complete();
  }

  const isDesktop = window.innerWidth >= 768;

  return (
    <IonPage>
      {/* <IonHeader translucent={true}> */}
      <IonHeader translucent={true} class='ion-no-border' collapse='fade'>
        <TopBar />

        <IonToolbar style={{ borderBottom: '0.5px solid #88888875'}}>
                <IonSegment
                    style={{ 
                        maxWidth: 480,
                        margin: '0 auto',
                        height: '40px' 
                    }}
                     slot=''
                    value={selectedSegment} onIonChange={(e) => setSelectedSegment(e.detail.value! as string)}>
                    <IonSegmentButton value="updates">
                        <IonLabel>Updates</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="activities">
                        <IonLabel>My Contributions</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
        </IonToolbar>
        
      </IonHeader>
      <IonContent fullscreen>

        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>


        {/* <div style={{ height: '40px' }}></div> */}

        {/* <div className='ion-padding' style={{ maxWidth: '520px', margin: '0 auto' }}>

          {selectedSegment === 'updates' ?
            <>
              <StoriesCarousel slides={SLIDES} options={OPTIONS} />
              <br />
              <ContentCarousel carouselTitle='Emergency Appeals' slides={emergencyAppeal} options={OPTIONS} />
              <br />
              <br />
              {!isLoggedIn &&
              <SignInModal>
                <div style={{ textAlign: 'center', marginTop: '1em', padding: 'var(--ion-padding)', background: 'var(--ion-item-background)', borderRadius: 'var(--ion-radius)' }}>
                  <IonThumbnail style={{ width: '100%', height: '200px',marginBottom: 'var(--ion-padding)' }}>
                    <IonSkeletonText animated={false} />
                  </IonThumbnail>
                  Sign in to see personalised content for appeals and donations
                  <IonButton
                    // id='mh-yellow-button'
                    expand="block"
                    color="tertiary"
                    style={{ borderRadius: '2em' }}
                  >
                    Sign In
                  </IonButton>
                </div>
              </SignInModal>}
              <br />
              {!isLoggedIn &&
              <SignInModal>
                <div style={{ textAlign: 'center', marginTop: '1em', padding: 'var(--ion-padding)', background: 'var(--ion-item-background)', borderRadius: 'var(--ion-radius)' }}>
                    <IonItem>
                      <IonThumbnail slot="start">
                        <IonSkeletonText animated={true}></IonSkeletonText>
                      </IonThumbnail>
                      <IonLabel>
                        <h3>
                          Use Our Zakat Calculator
                        </h3>
                        <p>
                          Helping you give your Zakat accurately and safely
                        </p>
                      </IonLabel>
                    </IonItem>
                  
                  <IonButton
                    expand="block"
                    color={'secondary'}
                    style={{ borderRadius: '2em' }}
                  >
                    Calculate Zakat
                  </IonButton>
                </div>
              </SignInModal>}
              <br />
              <SkeletonList count={8} />
            </>
            :

            <>
            {isLoggedIn
              ?
              <>
                <SkeletonList count={20} />
                <StoriesCarousel slides={SLIDES} options={OPTIONS} />
              </>
              : 
              <>
                <h2>Donations Timeline</h2>
                <p>Please sign in to see your donations timeline.</p>
                <SignInModal>
                  <IonButton expand="block" color="tertiary">Sign In</IonButton>
                </SignInModal>
              </>
            }
            </>
            }
        </div> */}

        {/* swipeable segments */}
        <HomeSegments selectedSegment={selectedSegment} setSelectedSegment={setSelectedSegment} />

      </IonContent>
    </IonPage>
  );
};

export default Home;


const SkeletonListItem: React.FC = () => (
  <IonList>
    <IonListHeader>
      <IonSkeletonText animated={false} style={{ width: '80px' }}></IonSkeletonText>
    </IonListHeader>
    <IonItem>
      <IonThumbnail slot="start">
        <IonSkeletonText animated={false}></IonSkeletonText>
      </IonThumbnail>
      <IonLabel>
        <h3>
          <IonSkeletonText animated={false} style={{ width: '80%' }}></IonSkeletonText>
        </h3>
        <p>
          <IonSkeletonText animated={false} style={{ width: '60%' }}></IonSkeletonText>
        </p>
        <p>
          <IonSkeletonText animated={false} style={{ width: '30%' }}></IonSkeletonText>
        </p>
      </IonLabel>
    </IonItem>
  </IonList>
);
