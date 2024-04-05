import styles from './styles.module.css'


export default function Status({ status }) {
    return (
        <div className={styles.container}>
            <div className={styles.dot}></div>
            <span>{status}</span>
        </div>
    )
}