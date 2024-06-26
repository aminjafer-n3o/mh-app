import { Redirect, Route } from 'react-router-dom';

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
} from '@ionic/react';

import {
  menuOutline,
  link,
  ellipse, square, triangle
} from 'ionicons/icons';

import { IonReactRouter } from '@ionic/react-router';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/LoginWallDevPreview';
import ThemeSettings from './pages/ThemeSettings';
import LoginForm from './ui/LoginForm';

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

// setupIonicReact({ mode: 'ios' });
setupIonicReact({ mode: undefined });

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>

      <IonSplitPane when="md" contentId="main-content">
        <AppMenu />
        <IonPage id="main-content">
          <IonTabs>

            <IonRouterOutlet>
              <Route exact path="/tab1">
                <Tab1 />
              </Route>
              <Route exact path="/tab2">
                <Tab2 />
              </Route>
              <Route path="/tab3">
                <Tab3 />
              </Route>
              <Route exact path="/">
                <Redirect to="/tab1" />
              </Route>
              <Route exact path="/theme-settings">
                <ThemeSettings />
              </Route>

              {/* This should be on it's own page without the IonTabs and splitPane */}
              <Route exact path="/login">
                <LoginForm />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom" className="mobile-only">
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
                  <IonIcon icon={menuOutline} />
                  <IonLabel>Menu</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab1" href="/tab1">
                <IonIcon aria-hidden="true" icon={triangle} />
                <IonLabel>Tab 1</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/tab2">
                <IonIcon aria-hidden="true" icon={ellipse} />
                <IonLabel>Tab 2</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon aria-hidden="true" icon={square} />
                <IonLabel>Tab 3</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonPage>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

function AppMenu() {
  const closeMenu = () => {
  const menu = document.querySelector('ion-menu');
  if (menu) {
    menu.close();
  } else {
    console.warn('ion-menu element not found');
  }
};

  return (
    <IonMenu type="reveal" contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu Content</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        
          <IonItem
            routerLink="/tab1"
            routerDirection="none"
            onClick={closeMenu}
          >
            <IonIcon icon={triangle} slot="start" />
            <IonLabel>Tab1</IonLabel>
          </IonItem>
        
        
          <IonItem
            routerLink="/tab2"
            routerDirection="none"
            onClick={closeMenu}
          >
            <IonIcon icon={ellipse} slot="start" />
            <IonLabel>Donations</IonLabel>
          </IonItem>
        
        
          <IonItem
            routerLink="/tab3"
            routerDirection="none"
            onClick={closeMenu}
          >
            <IonIcon icon={square} slot="start" />
            <IonLabel>Crowdfunding</IonLabel>
          </IonItem>
        
        
          <IonItem
            routerLink="/tab1"
            routerDirection="none"
            onClick={closeMenu}
          >
            <IonIcon icon={link} slot="start" />
            <IonLabel>Menu Link</IonLabel>
          </IonItem>
        
        
          <IonItem
            routerLink="/tab1"
            routerDirection="none"
            onClick={closeMenu}
          >
            <IonIcon icon={link} slot="start" />
            <IonLabel>Menu Link</IonLabel>
          </IonItem>
        
        
          <IonItem
            routerLink="/tab1"
            routerDirection="none"
            onClick={closeMenu}
          >
            <IonIcon icon={link} slot="start" />
            <IonLabel>Menu Link</IonLabel>
          </IonItem>
        
        
          <IonItem
            routerLink="/theme-settings"
            routerDirection="none"
            onClick={closeMenu}
          >
            <IonIcon icon={link} slot="start" />
            <IonLabel>Theme Settings</IonLabel>
          </IonItem>

          <IonItem
            routerLink="/login"
            routerDirection="none"
            onClick={closeMenu}
          >
            <IonIcon icon={link} slot="start" />
            <IonLabel>Sign Out</IonLabel>
          </IonItem>
        
      </IonContent>
    </IonMenu>
  );
}

export default App;
