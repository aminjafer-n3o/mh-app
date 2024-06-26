import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonListHeader,
    IonItem,
    IonThumbnail,
    IonSkeletonText,
    IonLabel
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

import { useAuth } from './../GlobalProvider';
import LoginForm from './LoginForm';

type LoginWallProps = {
    children?: React.ReactNode;
}

const LoginWall: React.FC<LoginWallProps> = ({ children }) => {

    const { isLoggedIn } = useAuth();

    return (

        <>
            <div id="login-wall" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}>
                <div className='shadow-xl rounded-xl bg' style={{ maxWidth: '400px', height: '560px', margin: 'auto', position: 'sticky', top: '20%', }}>
                    <LoginForm />
                </div>
            </div>

            <div id='mockup-content-overlay'
                style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    background: `linear-gradient(to bottom,
                 ${getComputedStyle(document.documentElement).getPropertyValue('--ion-background-color')}50 20%,
                 ${getComputedStyle(document.documentElement).getPropertyValue('--ion-background-color')})`,
                    zIndex: 1
                }}></div>

            <div style={{ overflow: 'hidden', maxHeight: '90vh' }}>
                {children}
            </div>

        </>
    );
};

export default LoginWall;
