import React, { useState, useRef, useEffect } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';

import Stories from 'react-insta-stories';
import './Story.css';

import { IonContent, IonButton, IonModal, IonIcon, IonThumbnail, IonPopover, IonList, IonItem, IonLabel } from '@ionic/react';

import { archiveOutline, arrowForwardCircleOutline, arrowForwardOutline, close, ellipsisHorizontal, playOutline } from 'ionicons/icons';

import './Carousels.css';

type PropType = {
    slides: number[];
    options?: EmblaOptionsType;
};

const StoriesCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselModal = useRef<HTMLIonModalElement>(null);
    const nestedEmblaRef = useRef<HTMLDivElement>(null);

    const [uniqueId, setUniqueId] = useState<string>('');

    useEffect(() => {
        // Generate a unique ID for each instance of the modal
        setUniqueId(`login-modal-${Math.random().toString(36).substring(2, 11)}`);
    }, []);
    const openModal = (index: number) => {
        setCurrentIndex(index);
        carouselModal.current?.present();
    };

    useEffect(() => {
        const preventParentInteraction = (event: Event) => {
            event.stopPropagation();
        };

        const nestedEmblaElement = nestedEmblaRef.current;
        if (nestedEmblaElement) {
            nestedEmblaElement.addEventListener('touchstart', preventParentInteraction, { passive: true });
            nestedEmblaElement.addEventListener('mousedown', preventParentInteraction);
        }

        return () => {
            if (nestedEmblaElement) {
                nestedEmblaElement.removeEventListener('touchstart', preventParentInteraction);
                nestedEmblaElement.removeEventListener('mousedown', preventParentInteraction);
            }
        };
    }, []);

    return (
        <section className="story-carousel shadow-lg"
            style={{ 
                // margin: 'auto',
                background: 'var(--ion-item-background)',
                borderRadius: 'var(--ion-radius)'
            }}
        >
            <div className='flex justify-between items-center ion-padding-start'>
                <h2 className='font-semibold'>Latest Stories</h2>
                <IonButton fill='clear' slot='end' id={`popover-button-${uniqueId}`}>
                    <IonIcon slot="icon-only" color='dark' icon={ellipsisHorizontal} style={{ height: 24, width: 24 }} />                    
                </IonButton>
                
                <IonPopover trigger={`popover-button-${uniqueId}`} dismissOnSelect={true}>
                    <IonContent>
                    <IonList>
                        <IonItem button={true} detail={false}>
                        <IonIcon slot='end' color='dark' icon={archiveOutline} style={{ height: 24, width: 24 }} />
                            See Archived
                        </IonItem>
                    </IonList>
                    </IonContent>
                </IonPopover>
            </div>
            <div ref={nestedEmblaRef} >
                <div className="story-carousel__viewport ion-padding" ref={emblaRef}>
                    <div className="story-carousel__container grabbable">
                        {slides.map((index) => (
                            <div className="story-carousel__slide" key={index}>
                                <div
                                    style={{ margin: 'auto', cursor: 'pointer' }}
                                    className="ion-no-padding"
                                    onClick={() => openModal(index)}>
                                    <IonThumbnail
                                        className='story-carousel__thumbnail'
                                        style={{
                                            width: 'auto',
                                            position: 'relative',
                                            outline: index === 0 ? '3px solid var(--ion-color-primary)' : 'none',
                                            border: index === 0 ? '2px solid var(--ion-background-color)' : 'none',
                                        }}
                                    >
                                        {index === 0 && (
                                            <IonIcon
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    color: 'white',
                                                    fontSize: '32px',
                                                    zIndex: 1,
                                                }}
                                                icon={playOutline}
                                            />
                                        )}
                                        <img src={stories2[index].cover} />
                                    </IonThumbnail>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <IonModal
                id="stories-modal"
                ref={carouselModal}
                canDismiss={true}
            >
                <IonButton
                    size='large'
                    style={{ position: 'absolute', zIndex: 9999, right: 0, color: 'var(--ion-background-color)' }}
                    fill="clear" onClick={() => carouselModal.current?.dismiss()}>
                    <IonIcon slot="icon-only" ios={close} md={close}></IonIcon>
                </IonButton>
                <Stories
                    loop
                    keyboardNavigation
                    defaultInterval={5000}
                    //@ts-ignore
                    stories={stories2}
                    width={'100%'}
                    height={'100%'}
                    currentIndex={currentIndex}  // Pass the current index here
                />
            </IonModal>
        </section>
    );
}

export default StoriesCarousel;






//@ts-ignore
const Story2 = ({ isPaused }) => {
    return (
        <div
            style={{ ...contentStyle, background: 'Aquamarine', color: '#16161d' }}
        >
            <h1>You get the control of the story.</h1>
            <p>
                Render your custom JSX by passing just a{' '}
                <code style={{ fontStyle: 'italic' }}>content</code> property inside
                your story object.
            </p>
            <p>
                You get a <code style={{ fontStyle: 'italic' }}>action</code> prop as an
                input to your content function, that can be used to play or pause the
                story.
            </p>
            <h1>{isPaused ? 'Paused' : 'Playing'}</h1>
        </div>
    );
};


const StoryModalCTA = () => {

    const modalCTA = useRef<HTMLIonModalElement>(null);

    return (
        <>
            <IonButton
                color={'tertiary'}
                style={{ margin: 'auto', marginTop: 100, maxWidth: '100%' }}
                className="font-bold ion-padding" id="cta-modal" expand="block">
                <IonLabel slot='start'>Donate Today</IonLabel>
                <IonIcon icon={arrowForwardCircleOutline} slot="end" />
            </IonButton>

            <IonModal
                ref={modalCTA} trigger="cta-modal"
                initialBreakpoint={0.8}
                breakpoints={[0, 0.8, 1]}
            >
                <IonContent className='ion-padding'>
                    <h2>CTA Modal</h2>
                    <p>
                        Could be a donation form, web view or anything really.
                    </p>
                </IonContent>
                <br />
                
            </IonModal>
        </>
    );
};

const StoryOverlay = ({ close }: { close: () => void }) => {

    return (
        <>
            <div
                style={{
                    position: 'relative',
                    maxWidth: '100%',
                    height: '100vh', // Ensure the parent covers the viewport height
                    overflow: 'hidden', // Hide overflow on the parent
                }}
            >
                {/* Scrollable content wrapper */}
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        overflowY: 'auto', // Make this div scrollable
                        padding: 40,
                        boxSizing: 'border-box', // Include padding in the height calculation
                    }}
                >
                    {/* content example */}
                    <p style={{ textDecoration: 'underline' }} onClick={close}>
                        ← Back to Stories
                    </p>

                    <div onClick={close}>
                        <h2>Content Title</h2>
                        <p>
                            Some Content. article or long captions.
                        </p>
                        <br />
                        
                    </div>
                    <div style={{ height: '300px' }}>300px space</div>

                    <StoryModalCTA />

                </div>

                {/* Background overlay */}
                <div
                    style={{
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'var(--background)',
                        opacity: 0.8,
                        zIndex: -1,
                    }}
                />
            </div>
        </>
    );
};


const stories2 = [

    {
        index: 0,
        cover: 'https://picsum.photos/100/200',
        url: 'https://picsum.photos/1080/2400',
        seeMore: ({ close }: { close: () => void }) => (
            <StoryOverlay close={close} />
        ),
        // seeMoreCollapsed: () => ( <StoryModalCTA /> ),
        duration: 3000,
    },

    {
        index: 1,
        cover: 'https://picsum.photos/101/201',
        url: 'https://picsum.photos/1081/2401',
        seeMore: true,
        seeMoreCollapsed: () => (<StoryModalCTA />),
        // duration: 990000,
    },

    {
        index: 2,
        cover: 'https://picsum.photos/102/202',
        url: 'https://videos.pexels.com/video-files/6646662/6646662-hd_1080_1920_24fps.mp4',
        type: 'video',
        seeMore: true,
        seeMoreCollapsed: () => (<StoryModalCTA />),
    },

    {
        index: 3,
        cover: 'https://picsum.photos/103/203',
        url: 'https://videos.pexels.com/video-files/6646688/6646688-hd_1280_720_24fps.mp4',
        type: 'video',
        //@ts-ignore
        seeMore: ({ close }) => (
            <div
                style={{
                    maxWidth: '100%',
                    height: '100%',
                    padding: 40,
                    background: 'var(--ion-background-color)',
                }}
            >
                <h2>Content Title</h2>
                <p>
                    Some Content. This could be a CTA, donation form, article or anything really.
                </p>
                <br />
                <p style={{ textDecoration: 'underline' }} onClick={close}>
                    tap here to close
                </p>
            </div>
        ),

    },

    {
        index: 4,
        cover: 'https://picsum.photos/104/204',
        url: 'https://videos.pexels.com/video-files/20743387/20743387-uhd_1440_2560_30fps.mp4',
        type: 'video',
    },

    {
        index: 5,
        cover: 'https://picsum.photos/105/205',
        content: Story2,
    },
];

const image = {
    display: 'block',
    maxWidth: '100%',
    borderRadius: 4,
};

const code = {
    background: '#eee',
    padding: '5px 10px',
    borderRadius: '4px',
    color: '#333',
};

const contentStyle = {
    background: 'salmon',
    width: '100%',
    padding: 20,
    color: 'white',
};

const customSeeMore = {
    textAlign: 'center',
    fontSize: 14,
    bottom: 20,
    position: 'relative',
};
