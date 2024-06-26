import { useAuth } from './../GlobalProvider';

import React, { useState } from 'react';
import {
    IonToolbar,
    IonButton,
    IonIcon,
    IonBadge
} from '@ionic/react';
import { basketOutline, notificationsOutline } from 'ionicons/icons';

import AppLogo from '../ui/AppLogo';

const TopBar: React.FC = () => {
    const { isLoggedIn } = useAuth();

    return (
        <IonToolbar id='topBar' className='justify-between'>


            {/* {!isDesktop && */}
            <div
                onClick={() => {
                    const menu = document.querySelector('ion-menu');
                    if (menu) {
                        menu.open();
                    } else {
                        console.warn('ion-menu element not found');
                    }
                }}
                
                className='flex items-center'>

                <AppLogo />
                <text className='font-bold ion-padding-start'>
                    Donor Portal
                </text>
            </div>
            {/* } */}

            <IonButton fill='clear' slot='end'>
                <IonIcon slot="icon-only" color='dark' icon={notificationsOutline} style={{ height: 24, width: 24 }} />
            </IonButton>


            <IonButton fill='clear' slot='end'>
                <IonIcon slot="icon-only" color='dark' icon={basketOutline} style={{ height: 24, width: 24 }} />
                <IonBadge style={{ position: 'absolute', top: -10, right: -14 }} color="danger">2</IonBadge>
            </IonButton>

        </IonToolbar>
    );
};

export default TopBar;
