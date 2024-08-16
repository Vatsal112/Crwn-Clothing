import Link from "next/link";
import styles from "./directory-item.module.css";

const DirectoryItem = ({
  category,
}: {
  category: { title: string; imageUrl: string; route: string };
}) => {
  const { title, imageUrl, route } = category;

  return (
    <Link href={route} className={styles["directory-item-container"]}>
      <div
        className={styles["background-image"]}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className={styles.body}>
        <h2 className={styles.h2}>{title}</h2>
        <p className={styles.p}>Shop Now</p>
      </div>
    </Link>
  );
};

export default DirectoryItem;
