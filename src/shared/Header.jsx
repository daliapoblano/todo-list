import styles from "./Header.module.css";

function Header({ title }) {
    return (
        <header>
            <h1>{title}</h1>
        </header>
    );
}

export default Header;