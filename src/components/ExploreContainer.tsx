import { IonButton, IonImg, IonItem, IonLabel, IonThumbnail } from '@ionic/react';
import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>

      <IonButton>TODO</IonButton>

    </div>
  );
};

export default ExploreContainer;
