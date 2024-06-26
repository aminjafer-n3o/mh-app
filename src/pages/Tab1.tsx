// going to delete this, use Home.tsx instead

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
} from '@ionic/react';

import StoriesCarousel from '../ui/StoriesCarousel';
import ContentCarousel from '../ui/ContentCarousel';
import { EmblaOptionsType } from 'embla-carousel'
import SignInModal from '../ui/SignInModal';

const OPTIONS: EmblaOptionsType = { align: 'start', dragFree: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const Tab1: React.FC = () => {
  const { isLoggedIn } = useAuth();

  const [selectedSegment, setSelectedSegment] = useState<string>('default');
  
  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    window.location.reload();
    event.detail.complete();
  }

  return (
    <IonPage>
      {/* <IonHeader translucent={true} class='ion-no-border'>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent fullscreen>
        {/* <IonHeader collapse="condense" translucent={true}>
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader> */}

        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>


        <div style={{ height: '40px' }}></div>

        <div className='ion-padding' style={{ maxWidth: '520px', margin: '0 auto' }}>
          <IonSegment value={selectedSegment} onIonChange={(e) => setSelectedSegment(e.detail.value! as string)}>
            <IonSegmentButton value="default">
              <IonLabel>MH Updates</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="user">
              <IonLabel>Your Contributions</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          {selectedSegment === 'default' ?
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
                  <IonButton expand="block" color="primary">Sign In</IonButton>
                </SignInModal>
              </>
            }
            </>
            }
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;


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

const SkeletonList: React.FC<{ count: number }> = ({ count }) => {
  const items = Array.from({ length: count }, (_, index) => (
    <SkeletonListItem key={index} />
  ));

  return <>{items}</>;
};


const emergencyAppeal = [
  {
      img: 'https://placehold.co/300x300?text=recovery',
      title: 'Yemen Recovery',
      description: 'Rebuilding Lives of people in need'
  },
  {
      img: 'https://placehold.co/300x300?text=education',
      title: 'Education for All',
      description: 'Ensuring access to education for children'
  },
  {
      img: 'https://placehold.co/300x300?text=clean',
      title: 'Clean Water Initiative',
      description: 'Providing clean water to communities'
  },
  {
      img: 'https://placehold.co/300x300?text=health',
      title: 'Health and Wellness',
      description: 'Improving health facilities and wellness programs'
  }
];