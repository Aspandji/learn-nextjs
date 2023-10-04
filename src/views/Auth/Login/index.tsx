import Link from 'next/link'
import React, { useState } from 'react'
import styles from './Login.module.scss'
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

const LoginView = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { push, query } = useRouter();

    const callbackUrl: any = query.callbackUrl || '/';

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: event.target.email.value,
                password: event.target.password.value,
                callbackUrl
            });

            if (!res?.error) {
                setIsLoading(false);
                push(callbackUrl);
            } else {
                setIsLoading(false);
                setError("Email Or Password is Incorect");
            }

        } catch (error: any) {
            setIsLoading(false);
            setError("Email Or Password is Incorect")
        }
    }

    return (
        <div className={styles.login}>
            <h1 className={styles.login__title}>Login</h1>
            {error && <p className={styles.login__error}>{error}</p>}
            <div className={styles.login__form}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.login__form__item}>
                        <label htmlFor="email" className={styles.login__form__item__label}>Email</label>
                        <input type="email" id='email' name='email' placeholder='abc@mail.com' className={styles.login__form__item__input} />
                    </div>
                    <div className={styles.login__form__item}>
                        <label htmlFor="Password" className={styles.login__form__item__label}>Password</label>
                        <input type="password" id='password' name='password' placeholder='********' className={styles.login__form__item__input} />
                    </div>
                    <div className={styles.login__form__item}>
                        <button type='submit' className={styles.login__form__item__button} disabled={isLoading}>{isLoading ? "Loading..." : "Login"}</button>
                    </div>
                </form>
                <div className={styles.login__form__item}>
                    <button className={styles.login__form__item__button} onClick={() => signIn("google", { callbackUrl, redirect: false })}>Sign In With Google</button>
                </div>
            </div>
            <p className={styles.login__link}>Don{"'"}t Have An Account? Sign Up <Link href="/auth/register">Here</Link></p>
        </div>
    )
}

export default LoginView