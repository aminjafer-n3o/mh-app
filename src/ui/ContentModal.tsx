import React, { useState, useRef, useEffect } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { IonContent, IonButton, IonModal, IonIcon, IonImg, IonThumbnail, IonTitle, IonText, IonSkeletonText, IonSelect, IonSelectOption, IonPopover, IonList, IonItem } from '@ionic/react';
import { ellipsisHorizontal, linkOutline } from 'ionicons/icons';
import './Carousels.css';

const isDesktop = window.innerWidth >= 768;

type ContentModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    trigger: React.ReactNode;
};

const ContentModal: React.FC<ContentModalProps> = ({ isOpen, onClose, children, trigger }) => {
    const [uniqueId, setUniqueId] = useState<string>('');
    const isDesktop = window.innerWidth >= 768;

    return (
        <>  
            {trigger}
            <IonModal
                className="content-modal"
                id={`content-modal-${uniqueId}`}
                isOpen={isOpen}
                onDidDismiss={onClose}
                initialBreakpoint={isDesktop ? undefined : 0.8}
                breakpoints={isDesktop ? undefined : [0, 0.8, 1]}
            >
                {children}

                <div className='ion-padding'>
                    <IonButton color={'tertiary'} style={{ width: '100%' }} onClick={onClose}>CTA</IonButton>
                </div>
                <br />
            </IonModal>
        </>
    );
};

export default ContentModal;
