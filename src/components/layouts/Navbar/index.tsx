import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import style from "./Navbar.module.css"
import Image from 'next/image'

const Navbar = () => {
    const { data }: any = useSession()
    // console.log(data)
    return (
        <div className={style.navbar}>
            <div>Navbar</div>
            <div className={style.profile}>
                {data?.user?.image && (<Image width={30} height={30} className={style.avatar} src={data.user.image} alt={data.user.fullname} />)}
                {data && data.user.fullname}
                {data ? (<button className={style.button} onClick={() => signOut()}>Sign Out</button>) : (<button className={style.button} onClick={() => signIn()}>Sign In</button>)}
            </div>
        </div>
    )
}

export default Navbar