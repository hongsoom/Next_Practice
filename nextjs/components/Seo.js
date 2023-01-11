import Head from "next/head";

type UserProps = {
    title: string,
}

export default function Seo({ title }: UserProps): React.ReactElement {
    return (
        <Head>
            <title>{title} | Next Movies</title>
        </Head>
    )
}