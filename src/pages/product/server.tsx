import ProductView from '@/views/Product'
import React from 'react'
import { ProductType } from '../../types/product.type'


const ProductPage = ({ products }: { products: ProductType[] }) => {
    return (
        <div>
            <ProductView products={products} />
        </div>
    )
}

export default ProductPage

export async function getServerSideProps() {
    // fetch data
    const res = await fetch("http://localhost:3000/api/product")
    const response = await res.json()

    return {
        props: {
            products: response.data
        }
    }
}