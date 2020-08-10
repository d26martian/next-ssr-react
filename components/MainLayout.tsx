import Link from "next/link";
import Head from "next/head";

export function MainLayout({ children, title = 'Next App' }) {
    return (
        <>
            <Head>
                <title>{title} | Next example</title>
                <meta name="keywords" content="HTML, CSS, JavaScript" />
                <meta name="description" content="it is information for web app" />
                <meta charSet="utf-8" />
            </Head>
            <nav>
                <Link href={'/'}>
                    <a>Home</a>
                </Link>
                <Link href={'/about'}>
                    <a>About</a>
                </Link>
                <Link href={'/posts'}>
                    <a>Posts</a>
                </Link>
            </nav>
            <main>
                {children}
            </main>
            <style jsx blobal>
                {`
                    nav {
                        position: fixed;
                        left: 0;
                        right: 0;
                        top: 0;
                        height: 60px;
                        background-color: darkblue;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;            
                    }
                    
                    nav a {
                        color: #fff;
                        text-decoration: none;
                    }
                    
                    main {
                        margin-top: 60px;
                        padding-top: 1rem;
                    }
                `}
            </style>
        </>
    )
}