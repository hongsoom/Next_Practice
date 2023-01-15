## Next.js 연습 프로젝트 - 영화 홈페이지

배운 내용을 정리하면서 적용한 프로젝트이며 여러 지식들을 배울 때마다 계속해서 적용할 계획입니다.

### 실행화면 💻

![](https://velog.velcdn.com/images/hongsoom/post/d06b8e80-b2d6-464b-b654-55829ef52d58/image.PNG)

### 배운 내용 📝
**1. Layout.js**
```JSX
// _app.js
import '../styles/globals.css'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
```

Component를 props로 받고 공통된 레이아웃 컴포넌트인 Layout 컴포넌트를 불러와줍니다.

Layout 컴포넌트 안에 Component를 넣어주고 리턴해줍니다.

```JSX
import NavBar from "./NavBar";
import React from 'react';

export default function Layout({ children }) {
    return (
        <>
            <NavBar />
            <div>{children}</div>
        </>
    )
}
```

레이아웃 컴포넌트는 공통으로 들어가게될 NavBar 컴포넌트가 있고

자식으로 오게될 { children } prop도 return 해줍니다.

```JSX
// NavBar.js
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
    const router = useRouter();
    return (
        <nav>
            <img src="/vercel.svg" />
            <div>
                <Link legacyBehavior href="/">
                    <a className={router.pathname === "/" ? "active" : ""}>Home</a>
                </Link>
                <Link legacyBehavior href="/about">
                    <a className={router.pathname === "/about" ? "active" : ""}>About</a>
                </Link>
            </div>
            <style jsx>{`
        nav {
          display: flex;
          gap: 10px;
          flex-direction: column;
          align-items: center;
          padding-top: 20px;
          padding-bottom: 10px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
            rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        }
        img {
          max-width: 100px;
          margin-bottom: 5px;
        }
        nav a {
          font-weight: 600;
          font-size: 18px;
        }
        .active {
          color: tomato;
        }
        nav div {
          display: flex;
          gap: 10px;
        }
      `}</style>
        </nav>
    );
}
```

어떤 페이지를 이동해도 NavBar 컴포넌트가 렌더링이 됩니다.


**2. API KEY 숨기기**

보통 API KEY는 본인의 고유한 것이기 때문에 인터넷에 노출시키면 안됩니다. 그렇기 때문에 env 파일 안에 넣어서 작업한 후 깃에도 올라가지 않도록 항상 조심하는 것이 좋습니다. 하지만 Next.js에선 API KEY나 특정 경로를 감출 때 `Redirect`와 `Rewrite`라는 것을 사용합니다.

`Redirect`
```JSX
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source : "/old-blog/:path*",
        destination : "/new-sexy-blog/:path*",
        permanent : false,
      },
    ];
  },
}

module.exports = nextConfig
```

redirect는 특정 URL을 직접 입력하면 Redirect로 다른 URL로 이동시키는 기능입니다.

- source : request 경로
- destination : redirect할 경로
- permanent : true / false
  - true : 클라이언트와 

`Rewrite`
```JSX
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const nextConfig = {
  reactStrictMode: true,
 async rewrites() {
    return [
      {
        source : "/api/movies",
        destination : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      },
      {
        source : "/api/movies/:id",
        destination : `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`
      }
    ]
  }
}

module.exports = nextConfig
```

rewrite는 redirect처럼 리다이렉트 기능을 하지만 여기서 한가지 다른점은 **URL이 바뀌지 않은 상태로 이동한다는 점**입니다. 즉, 마치 이동이 되지 않은 것 처럼 보여줍니다. 그렇기 때문에 API 키나 특정한 경로를 감추고 싶을 때 사용하면 됩니다.

**3. getServerSideProps**
```JSX
export async function getServerSideProps() {
  const { results } = await (await fetch(`http://localhost:3000/api/movies`)).json();
  return {
    props: {
      results,
    },
  };
}
```

```JSX
export function getServerSideProps({ params: { params } }) {
    return {
      props: {
        params,
      },
    };
  }
```

**4. Next.js 의 라우팅**

**4-1 pages 디렉토리**

Papes에서 만든 폴더와 파일은 곧 Router 경로가 됩니다.

```JSX
// pages/about.js

export default function About() {
  return <div>About</div>
}

// http://localhost:3000/about 경로에 About이라는 문구가 보인다.
```
- pages/index.js ⇒ /
- pages/blog/index.js ⇒ /blog

**4-2 next/router**

`useRouter` 훅을 사용해서 router 객체에 접근할 수 있습니다. 

```JSX
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  console.log(router);
}
```
`router object`

![](https://velog.velcdn.com/images/hongsoom/post/2e8059e0-0fd5-4089-892d-62f4455e9ae8/image.png)


- `asPath` - string - basePath 또는 locale 없이 브라우저에 표시되는 경로 (쿼리포함)

- `basePath` - string - 활성 basePath (활성화 된 경우)

- `defaultLocale` - string - 현재 기본 locale (활성화 된 경우)

- `isFallback` - boolean - 현재 페이지가 fallback 모드인지 여부

- `isPreview` - boolean - 앱이 현재 미리보기 모드인지 여부

- `isReady` - boolean - 라우터 필드가 클라이언트 측에서 업데이트되고 사용할 준비가 되었는지 여부. useEffect 메소드 내에서만 사용해야하며 서버에서 조건부로 렌더링 하는 데에 사용해야한다.

- `locale` - string - 활성 로케일 (활성화 된 경우)

- `locales` - string[] - 지원되는 모든 로케일 (활성화 된 경우)

- `pathname` - string - 현재 경로. 이는 /pages 의 페이지 경로이며(파일명) 구성된 basePath 또는 locale 은 포함되지 않는다.

- `query` - object - 객체로 구문 분석 된 쿼리 문자열. 페이지에 데이터 가져오기 요구사항이 없는 경우 사전 렌더링 중에 빈 객체가 된다. 기본값은 {}


`router.push`

```JSX
router.push(url, as, options)
```

- url : 이동할 경로
- as : 브라우저에 표시될 URL
- options
  - scroll : 기본값 true, 이동 후 페이지를 상단으로 스크롤 제어
  - shallow : 기본값 false, getStaticProps, getServerSideProps 또는 getInitialProps 를 다시 실행하지 않고 현재 페이지의 경로를 업데이트
  - locale - 선택적 문자열, 새 페이지의 로케일을 나타냄

```JSX
import { useRouter } from "next/router";

export default function Home({ results }) {
  const router = useRouter();
  const onClick = (id, title) => {
    router.push(`/movies/${title}/${id}`);
  };
  return (
    <div className="container">
      {results?.map((movie) => (         
        <div onClick={() => onClick(movie.id, movie.original_title)}className="movie" key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
        </div>
      ))}
    </div>
  )
}
```

**4-3 Next/Link**

a tag 대신, <Link> 컴포넌트를 사용해 a tag를 감싸줍니다. <Link>를 사용하면 클라이언트 사이드 네비게이션(client-side navigation)을 할 수 있도록 도와줍니다.

```JSX
import Link from "next/link";

export default function NavBar() {
    return (
        <nav>
            <img src="/vercel.svg" />
            <div>
                <Link legacyBehavior href="/">
                    <a className={router.pathname === "/" ? "active" : ""}>Home</a>
                </Link>
                <Link legacyBehavior href="/about">
                    <a className={router.pathname === "/about" ? "active" : ""}>About</a>
                </Link>
            </div>
        </nav>
    );
}
```
