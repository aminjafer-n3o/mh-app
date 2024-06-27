import React, { useEffect, useState } from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
    IonRange,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonText,
    IonThumbnail,
    IonTitle,
    IonToggle,
    IonToolbar,
} from '@ionic/react';
import type { ToggleCustomEvent } from '@ionic/react';
import { personCircle, personCircleOutline, sunny, sunnyOutline } from 'ionicons/icons';

import './ThemeSettings.css';
const isDesktop = window.innerWidth >= 768;

function ThemeSettings() {
    const [paletteToggle, setPaletteToggle] = useState(false);

    // Listen for the toggle check/uncheck to toggle the dark palette
    const toggleChange = (ev: ToggleCustomEvent) => {
        toggleDarkPalette(ev.detail.checked);
    };
    
    // Add or remove the "--ion-box-shadow-color" css variable and set it to unset
    const toggleShadow = (shouldAdd: boolean) => {
        document.documentElement.style.setProperty('--ion-box-shadow-color', shouldAdd ? 'rgba(0, 0, 0, 0.1)' : 'unset');
    };

    // Add or remove the "ion-palette-dark" class on the html element
    const toggleDarkPalette = (shouldAdd: boolean) => {
        document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
    };

    // Check/uncheck the toggle and update the palette based on isDark
    const initializeDarkPalette = (isDark: boolean) => {
        setPaletteToggle(isDark);
        toggleDarkPalette(isDark);
    };

    useEffect(() => {
        // Use matchMedia to check the user preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

        // Initialize the dark palette based on the initial
        // value of the prefers-color-scheme media query
        initializeDarkPalette(prefersDark.matches);

        const setDarkPaletteFromMediaQuery = (mediaQuery: MediaQueryListEvent) => {
            initializeDarkPalette(mediaQuery.matches);
        };

        // Listen for changes to the prefers-color-scheme media query
        prefersDark.addEventListener('change', setDarkPaletteFromMediaQuery);

        return () => {
            prefersDark.removeEventListener('change', setDarkPaletteFromMediaQuery);
        };
    }, []);



    const [primaryColor, setPrimaryColor] = useState(getComputedStyle(document.documentElement).getPropertyValue('--ion-color-primary'));
    const [secondaryColor, setSecondaryColor] = useState(getComputedStyle(document.documentElement).getPropertyValue('--ion-color-secondary'));
    const [tertiaryColor, setTertiaryColor] = useState(getComputedStyle(document.documentElement).getPropertyValue('--ion-color-tertiary'));
    const [padding, setPadding] = useState(20);
    const [borderRadius, setBorderRadius] = useState(8);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [hasShadow, setHasShadow] = useState(true);

    const updatePrimaryColor = (color: string) => {
        setPrimaryColor(color);
        const root = document.documentElement;
        const rgb = color.match(/\w\w/g)?.map((x: string) => parseInt(x, 16));
        if (rgb) {
            const [r, g, b] = rgb;
            const rgbValue = `${r}, ${g}, ${b}`;
            root.style.setProperty('--ion-color-primary-rgb', rgbValue);
            root.style.setProperty('--ion-color-primary', `rgb(${rgbValue})`);
            root.style.setProperty('--ion-color-primary-shade', `rgb(${r * 0.9}, ${g * 0.9}, ${b * 0.9})`);
            root.style.setProperty('--ion-color-primary-tint', `rgb(${r * 1.1}, ${g * 1.1}, ${b * 1.1})`);
        }
    };
    const updateSecondaryColor = (color: string) => {
        setSecondaryColor(color);
        const root = document.documentElement;
        const rgb = color.match(/\w\w/g)?.map((x: string) => parseInt(x, 16));
        if (rgb) {
            const [r, g, b] = rgb;
            const rgbValue = `${r}, ${g}, ${b}`;
            root.style.setProperty('--ion-color-secondary-rgb', rgbValue);
            root.style.setProperty('--ion-color-secondary', `rgb(${rgbValue})`);
            root.style.setProperty('--ion-color-secondary-shade', `rgb(${r * 0.9}, ${g * 0.9}, ${b * 0.9})`);
            root.style.setProperty('--ion-color-secondary-tint', `rgb(${r * 1.1}, ${g * 1.1}, ${b * 1.1})`);
        }
    };
    const updateTertiaryColor = (color: string) => {
        setTertiaryColor(color);
        const root = document.documentElement;
        const rgb = color.match(/\w\w/g)?.map((x: string) => parseInt(x, 16));
        if (rgb) {
            const [r, g, b] = rgb;
            const rgbValue = `${r}, ${g}, ${b}`;
            root.style.setProperty('--ion-color-tertiary-rgb', rgbValue);
            root.style.setProperty('--ion-color-tertiary', `rgb(${rgbValue})`);
            root.style.setProperty('--ion-color-tertiary-shade', `rgb(${r * 0.9}, ${g * 0.9}, ${b * 0.9})`);
            root.style.setProperty('--ion-color-tertiary-tint', `rgb(${r * 1.1}, ${g * 1.1}, ${b * 1.1})`);
        }
    };

    const updatePadding = (value: number) => {
        setPadding(value);
        document.documentElement.style.setProperty('--ion-padding', `${value}px`);
    };

    const updateBorderRadius = (value: number) => {
        setBorderRadius(value);
        document.documentElement.style.setProperty('--ion-radius', `${value}px`);
    };

    const toggleDarkMode = (isDark: boolean) => {
        setIsDarkMode(isDark);
        document.body.classList.toggle('dark', isDark);
    };

    const updateFontFamily = (font: string) => {
        document.documentElement.style.setProperty('--app-font-family', font);
    };



    return (
        <IonPage>
            <IonHeader class="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton default-href="/"></IonBackButton>
                    </IonButtons>
                    <IonTitle>Theme Settings</IonTitle>
                    <IonButtons slot="end">
                        <IonButton color="dark">
                            <IonIcon slot="icon-only" ios={personCircleOutline} md={personCircle}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <div style={{maxWidth: '600px', margin: '0 auto' }}>
                    <IonListHeader>Appearance</IonListHeader>
                    <IonList inset={true}>
                        <IonItem>
                            <IonToggle checked={paletteToggle} onIonChange={toggleChange} justify="space-between">
                                Dark Mode
                            </IonToggle>
                        </IonItem>
                        <IonItem>
                            <IonLabel >Primary Color</IonLabel>
                            <IonLabel slot="end">
                                <input
                                    style={{ width: 80, border: 0, padding: 0 }}
                                    type="color" value={primaryColor} onChange={(e) => updatePrimaryColor(e.target.value)} />
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel >Secondary Color</IonLabel>
                            <IonLabel slot="end">
                                <input
                                    style={{ width: 80, border: 0, padding: 0 }}
                                    type="color" value={secondaryColor} onChange={(e) => updateSecondaryColor(e.target.value)} />
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel >Tertiary Color</IonLabel>
                            <IonLabel slot="end">
                                <input
                                    style={{ width: 80, border: 0, padding: 0 }}
                                    type="color" value={tertiaryColor} onChange={(e) => updateTertiaryColor(e.target.value)} />
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonSelect label="Font"
                                placeholder="Select Font"
                                // interface="action-sheet"
                                interface="popover"
                                onIonChange={(e) => updateFontFamily(e.detail.value)}
                            >
                                <IonSelectOption value="system-ui, sans-serif">System Default</IonSelectOption>
                                <IonSelectOption value="'Poppins', sans-serif">Poppins</IonSelectOption>
                                <IonSelectOption value="'Plus Jakarta Sans', sans-serif">Plus Jakarta Sans</IonSelectOption>
                                <IonSelectOption value="'Inter', sans-serif">Inter</IonSelectOption>
                                <IonSelectOption value="'Signika', sans-serif">Signika</IonSelectOption>
                                <IonSelectOption value="'DM Sans', sans-serif">DM Sans</IonSelectOption>
                            </IonSelect>
                        </IonItem>


                    </IonList>



                    {/* <IonList inset={true}>
                        <IonItem button={true}>Text Size</IonItem>
                        <IonItem>
                            <IonToggle justify="space-between">Bold Text</IonToggle>
                        </IonItem>
                    </IonList> */}



                    <IonListHeader>Look and feel</IonListHeader>
                    <IonList inset={true}>
                        <IonItem>
                            <IonLabel slot="start">Spacing</IonLabel>
                            <IonRange
                                slot='end'
                                min={2}
                                max={24}
                                step={1}
                                value={padding}
                                onIonInput={(e) => updatePadding(e.detail.value as number)}
                            />

                        </IonItem>
                        <IonItem>
                            <IonLabel slot="start">Roundedness</IonLabel>
                            <IonRange
                                slot='end'
                                min={0}
                                max={32}
                                step={1}
                                value={borderRadius}
                                onIonInput={(e) => updateBorderRadius(e.detail.value as number)}
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel slot="start">Shadow (Elevated UI)</IonLabel>
                            <IonToggle
                                slot='end'
                                checked={hasShadow}
                                onIonChange={(e) => toggleShadow(e.detail.checked)}
                            />
                        </IonItem>
                    </IonList>



                    <IonListHeader>Preview</IonListHeader>
                    <IonList inset={true} className='shadow-xl flex flex-col gap'>

                        <IonItem >
                            <IonThumbnail slot="start">
                                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                            </IonThumbnail>
                            <IonLabel>Item Thumbnail</IonLabel>
                        </IonItem>
                        <IonItem className=''>
                            <IonButton fill="outline">Outline</IonButton>
                            <IonButton fill="solid">Solid</IonButton>
                            <IonButton disabled={true}>Inactive</IonButton>
                            <IonButton fill="clear">Clear</IonButton>
                        </IonItem>
                        <IonItem className=''>
                            <IonButton color={'secondary'} fill="outline">Outline</IonButton>
                            <IonButton color={'secondary'} fill="solid">Solid</IonButton>
                            <IonButton color={'secondary'} disabled={true}>Inactive</IonButton>
                            <IonButton color={'secondary'} fill="clear">Clear</IonButton>
                        </IonItem>
                        <IonItem className=''>
                            <IonButton color={'tertiary'} fill="outline">Outline</IonButton>
                            <IonButton color={'tertiary'} fill="solid">Solid</IonButton>
                            <IonButton color={'tertiary'} disabled={true}>Inactive</IonButton>
                            <IonButton color={'tertiary'} fill="clear">Clear</IonButton>
                        </IonItem>
                    </IonList>
                </div>

            </IonContent>
        </IonPage>
    );
}
export default ThemeSettings;