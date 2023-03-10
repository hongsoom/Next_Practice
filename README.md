# Next.js

## Next를 사용하는 이유
Reacts는 싱글 페이지 애플리케이션(SPA)로, 사이트에 접속할 때 하나의 페이지를 불러온다. 하나의 페이지를 불러올 때 필요한 모든 자바스크립트 파일을 한 번에 불러오기 때문에 페이지를 이동하게 되면 받아온 파일을 이용하여 UI를 변화시키고, 필요한 데이터는 서버에서 JSON 형태로 받아서 UI를 빠르게 변화시킬 수 있다. 하지만 이러한 특징은 SPA의 장점이자 단점이 된다. 
1. 모든 자바스크립트 코드를 불러와야 하기 때문에 처음 페이지를 불러올 때 시간이 오래 걸린다.
2. SEO(검색 엔진 최적화)에 불리

이런 문제점을 SSR(서버 사이드 렌더링)을 사용함으로써 해결할 수 있다.
SSR은 사이트에 접속할 때 렌더링된 HTML을 불러오게 된다. 필요한 자바스크립트 파일을 불러올 때까지 반응은 하지 않지만, 빠르게 화면을 보일 수 있게에 속도가 빨라 보이게 된다. 그리고 검색엔진봇에 렌더링 된 HTML을 제공하여 SEO에 유리하다. 하지만 SSR도 단점이 있다.
1. 페이지 이동 시 새로운 페이지를 요청하기 때문에 깜빡임이 존재
2. 페이지 이동 시 템플릿을 중복해서 로딩하기 때문에 서버에 부담을 줘 성능상 좋지 않다.

Next는 SPA와 SSR의 단점을 해결하기 위해서 React에 서버 사이드 렌더링 기능을 더하여 SPA와 SSR의 장점을 가질 수 있게 된다.

## Next의 특징
`1. 사전 렌더링 및 서버 사이드 렌더링`
- 서버 사이드 렌더링 기능을 제공하여 클라이언트 사이드 렌더링 환경보다 빠른 렌더링을 불러올 수 있으며 SEO에 유리하다.
HTML을 불러온 후에는 페이지에 필요한 최소한의 자바스크립트 코드를 불러와 페이지를 사용할 수 있게 된다. 이건 요청 시에 서버 사이드 렌더링을 통하여 HTML을 생성하게 된다.

`2. Hot Code Reloading을 지원하는 개발 환경`
- 코드 변경 사항이 저장되면 응용 프로그램을 자동을 다시 로드
개발 모드일 때 소스 코드를 저장하면 오른쪽 하단에 삼각형 애니메이션이 생기는데 이는 Next가 응용 프로그램을 컴파일 하고 있다는 것을 알려주는 표시

`3. 설정이 필요 없음`
- 기본적으로 웹팩과 바벨을 사용하고 있기 때문에 서버 사이드 렌더링 및 개발에 필요한 설정이 이미 되어 있어 빠르게 개발 시작 가능 또한, 사용하고 싶은 플로그인이 있다면 손쉽게 추가하여 사용 가능

`4. Typescript 내장`

`5. 파일기반 내비게이션 기능`
- 폴더의 경로에 따라 페이지의 경로가 설정되어 구축이 빠르고 관리가 편리

`6. styled-jsx 지원`
- 자체 CSS-in-JS인 styled-jsx를 지원

## Next 설정
- Next.js 설치
```jsx
yarn create next-app --typescript
```

- 개발 서버 실행
```jsx
cd 해당 프로젝트명
yarn dev
```
개발 서버를 실행 후 http://localhost:3000을 열면 페이지 접속 가능
