import Link from 'next/link'
import React, { useState } from 'react'
import styles from './Register.module.scss'
import { useRouter } from 'next/router';

const RegisterView = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { push } = useRouter();


    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setError("");
        setIsLoading(true);
        const data = {
            email: event.target.email.value,
            fullname: event.target.fullname.value,
            password: event.target.password.value,
        };
        const result = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (result.status === 200) {
            event.target.reset();
            setIsLoading(false);
            push("/auth/login");
        } else {
            setIsLoading(false);
            setError(result.status === 400 ? "Email already exists" : "");
        }
    }

    return (
        <div className={styles.register}>
            <h1 className={styles.register__title}>Register</h1>
            {error && <p className={styles.register__error}>{error}</p>}
            <div className={styles.register__form}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.register__form__item}>
                        <label htmlFor="email" className={styles.register__form__item__label}>Email</label>
                        <input type="email" id='email' name='email' placeholder='abc@mail.com' className={styles.register__form__item__input} />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="fullname" className={styles.register__form__item__label}>Fullname</label>
                        <input type="text" id='fullname' name='fullname' placeholder='Jhon Doe' className={styles.register__form__item__input} />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="Password" className={styles.register__form__item__label}>Password</label>
                        <input type="password" id='password' name='password' placeholder='********' className={styles.register__form__item__input} />
                    </div>
                    <div className={styles.register__form__item}>
                        <button type='submit' className={styles.register__form__item__button} disabled={isLoading}>{isLoading ? "Loading..." : "Register"}</button>
                    </div>
                </form>
            </div>
            <p className={styles.register__link}>Have An Account? Sign In <Link href="/auth/login">Here</Link></p>
        </div>
    )
}

export default RegisterView