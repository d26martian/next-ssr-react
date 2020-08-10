import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { MainLayout } from "../../components/MainLayout";
import Link from "next/link";
import { NextPageContext } from "next";
import { MyPost } from "../../interfaces/post";

interface PostPageProps {
    post: MyPost
}

export default function Post({ post: serverPost }: PostPageProps) {

    const [post, setPost] = useState(serverPost);
    const router = useRouter();

    useEffect(() => {
        async function load() {
            const response = await fetch(`${process.env.API_URL}/posts/${router.query.id}`);
            const data = await response.json();

            setPost(data);
        }

        if (!serverPost) {
            load();
        }
    }, []);

    if (!post) {
        return (
            <MainLayout>
                <p>Loading ....</p>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <h1>{post.title}</h1>
            <hr />
            <p>{post.body}</p>
            <Link href={'/posts'}>
                <a>Go to posts</a>
            </Link>
        </MainLayout>
    )
}

interface PostNextPageContext extends NextPageContext {
    query: {
        id: string
    }
}

// if you need render on server and frontend
Post.getInitialProps = async ({ query, req }: PostNextPageContext) => {
    if (!req) {
        return { post: null }
    }

    const response = await fetch(`http://localhost:2626/posts/${query.id}`);
    const post: MyPost = await response.json();
    console.log(query);

    return {
        post
    }
};


// if you need render on server
// export async function getServerSideProps({ query, req }) {
//     if (!req) {
//         return { post: null }
//     }
//
//     const response = await fetch(`http://localhost:2626/posts/${query.id}`);
//     const post = await response.json();
//     console.log(query);
//
//     return { props: {post} }
// }