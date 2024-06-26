import React, { useState, useRef } from 'react';
import Stories from 'react-insta-stories';
import './story.css'

import { IonContent, IonButton, IonModal, IonPage, IonIcon } from '@ionic/react';

import {
  close
} from 'ionicons/icons';

const StoriesPage: React.FC = () => {

  const modal = useRef<HTMLIonModalElement>(null);

  // const modalCTA = useRef<HTMLIonModalElement>(null);

  // const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);


  return (
    <IonPage>
      <IonContent fullscreen>

        {/* <IonButton
          style={{ margin: 'auto', marginTop: 200, maxWidth: 200 }}
          className="ion-padding" id="open-modal" expand="block">
          Show Stories
        </IonButton> */}

        <IonModal
          id="stories-modal"
          ref={modal} trigger="open-modal"
          // presentingElement={presentingElement!}
          canDismiss={true}
        >
          <IonButton
            size='large'
            style={{ position: 'absolute', zIndex: 9999, right: 0, color: 'white' }}
            fill="clear" onClick={() => modal.current?.dismiss()}>
            <IonIcon slot="icon-only" ios={close} md={close}></IonIcon>
          </IonButton>
          <Stories
            loop
            // isPaused={true}
            keyboardNavigation
            defaultInterval={5000}
            // @ts-ignore
            stories={stories2}
            width={'100%'}
            height={'100%'}
          />
        </IonModal>


        <div style={{ height: '40px' }}></div>
        <div 
        style={{ maxWidth: '400px', height: '100%', margin: 'auto' }}
        className="stories ">
          <Stories
            loop
            // isPaused={true}
            keyboardNavigation
            defaultInterval={8000}
            // @ts-ignore
            stories={stories2}
            width={'100%'}
            height={'90vh'}
            // maxHeight={'640px'}
          />
        </div>

      </IonContent>
    </IonPage>
  );
};

export default StoriesPage;

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
        style={{ margin: 'auto', marginTop: 100, maxWidth: 200 }}
        className="ion-padding" id="cta-modal" expand="block">
        Donate Now →
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

const StoryOverlay = ( { close }: { close: () => void } ) => {

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
    cover: 'https://picsum.photos/100/200',
    url: 'https://picsum.photos/1080/2400',
    seeMore: ({ close }: { close: () => void }) => (
      <StoryOverlay close={close} />
    ),
    // seeMoreCollapsed: () => ( <StoryModalCTA /> ),
    duration: 3000,
  },

  {
    cover: 'https://picsum.photos/101/201',
    url: 'https://picsum.photos/1081/2401',
    seeMore: true,
    seeMoreCollapsed: () => (<StoryModalCTA />),
    // duration: 990000,
  },

  {
    url: 'https://videos.pexels.com/video-files/6646662/6646662-hd_1080_1920_24fps.mp4',
    type: 'video',
    seeMore: true,
    seeMoreCollapsed: () => (<StoryModalCTA />),
  },

  {
    url: 'https://videos.pexels.com/video-files/6646688/6646688-hd_1280_720_24fps.mp4',
    type: 'video',
    //@ts-ignore
    seeMore: ({ close }) => (
      <div
        style={{
          maxWidth: '100%',
          height: '100%',
          padding: 40,
          background: 'white',
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
    url: 'https://videos.pexels.com/video-files/20743387/20743387-uhd_1440_2560_30fps.mp4',
    type: 'video',
  },

  {
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