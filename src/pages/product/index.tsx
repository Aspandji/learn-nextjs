import { fetcher } from '@/lib/swr/fetcher';
import ProductView from '@/views/Product';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useSWR from "swr";




const ProductPage = () => {
    const [products, setProducts] = useState([])
    const { push } = useRouter()

    const { data, error, isLoading } = useSWR(
        "/api/product",
        fetcher
    );

    // useEffect(() => {
    //     fetch("/api/product")
    //         .then((res) => res.json())
    //         .then((res) => {
    //             setProducts(res.data)
    //         })
    // }, [])

    return (
        <div>
            <ProductView products={isLoading ? [] : data.data} />
        </div>
    )
}

export default ProductPage