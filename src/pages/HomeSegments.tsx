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
import LoginWall from '../ui/LoginWall';

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
                    <div className='ion-padding flex flex-col gap-md' style={{ maxWidth: '720px', margin: '0 auto' }}>
                        {/* <Space size='sm' /> */}

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
                    <div className='ion-padding' style={{ maxWidth: '800px', margin: '0 auto' }}>
                        {isLoggedIn ?
                            <>
                                <SkeletonList count={20} />
                                <StoriesCarousel slides={[0, 1, 2, 3, 4, 5]} options={OPTIONS} />
                            </>
                            :
                            <div style={{ minHeight: '80vh', position: 'relative' }}>

                                <LoginWall>
                                    <div id='mockup-content' style={{ position: 'relative', zIndex: 0 }} className='max-w-800 mx-auto flex flex-col gap'>

                                        <h2 className="title text-center font-bold">Contributions</h2>
                                        <p className="paragraph text-center">Login to see your contributions timeline</p>

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
                            </div>
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
        img: 'https://images.pexels.com/photos/17727749/pexels-photo-17727749/free-photo-of-ancient-ruins-on-a-desert-in-yemen.jpeg?auto=compress&cs=tinysrgb&w=300',
        title: 'Yemen Recovery',
        description: 'Rebuilding Lives of people in need'
    },
    {
        img: 'https://images.pexels.com/photos/20987743/pexels-photo-20987743/free-photo-of-portrait-of-smiling-boy-in-shirt.jpeg?auto=compress&cs=tinysrgb&w=300',
        title: 'Education for All',
        description: 'Ensuring access to education for children'
    },
    {
        img: 'https://images.pexels.com/photos/2837863/pexels-photo-2837863.jpeg?auto=compress&cs=tinysrgb&w=300',
        title: 'Clean Water Initiative',
        description: 'Providing clean water to communities'
    },
    {
        img: 'https://images.pexels.com/photos/26551119/pexels-photo-26551119/free-photo-of-father-hugging-smiling-sons.jpeg?auto=compress&cs=tinysrgb&w=300',
        title: 'Health and Wellness',
        description: 'Improving health facilities and wellness programs'
    }
];
