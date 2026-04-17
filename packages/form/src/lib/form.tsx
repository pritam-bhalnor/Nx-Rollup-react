import styles from './form.module.css';

export function FormComponent() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sample Form Test 123</h2>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input type="text" id="name" name="name" className={styles.input} placeholder="Enter your name" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email Address</label>
          <input type="email" id="email" name="email" className={styles.input} placeholder="Enter your email" />
        </div>
        <button type="button" className={styles.button}>Submit</button>
      </form>
    </div>
  );
}

export default FormComponent;
