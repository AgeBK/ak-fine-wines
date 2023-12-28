import styles from "./Button.module.css";

const Button = ({ children, css, onClick, disabled }) => (
  <button
    className={styles[css]}
    onClick={onClick}
    disabled={false || disabled}
  >
    {children}
  </button>
);

export default Button;
