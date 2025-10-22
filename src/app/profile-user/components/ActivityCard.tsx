import Image from "next/image";
import styles from "./ActivityCard.module.css";

interface ActivityCardProps {
  image: string;
  title: string;
  description: string;
  buttonText?: string;
}

export default function ActivityCard({
  image,
  title,
  description,
  buttonText = "Descubrir",
}: ActivityCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={title}
          width={100}
          height={80}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <button className={styles.button}>{buttonText}</button>
      </div>
    </div>
  );
}
