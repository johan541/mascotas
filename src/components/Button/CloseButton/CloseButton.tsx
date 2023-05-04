import styles from './CloseButton.module.scss';

type CloseButtonProps = {
  onEvent: () => void;
};

const CloseButton = ({ onEvent }: CloseButtonProps) => {
  return (
    <div className={styles.content} onClick={onEvent}>
      <button className={styles.button}></button>
    </div>
  );
};

export default CloseButton;
