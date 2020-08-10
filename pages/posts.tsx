import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';

import { MainLayout } from "../components/MainLayout";
import Link from "next/link";
import { MyPost } from "../interfaces/post";
import { NextPageContext } from "next";


interface PostsPageProps {
    posts: MyPost[]
}

export default function Posts({ posts: serverPosts }: PostsPageProps) {
    const [posts, setPosts ] = useState(serverPosts);
    const router = useRouter();
    // FETCH
    useEffect(() => {
        async function load() {
            const response = await fetch('http://localhost:2626/posts');
            const json = await response.json();
            console.log(json);
            setPosts(json);
        }

        if (!serverPosts) {
            load();
        }
    }, []);

    if (!posts) {
        return (
            <MainLayout>
                <p>Loading ...</p>
            </MainLayout>
        )
    }

    // AXIOS
    // useEffect(() => {
    //     axios.get('http://localhost:2626/posts').then(({data}) => {
    //         // console.log(data)
    //         setPosts(data);
    //     })
    // }, []);

    return (
        <MainLayout title={'Posts Page'}>
            <h1>Post Page</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <Link href={'/post/[id]'} as={`/post/${post.id}` }>
                            <a>{post.title}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </MainLayout>
    )
}

Posts.getInitialProps = async ({ req }: NextPageContext) => {
    if (!req) {
        return { posts: null }
    }

    const response = await fetch(`${process.env.API_URL} /posts`);
    const posts: MyPost[] = await response.json();
    // const posts = axios.get('http://localhost:2626/posts').then(({ data }) => (data));

    return {
        posts
    }
};

// export async function getServerSideProps({ req }) {
//     if (!req) {
//         return { posts: null }
//     }
//
//     const response = await fetch('http://localhost:2626/posts');
//     const posts = await response.json();
//     // const posts = axios.get('http://localhost:2626/posts').then(({ data }) => (data));
//
//     return { props: { posts }}
// }