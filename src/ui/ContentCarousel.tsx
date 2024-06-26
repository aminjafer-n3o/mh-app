import React, { useState, useRef, useEffect } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { IonContent, IonButton, IonModal, IonIcon, IonImg, IonThumbnail, IonTitle, IonText, IonSkeletonText, IonSelect, IonSelectOption, IonPopover, IonList, IonItem } from '@ionic/react';
import { ellipsisHorizontal, linkOutline } from 'ionicons/icons';
import './Carousels.css';

const isDesktop = window.innerWidth >= 768;

type SlideType = {
    img: string;
    title: string;
    description: string;
};

type PropType = {
    slides: SlideType[];
    options?: EmblaOptionsType;
    carouselTitle?: string;
};

const ContentCarousel: React.FC<PropType> = (props) => {
    const { slides = [], options = {}, carouselTitle } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const nestedEmblaRef = useRef<HTMLDivElement>(null);

    const [uniqueId, setUniqueId] = useState<string>('');

    useEffect(() => {
        // Generate a unique ID for each instance of the modal
        setUniqueId(`login-modal-${Math.random().toString(36).substring(2, 11)}`);
    }, []);

    const openContentModalView = (index: number) => {
        setCurrentIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
        <section className="thumb-carousel" 
            style={{
                margin: 'auto',
                background: 'var(--ion-item-background)',
                borderRadius: 'var(--ion-radius)'
            }}
        >
            <div className='flex justify-between items-center ion-padding-start'>
                {carouselTitle && <h2>{carouselTitle}</h2>}
                <IonButton fill='clear' slot='end' id={`popover-button-${uniqueId}`}>
                    <IonIcon slot="icon-only" color='dark' icon={ellipsisHorizontal} style={{ height: 24, width: 24 }} />                    
                </IonButton>
                
                <IonPopover trigger={`popover-button-${uniqueId}`} dismissOnSelect={true}>
                    <IonContent>
                    <IonList>
                        <IonItem button={true} detail={false}>
                        Option 1
                        </IonItem>
                        <IonItem button={true} detail={false}>
                        Option 2
                        </IonItem>
                        <IonItem button={true} detail={false}>
                        <IonIcon slot='end' color='dark' icon={linkOutline} style={{ height: 24, width: 24 }} />
                            See All
                        </IonItem>
                    </IonList>
                    </IonContent>
                </IonPopover>
            </div>
            <div ref={nestedEmblaRef} >
                <div className="thumb-carousel__viewport ion-padding" ref={emblaRef}>
                    <div className="thumb-carousel__container grabbable" >
                        {slides.map((slide, index) => (
                            <div className="thumb-carousel__slide" key={index}>
                                <div
                                    style={{
                                        margin: 'auto',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}
                                    className="ion-no-padding"
                                    onClick={() => openContentModalView(index)}>
                                    {/* black gradient overlay */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            background: 'linear-gradient(to top, rgba(0,0,0,.9) 0%, rgba(0,0,0,0) 100%)',
                                            borderRadius: 'var(--ion-radius)',
                                        }}
                                    />
                                    <IonThumbnail
                                        style={{
                                            height: isDesktop ? '320px' : '220px',
                                            width: 'auto',
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: 'absolute',
                                                bottom: 'var(--ion-padding)',
                                                left: 'var(--ion-padding)',
                                                right: 'var(--ion-padding)',
                                                color: 'white'
                                            }}>
                                            <h3 style={{ fontWeight: 600 }}>
                                                {slide.title}
                                            </h3>
                                            <p style={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                            }}>
                                                {slide.description}
                                            </p>
                                        </div>
                                        <img src={slide.img} alt={slide.title} />
                                    </IonThumbnail>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ContentViewModal isOpen={isModalOpen} onClose={closeModal} />
        </section>
    );
};

export default ContentCarousel;

const ContentViewModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    const [uniqueId, setUniqueId] = useState<string>('');
    const isDesktop = window.innerWidth >= 768;

    return (
        <IonModal
            className="content-modal"
            id={`content-modal-${uniqueId}`}
            isOpen={isOpen}
            onDidDismiss={onClose}
            initialBreakpoint={isDesktop ? undefined : 0.8}
            breakpoints={isDesktop ? undefined : [0, 0.8, 1]}
        >
            <IonContent className='ion-padding'>
                <IonThumbnail style={{ width: '100%', height: 200 }}>
                    <IonSkeletonText animated={true}></IonSkeletonText>
                </IonThumbnail>
                <h3>
                    <IonSkeletonText animated={true} style={{ width: '80%' }}></IonSkeletonText>
                    <IonSkeletonText animated={true} style={{ width: '40%' }}></IonSkeletonText>
                </h3>
                <br />
                <IonSkeletonText style={{ width: '100%' }} />
                <IonSkeletonText style={{ width: '100%' }} />
                <IonSkeletonText style={{ width: '100%' }} />
                <IonSkeletonText style={{ width: '60%' }} />
                <br />
                <IonSkeletonText style={{ width: '100%' }} />
                <IonSkeletonText style={{ width: '100%' }} />
                <IonSkeletonText style={{ width: '100%' }} />
                <IonSkeletonText style={{ width: '30%' }} />
                <br />
                <IonSkeletonText style={{ width: '100%' }} />
                <IonSkeletonText style={{ width: '100%' }} />
                <IonSkeletonText style={{ width: '100%' }} />
                <IonSkeletonText style={{ width: '60%' }} />
                <br />
                <IonSkeletonText style={{ width: '100%' }} />
                <IonSkeletonText style={{ width: '100%' }} />
                <IonSkeletonText style={{ width: '100%' }} />
                <IonSkeletonText style={{ width: '30%' }} />
            </IonContent>

            <div className='ion-padding'>
                <IonButton style={{ width: '100%' }} onClick={onClose}>CTA</IonButton>
            </div>
            <br />
        </IonModal>
    );
};
