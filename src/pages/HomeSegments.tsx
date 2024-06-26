import { useAuth } from './../GlobalProvider';
import useEmblaCarousel from 'embla-carousel-react';
import AutoHeight from 'embla-carousel-auto-height'
import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
    IonItem,
    IonLabel,
    IonButton,
    IonList,
    IonListHeader,
    IonSkeletonText,
    IonThumbnail,
} from '@ionic/react';

import StoriesCarousel from '../ui/StoriesCarousel';
import ContentCarousel from '../ui/ContentCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import SignInModal from '../ui/SignInModal';
import './../ui/Carousels.css';
import { Space } from '../ui/Space';

const OPTIONS: EmblaOptionsType = { align: 'start', dragFree: true };

const HomeSegments: React.FC<{ selectedSegment: string; setSelectedSegment: (value: string) => void; }> = ({ selectedSegment, setSelectedSegment }) => {
    const { isLoggedIn } = useAuth();
    // const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [AutoHeight()]);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

    const onSlideChange = useCallback(() => {
        if (!emblaApi) return;
        const selectedIndex = emblaApi.selectedScrollSnap();
        setSelectedSegment(selectedIndex === 0 ? 'updates' : 'activities');
    }, [emblaApi, setSelectedSegment]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSlideChange);
    }, [emblaApi, onSlideChange]);

    useEffect(() => {
        if (!emblaApi) return;
        const index = selectedSegment === 'updates' ? 0 : 1;
        emblaApi.scrollTo(index);
    }, [selectedSegment, emblaApi]);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">
                <div className="embla__slide">
                    {/* Updates Content */}
                    <Space size='lg' />
                    <div className='ion-padding flex flex-col gap-md' style={{maxWidth: '720px', margin: '0 auto' }}>
                        
                        <StoriesCarousel slides={[0, 1, 2, 3, 4, 5]} options={OPTIONS} />
                        
                        <ContentCarousel carouselTitle='Emergency Appeals' slides={emergencyAppeal} options={OPTIONS} />
          
                        {!isLoggedIn &&
                            <SignInModal>
                                <div style={{ textAlign: 'center', padding: 'var(--ion-padding)', background: 'var(--ion-item-background)', borderRadius: 'var(--ion-radius)' }}>
                                    <IonThumbnail style={{ width: '100%', height: '200px', marginBottom: 'var(--ion-padding)' }}>
                                        <IonSkeletonText animated={false} />
                                    </IonThumbnail>
                                    Sign in to see personalised content for appeals and donations
                                    <IonButton expand="block" color="tertiary" style={{ borderRadius: '2em' }}>Sign In</IonButton>
                                </div>
                            </SignInModal>}

                        {!isLoggedIn &&
                            <SignInModal>
                                <div style={{ textAlign: 'center', padding: 'var(--ion-padding)', background: 'var(--ion-item-background)', borderRadius: 'var(--ion-radius)' }}>
                                    <IonItem>
                                        <IonThumbnail slot="start">
                                            <IonSkeletonText animated={true}></IonSkeletonText>
                                        </IonThumbnail>
                                        <IonLabel>
                                            <h3>Use Our Zakat Calculator</h3>
                                            <p>Helping you give your Zakat accurately and safely</p>
                                        </IonLabel>
                                    </IonItem>
                                    <IonButton expand="block" color={'secondary'} style={{ borderRadius: '2em' }}>Calculate Zakat</IonButton>
                                </div>
                            </SignInModal>}
                        <br />
                        <SkeletonList count={8} />
                    </div>
                </div>
                <div className="embla__slide">
                    {/* Activities Content */}
                    <div className='ion-padding' style={{maxWidth: '800px', margin: '0 auto' }}>
                        {isLoggedIn ?
                            <>
                                <SkeletonList count={20} />
                                <StoriesCarousel slides={[0, 1, 2, 3, 4, 5]} options={OPTIONS} />
                            </>
                            :
                            <>
                                <h2>Donations Timeline</h2>
                                <p>Please sign in to see your donations timeline.</p>
                                <SignInModal>
                                    <IonButton expand="block" color="tertiary">Sign In</IonButton>
                                </SignInModal>
                                

                                <div style={{ width: '100%', height: 300, background: 'grey', marginBottom: 20 }} />
                                <div style={{ width: '100%', height: 300, background: 'blue', marginBottom: 20 }} />
                                <div style={{ width: '100%', height: 300, background: 'yellow', marginBottom: 20 }} />
                                <div style={{ width: '100%', height: 300, background: 'grey', marginBottom: 20 }} />
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeSegments;


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
