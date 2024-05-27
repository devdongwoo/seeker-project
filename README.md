# Seeker (toy project)

- 배포주소(vercel)<br/>
  https://seeker-project.vercel.app/
  ※ new api key 받아야해서 새롭게 신청함 (2024.05.24)
  ※ riot api 변경때문에 전에 있던것을 유지보수하여 변경함 (2024.05.28)
- 개발기간<br/>
  2023.09.10 ~ 2023.09.12

- PC버전(반응형)
  ![image](/public/readmeImg/pc_1.png)

# 프로젝트 소개

next.js 13버전, redux 를 사용하고자 개발한 반응형 토이프로젝트입니다.<br/>
리그오브레전드 라는 게임의 key를 발급받아
api를 axios로 get 하여 각 유저마다 기록을 보여주고,<br/> 기록이 나오기전에는
skeleton ui를 제작하여 좀더 이탈율을 낮도록 만들었습니다.<br/>
redux-toolkit / redux-persist 를 사용하여 메인페이지로
돌아가더라도 봤던 유저를 즐겨찾기로 추가, 삭제 <br/>
기능 제작, 대부분의 style은 css in js방식으로 하였습니다.

# 시작 가이드

- ### frontend

```
  $ npm install
  $ npm run dev
```

# Stacks

### **Environment**<br/>

<img src="https://img.shields.io/badge/visual studio code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
&nbsp;<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

### **Config**<br/>

<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"><br/>

### **Development**<br/>

<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/react-20232a?style=for-the-badge&logo=react&logoColor=5dcfee">&nbsp;
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/emotion-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"><br/>

# 화면구성(반응형)

| 메인 페이지                          | 유저검색                             |
| ------------------------------------ | ------------------------------------ |
| ![image](/public/readmeImg/pc_1.png) | ![image](/public/readmeImg/pc_2.png) |
| 검색후 전적아래 더 보기 버튼         | 유저검색 후 메인페이지 이동한 후     |
| ![image](/public/readmeImg/pc_3.png) | ![image](/public/readmeImg/pc_4.png) |

- ### NextJs에서 api폴더를 생성하여 외부 api불러서 사용함 CORS정책 위배되지 않기 위해서

  ⭐️ api/...
  ⭐️ fetch, axios의 차이점을 느껴보면서 사용해보았다.

- ### 똑같은 유저를 검색해도 즐겨찾기 중복되지 않게 만든 코드
  ⭐️ set을 사용하지 않고 코드를 구성해보았다.

```
redux/features/bookmark.ts

setBookmark: (state, action: PayloadAction<InitialState>) => {
      const newState = current(state)

      if (newState.length > 1) {
        const point = action.payload.id
        let check_num = 0

        for (let i = 0; i < newState.length; i++) {
          if (point === newState[i].id) {
            check_num++
            break
          }
        }

        if (check_num === 0) state.push(action.payload)
      } else {
        state.push(action.payload)
      }

      return state
    }
```

# 아키텍쳐

- 디렉토리 구조

```
📦leagueOfLegend
 ┣ 📂.next
 ┃ ┣ 📂cache
 ┃ ┃ ┣ 📂swc
 ┃ ┃ ┃ ┗ 📂plugins
 ┃ ┃ ┃ ┃ ┗ 📂v7_windows_x86_64_0.98.13
 ┃ ┃ ┗ 📂webpack
 ┃ ┃ ┃ ┣ 📂client-development
 ┃ ┃ ┃ ┃ ┣ 📜0.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜1.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜10.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜11.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜12.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜13.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜14.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜15.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜16.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜17.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜18.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜2.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜3.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜4.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜5.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜6.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜7.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜8.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜9.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜index.pack.gz
 ┃ ┃ ┃ ┃ ┗ 📜index.pack.gz.old
 ┃ ┃ ┃ ┣ 📂client-development-fallback
 ┃ ┃ ┃ ┃ ┣ 📜0.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜1.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜2.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜index.pack.gz
 ┃ ┃ ┃ ┃ ┗ 📜index.pack.gz.old
 ┃ ┃ ┃ ┗ 📂server-development
 ┃ ┃ ┃ ┃ ┣ 📜0.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜1.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜10.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜11.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜12.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜13.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜14.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜15.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜16.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜17.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜18.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜19.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜2.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜20.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜3.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜4.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜5.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜6.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜7.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜8.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜9.pack.gz
 ┃ ┃ ┃ ┃ ┣ 📜index.pack.gz
 ┃ ┃ ┃ ┃ ┗ 📜index.pack.gz.old
 ┃ ┣ 📂server
 ┃ ┃ ┣ 📂app
 ┃ ┃ ┃ ┣ 📂favicon.ico
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┃ ┣ 📂summoner
 ┃ ┃ ┃ ┃ ┗ 📂[puuid]
 ┃ ┃ ┃ ┃ ┃ ┗ 📂[user]
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂[userId]
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜page.js
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page_client-reference-manifest.js
 ┃ ┃ ┃ ┣ 📜page.js
 ┃ ┃ ┃ ┗ 📜page_client-reference-manifest.js
 ┃ ┃ ┣ 📜app-paths-manifest.json
 ┃ ┃ ┣ 📜middleware-build-manifest.js
 ┃ ┃ ┣ 📜middleware-manifest.json
 ┃ ┃ ┣ 📜middleware-react-loadable-manifest.js
 ┃ ┃ ┣ 📜next-font-manifest.js
 ┃ ┃ ┣ 📜next-font-manifest.json
 ┃ ┃ ┣ 📜pages-manifest.json
 ┃ ┃ ┣ 📜server-reference-manifest.js
 ┃ ┃ ┣ 📜server-reference-manifest.json
 ┃ ┃ ┗ 📜webpack-runtime.js
 ┃ ┣ 📂static
 ┃ ┃ ┣ 📂chunks
 ┃ ┃ ┃ ┣ 📂app
 ┃ ┃ ┃ ┃ ┣ 📂summoner
 ┃ ┃ ┃ ┃ ┃ ┗ 📂[puuid]
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂[user]
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂[userId]
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┃ ┃ ┃ ┣ 📜layout.js
 ┃ ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┃ ┃ ┣ 📜app-pages-internals.js
 ┃ ┃ ┃ ┣ 📜main-app.js
 ┃ ┃ ┃ ┣ 📜polyfills.js
 ┃ ┃ ┃ ┣ 📜react-refresh.js
 ┃ ┃ ┃ ┗ 📜webpack.js
 ┃ ┃ ┣ 📂css
 ┃ ┃ ┃ ┗ 📂app
 ┃ ┃ ┃ ┃ ┗ 📜layout.css
 ┃ ┃ ┣ 📂development
 ┃ ┃ ┃ ┣ 📜_buildManifest.js
 ┃ ┃ ┃ ┗ 📜_ssgManifest.js
 ┃ ┃ ┗ 📂webpack
 ┃ ┃ ┃ ┣ 📜08bbe3671c2a994f.webpack.hot-update.json
 ┃ ┃ ┃ ┣ 📜5d0a21b0a602a5f2.webpack.hot-update.json
 ┃ ┃ ┃ ┣ 📜87972d67ff3c87f9.webpack.hot-update.json
 ┃ ┃ ┃ ┣ 📜app-pages-internals.5d0a21b0a602a5f2.hot-update.js
 ┃ ┃ ┃ ┣ 📜webpack.08bbe3671c2a994f.hot-update.js
 ┃ ┃ ┃ ┣ 📜webpack.5d0a21b0a602a5f2.hot-update.js
 ┃ ┃ ┃ ┗ 📜webpack.87972d67ff3c87f9.hot-update.js
 ┃ ┣ 📂types
 ┃ ┃ ┣ 📂app
 ┃ ┃ ┃ ┣ 📂summoner
 ┃ ┃ ┃ ┃ ┗ 📂[puuid]
 ┃ ┃ ┃ ┃ ┃ ┗ 📂[user]
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂[userId]
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.ts
 ┃ ┃ ┃ ┣ 📜layout.ts
 ┃ ┃ ┃ ┗ 📜page.ts
 ┃ ┃ ┗ 📜package.json
 ┃ ┣ 📜app-build-manifest.json
 ┃ ┣ 📜build-manifest.json
 ┃ ┣ 📜package.json
 ┃ ┣ 📜react-loadable-manifest.json
 ┃ ┗ 📜trace
 ┣ 📂app
 ┃ ┣ 📂axios
 ┃ ┃ ┣ 📜asia.ts : 게임 matche, 전적기록 정보 axios
 ┃ ┃ ┗ 📜riot.ts : riot 유저 정보 axios
 ┃ ┣ 📂components
 ┃ ┃ ┗ 📂units
 ┃ ┃ ┃ ┣ 📂layout
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx : layout 컴포넌트
 ┃ ┃ ┃ ┣ 📂search
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx : search 컴포넌트
 ┃ ┃ ┃ ┣ 📂skeleton
 ┃ ┃ ┃ ┃ ┗ 📜skeleton.tsx : skeleton ui 컴포넌트
 ┃ ┃ ┃ ┗ 📂userUi
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx : userUi 컴포넌트
 ┃ ┣ 📂img
 ┃ ┃ ┗ 📜index.ts : public 티어 이미지 배열로 넣어놓음
 ┃ ┣ 📂redux
 ┃ ┃ ┣ 📂features
 ┃ ┃ ┃ ┣ 📜bookmark.ts : 즐겨찾기 redux
 ┃ ┃ ┃ ┗ 📜user.ts : 유저데이터 redux
 ┃ ┃ ┣ 📜hooks.ts
 ┃ ┃ ┣ 📜provider.tsx
 ┃ ┃ ┗ 📜store.ts
 ┃ ┣ 📂summoner : 유저 페이지, 동적 세그먼트로 사용
 ┃ ┃ ┗ 📂[puuid]
 ┃ ┃ ┃ ┗ 📂[user]
 ┃ ┃ ┃ ┃ ┗ 📂[userId]
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜globals.css : 반응형 구조
 ┃ ┣ 📜layout.tsx
 ┃ ┗ 📜page.tsx : 메인 페이지
 ┣ 📂public
 ┃ ┣ 📂font
 ┃ ┃ ┣ 📜AppleSDGothicNeoB.ttf
 ┃ ┃ ┣ 📜AppleSDGothicNeoEB.ttf
 ┃ ┃ ┣ 📜AppleSDGothicNeoH.ttf
 ┃ ┃ ┣ 📜AppleSDGothicNeoL.ttf
 ┃ ┃ ┣ 📜AppleSDGothicNeoM.ttf
 ┃ ┃ ┣ 📜AppleSDGothicNeoR.ttf
 ┃ ┃ ┣ 📜AppleSDGothicNeoSB.ttf
 ┃ ┃ ┣ 📜AppleSDGothicNeoT.ttf
 ┃ ┃ ┣ 📜AppleSDGothicNeoUL.ttf
 ┃ ┃ ┣ 📜NanumGothic.ttf
 ┃ ┃ ┣ 📜NanumGothicBold.ttf
 ┃ ┃ ┣ 📜NanumGothicExtraBold.ttf
 ┃ ┃ ┣ 📜NanumGothicLight.ttf
 ┃ ┃ ┣ 📜PyeongChangPeace-Bold.ttf
 ┃ ┃ ┗ 📜PyeongChangPeace-Light.ttf
 ┃ ┣ 📂readmeImg
 ┃ ┃ ┣ 📜mobile_1.png
 ┃ ┃ ┣ 📜mobile_2.png
 ┃ ┃ ┣ 📜mobile_3.png
 ┃ ┃ ┣ 📜mobile_4.png
 ┃ ┃ ┣ 📜pc_1.png
 ┃ ┃ ┣ 📜pc_2.png
 ┃ ┃ ┣ 📜pc_3.png
 ┃ ┃ ┗ 📜pc_4.png
 ┃ ┣ 📜background_img.png
 ┃ ┣ 📜bronze.png
 ┃ ┣ 📜challenger.png
 ┃ ┣ 📜diamond.png
 ┃ ┣ 📜emerald.png
 ┃ ┣ 📜gold.png
 ┃ ┣ 📜grandmaster.png
 ┃ ┣ 📜iron.png
 ┃ ┣ 📜master.png
 ┃ ┣ 📜next.svg
 ┃ ┣ 📜platinum.png
 ┃ ┣ 📜silver.png
 ┃ ┣ 📜unranked.png
 ┃ ┗ 📜vercel.svg
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜next-env.d.ts
 ┣ 📜next.config.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┗ 📜tsconfig.json
```
