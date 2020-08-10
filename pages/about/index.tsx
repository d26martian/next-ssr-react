import React from 'react';
import { useRouter } from 'next/router';
import { MainLayout } from "../../components/MainLayout";

export default function About() {

    const router = useRouter();

    const handlerClick = () => {
        router.push('/')
    };

    return (
        <MainLayout title={'About Page'}>
            <h1>About Page </h1>
            <button onClick={handlerClick}>Go back to home</button>
            <br/>
            <button onClick={() => router.push('/posts')}>Go to posts</button>
        </MainLayout>
    )
}