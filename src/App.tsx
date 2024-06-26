import { Redirect, Route, useLocation } from 'react-router-dom';
import { useAuth } from './GlobalProvider';

import { useEffect, useState } from 'react';

import {
  setupIonicReact,
  IonApp,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonRouterOutlet,
  IonSplitPane,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonAvatar,
  IonItemDivider,
  IonList,
  IonBadge,
  IonToggle
} from '@ionic/react';

import {
  menuOutline,
  logOutOutline,
  logInOutline,
  home,
  library,
  heart,
  ribbon,
  people,
  arrowForwardCircleOutline,
  triangle, square, ellipse, link,
  peopleOutline,
  giftOutline,
  heartOutline,
  homeOutline,
  ellipsisHorizontal,
  playCircleOutline,
  sparklesOutline,
  calendarClearOutline,
  calendarNumberOutline,
  calendarOutline,
  calculatorOutline,
  repeatOutline,
  colorPaletteOutline
} from 'ionicons/icons';

import { IonReactRouter } from '@ionic/react-router';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import ThemeSettings from './pages/ThemeSettings';
import LoginForm from './pages/LoginForm';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Ionic Dark Mode */
import '@ionic/react/css/palettes/dark.class.css';

/* Theme variables */
import './theme/variables.css';

import './App.css';
import SponsorshipsPage from './pages/SponsorshipsPage';
import RegularGivingPage from './pages/RegularGivingPage';
import StoriesPage from './pages/StoriesPage';
import SignInModal from './ui/SignInModal';
import DonationsPage from './pages/DonationsPage';
import Home from './pages/Home';
import AppLogo from './ui/AppLogo';

// setupIonicReact({ mode: 'ios' });
setupIonicReact({ mode: undefined });

const isDesktop = window.innerWidth >= 768;
const App: React.FC = () => {

const { isLoggedIn } = useAuth();

  return (
    // <GlobalProvider>

    <IonApp style={{borderBottom: '4px solid var(--ion-color-secondary)'}}>

      {/* <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login">
            <LoginForm />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter> */}

      <IonReactRouter>
        <IonSplitPane when="md" contentId="main-content">
          <AppMenu />
          <IonPage id="main-content">
            <IonTabs>

              <IonRouterOutlet>
                <Route exact path="/home">
                  <Home />
                </Route>
                {/* <Route exact path="/tab1">
                  <Tab1 />
                </Route> */}
                <Route exact path="/tab2">
                  <Tab2 />
                </Route>
                <Route exact path="/donations">
                  <DonationsPage />
                </Route>
                <Route exact path="/stories">
                  <StoriesPage />
                </Route>
                <Route exact path="/tab3">
                  <Tab3 />
                </Route>
                <Route exact path="/sponsorships">
                  <SponsorshipsPage />
                </Route>
                <Route exact path="/regular-giving">
                  <RegularGivingPage />
                </Route>
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
                <Route exact path="/theme-settings">
                  <ThemeSettings />
                </Route>
                <Route exact path="/login">
                  <LoginForm />
                </Route>
              </IonRouterOutlet>

              <IonTabBar slot="bottom" className="mobile-only" translucent={true}>

                <IonTabButton tab="home" href="/home">
                  <IonIcon aria-hidden="true" icon={homeOutline} />
                  <IonLabel>Home</IonLabel>
                </IonTabButton>
                {/* <IonTabButton tab="tab1" href="/tab1">
                  <IonIcon aria-hidden="true" icon={triangle} />
                  <IonLabel>Home</IonLabel>
                </IonTabButton> */}
                <IonTabButton tab="tab2" href="/donations">
                  <IonIcon aria-hidden="true" icon={giftOutline} />
                  <IonLabel>Donations</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab3" href="/tab3">
                  <IonIcon aria-hidden="true" icon={peopleOutline} />
                  <IonLabel>Crowdfunding</IonLabel>
                </IonTabButton>

                <IonTabButton
                  tab="menu"
                  onClick={() => {
                    const menu = document.querySelector('ion-menu');
                    if (menu) {
                      menu.open();
                    } else {
                      console.warn('ion-menu element not found');
                    }
                  }}
                >
                  <IonIcon icon={ellipsisHorizontal} />
                  <IonLabel>More</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonPage>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
    // </GlobalProvider>
  )
}

function AppMenu() {
  const closeMenu = () => {
    const menu = document.querySelector('ion-menu');
    if (menu) {
      menu.close();
    } else {
      console.warn('ion-menu element not found');
    }
  };

  const { isLoggedIn } = useAuth();
  const { logout } = useAuth();
  const { login } = useAuth();

  const [showDevMode, setShowDevMode] = useState(false);

  const toggleDevMode = () => {
    setShowDevMode(!showDevMode);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === 'd') {
        toggleDevMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <IonMenu type="reveal" contentId="main-content">
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Menu Content</IonTitle>
        </IonToolbar>
      </IonHeader> */}

      <div
        style={{
          borderRight: `8px solid var(--ion-color-tertiary)`,
          borderLeft: `18px solid var(--ion-color-secondary)`,
        }}
        className='flex items-center bg-primary w-full text-white ion-padding gap-sm font-semibold'
        onClick={(e) => {
          const target = e.target as HTMLElement;
          target.style.cursor = 'pointer';
          window.open('https://www.muslimhands.org.uk/', '_blank');
        }}
        onMouseEnter={(e) => {
          const target = e.target as HTMLElement;
          target.style.cursor = 'pointer';
          target.style.opacity = '90%';
        }}
        onMouseLeave={(e) => {
          const target = e.target as HTMLElement;
          target.style.cursor = 'default';
          target.style.opacity = '100%';
        }}
      >
        <IonIcon icon={arrowForwardCircleOutline} style={{ height: '24px', width: '24px' }} slot='start'/>
        muslimhands.org.uk
      </div>

      <div
        className="ion-padding"
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          // gap: `calc(var(--ion-padding) * 0.2)`,
        }}
      >
        {/* <IonList lines="none" id="main-menu" style={{ background: 'none'}}> */}
        <IonList lines="none" id="main-menu">
          <IonItem
            detail={false}
            routerLink="/home"
            routerDirection="none"
            onClick={closeMenu}
          >
            <IonIcon icon={homeOutline} />
            <IonLabel>Home </IonLabel>
          </IonItem>

          <IonItem
            detail={false}
            routerLink="/donations"
            routerDirection="none"
            onClick={closeMenu}
          >
            <IonIcon icon={giftOutline} />
            <IonLabel>Donations</IonLabel>
          </IonItem>

          <IonItem
            detail={false}
            routerLink="/sponsorships"
            routerDirection="none"
            onClick={closeMenu}
          >
            <IonIcon icon={sparklesOutline} />
            <IonLabel>Sponsorships</IonLabel>
          </IonItem>

          <IonItem
            detail={false}
            routerLink="/regular-giving"
            routerDirection="none"
            onClick={closeMenu}
          >
            <IonIcon icon={repeatOutline} />
            <IonLabel>Regular Giving</IonLabel>
          </IonItem>

          <IonItem
            detail={false}
            routerLink="/tab3"
            routerDirection="none"
            onClick={closeMenu}
          >
            <IonIcon icon={peopleOutline} />
            <IonLabel>Crowdfunding</IonLabel>
          </IonItem>

          <IonItem
            detail={false}
            routerLink="/"
            routerDirection="none"
            onClick={closeMenu}
          >
            <IonIcon icon={calendarOutline} />
            <IonLabel>Events</IonLabel>
          </IonItem>

          <IonItem
            detail={false}
            routerLink="/"
            routerDirection="none"
            onClick={closeMenu}
          >
            <IonIcon icon={calendarNumberOutline} />
            <IonLabel>Last 10 Nights</IonLabel>
          </IonItem>

          <IonItem
            detail={false}
            routerLink="/"
            routerDirection="none"
            onClick={closeMenu}
          >
            <IonIcon icon={calculatorOutline} />
            <IonLabel>Zakat Calculator</IonLabel>
          </IonItem>

          

        <IonItem
          style={{ marginTop: 50}}
          onClick={toggleDevMode}>
          <IonLabel>Dev Mode</IonLabel>
          <IonToggle
            slot="end"
            checked={showDevMode}
          />
        </IonItem>

        {showDevMode && (
          <div>
            <IonItem
              detail={false}
              routerLink="/theme-settings"
              routerDirection="none"
              onClick={closeMenu}
            >
              <IonIcon icon={colorPaletteOutline} />
              <IonLabel>UI Settings</IonLabel>
              <IonBadge slot="end" color={'dark'}>Dev Mode</IonBadge>
            </IonItem>

            <IonItem
              detail={false}
              routerLink="/stories"
              routerDirection="none"
              onClick={closeMenu}
            >
              <IonIcon icon={playCircleOutline} />
              <IonLabel>Stories </IonLabel>
              <IonBadge slot="end" color={'dark'}>Dev Mode</IonBadge>
            </IonItem>
          </div>
        )}

        </IonList>



        {isLoggedIn ?
          (
            <IonList id="user-menu"
              style={{
                position: 'fixed',
                width: '88%',
                bottom: 20,
              }}
            >
              <IonItemDivider>
                <IonLabel>Signed in as</IonLabel>
              </IonItemDivider>
              <IonItem>
                <IonAvatar aria-hidden="true" slot="start" style={{height:30, width: 30}}>
                  <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                </IonAvatar>
                <IonSelect placeholder="Ali">
                  <IonSelectOption value="a">Ali</IonSelectOption>
                  <IonSelectOption value="b">Ali at N3O</IonSelectOption>
                  <IonSelectOption value="c">Ali Foundation</IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonItem
                detail={false}
                routerLink="/"
                // routerDirection="none"
              >
                <IonLabel>Preferences</IonLabel>
              </IonItem>

              <IonItem
                detail={false}
                lines="none"
                routerLink="#"
                // routerDirection="none"
                onClick={logout}
              >
                <IonIcon icon={logOutOutline} slot="end" />
                <IonLabel>Sign Out</IonLabel>
              </IonItem>
            </IonList>
          ) : (
            <IonList id="user-menu"
              style={{
                position: 'fixed',
                width: '88%',
                bottom: 20,
              }}
            >
              <SignInModal>
                <IonItem
                  detail={false}
                  lines="none"
                  routerLink="#"
                  // routerDirection="none"
                  // onClick={login}
                  className='ion-item-mh'
                  style={{ ...(isDesktop ? {} : {'--background': 'var(--ion-color-tertiary)'}) }}
                >
                  <IonLabel>Sign In</IonLabel>
                  <IonIcon icon={logInOutline} slot="end" />
                </IonItem>
              </SignInModal>
            </IonList>
          )
        }

        {/* <div style={{ position: 'fixed', bottom: 30 }}>
          <Status />
          {isLoggedIn ? <LogoutButton /> : <LoginButton />}
        </div> */}

      </div>
      {/* </IonContent> */}
    </IonMenu>
  );
}

export default App;





// handy for dev mode
const LoginButton: React.FC = () => {
  const { login } = useAuth();
  return <IonButton onClick={login}>Sign In</IonButton>;
};


const LogoutButton: React.FC = () => {
  const { logout } = useAuth();
  return <IonButton onClick={logout}>Logout</IonButton>;
};

const Status: React.FC = () => {
  const { isLoggedIn } = useAuth();
  return <div>{isLoggedIn ? 'Logged In' : 'Logged Out'}</div>;
};