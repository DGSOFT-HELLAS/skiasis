import styles from './styles.module.css'


export default function Status({ status, fontSize }) {
    let color;
    switch (status) {
        case 'Προς έναρξη':
        color = 'green'  
        break;
        case 'Σε εξέλιξη':
        color = 'orange' 
    }
    return (
        <div className={styles.container} style={{fontSize: fontSize}}>
            <div className={styles.dot} style={{backgroundColor: color}}></div>
            <span>{status}</span>
        </div>
    )
}