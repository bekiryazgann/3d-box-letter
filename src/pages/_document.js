import {Html, Head, Main, NextScript} from 'next/document'
import Header from "@/components/header";

export const metadata = {
    title: 'Next.js',
}

export default function Document() {
    return (
        <Html lang="en">
            <Head/>
            <body>
            <Header/>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
