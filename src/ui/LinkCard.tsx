import React, { useState, useRef } from 'react';
import Stories from 'react-insta-stories';
import { IonContent, IonButton, IonModal, IonIcon, IonLabel, IonThumbnail, IonItem } from '@ionic/react';

import {
    arrowForwardCircleOutline,
    close
} from 'ionicons/icons';
import { Space } from './Space';

type LinkCardProps = {
    title: string;
    description?: string;
    imageUrl: string;
    layoutVariant?: 'large' | 'small';
};

const LinkCard: React.FC<LinkCardProps> = ({ title, imageUrl, description, layoutVariant = 'small' }) => {

    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => {
        setHover(true);
    };

    const handleMouseLeave = () => {
        setHover(false);
    };

    const currentValue = {
        title,
        imageUrl,
        hover,
        handleMouseEnter,
        handleMouseLeave
    };

    return (
        <>
        {layoutVariant === 'small' && (
            <div
                className='flex gap-sm w-full justify-between rounded ion-padding bg-primary items-center'
                style={{ filter: hover ? `brightness(105%)` : `brightness(100%)`, height: 'fit-content', cursor: 'pointer' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >

                <div slot="start" className='flex items-center gap font-bold text-white'>
                    {/* image url */}
                    <img src={imageUrl}
                    className='rounded'
                    style={{ 
                        width: isDesktop ? 160 : 90,
                        height: isDesktop ? 160 : 90,
                        objectFit: 'cover'  }} />
                    <h3 className='font-bold'
                        style={{
                            fontSize: isDesktop ? '2.2rem' : '1.2rem',
                            maxWidth: 300,
                        }}
                    >
                        {title}
                    </h3>

                </div>
                <IonIcon slot="end" color='light' icon={arrowForwardCircleOutline} style={{ height: 60, width: 60 }}/>
            </div>
        )}

        {layoutVariant === 'large' && (
            <div
                style={{
                    margin: 'auto',
                    position: 'relative',
                    overflow: 'hidden',
                    filter: hover ? `brightness(110%)` : `brightness(100%)`,
                    height: 'fit-content',
                    cursor: 'pointer'
                    }}
                    className="ion-no-padding w-full"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
            >
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
                        height: isDesktop ? '360px' : '220px',
                        width: 'auto',
                    }}
                >
                    <div
                    className='flex items-end justify-between gap'
                        style={{
                            position: 'absolute',
                            bottom: 'var(--ion-padding)',
                            left: 'var(--ion-padding)',
                            right: 'var(--ion-padding)',
                            color: 'white'
                        }}>
                        <div>
                            <h4 style={{ fontWeight: 600 }}>
                                {title}
                            </h4>
                            <p style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            }}>
                                {description}
                            </p>
                        </div>

                        <IonIcon slot="end" color='light' icon={arrowForwardCircleOutline} style={{ height: 30, width: 30 }} />
                    </div>
                    <img src={imageUrl} />
                </IonThumbnail>
            </div>
        )}
        </>

    );
};

export default LinkCard;
const isDesktop = window.innerWidth >= 768;


const mockupLinkData = {
    title: 'Muslim Hands Micro Grants',
    imageUrl: 'https://muslimhands.org.uk/_ui/images/c6ea89cb1389.jpg',
};

