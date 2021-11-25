## vanilla js SPA todoList

1. social login 최종 수정

### 다음할 것

1. 로딩 애니매이션
2. local Event
3. useState
4. 뒤로가기가 적용안됨

https://cotak.tistory.com/102

- signUp은 social로 회원가입하면 바로 main, 아닐경우 로그인
- login은 social로 DB에 id존재하면 토큰 받고 메인으로

- main collection 데이터 받아오기
- useState, router 구현해야됨

- useState 테스트해보기
- router연결
- 배포

### content

- delete, 뒤로가기 설정
- taskBox에 완료 버튼 이벤트 추가하기

### popupz

- **해결못함**: return하는 곳에 colorList를 맵핑해서 li를 만드는 함수에 넣었는데 UI에 colorList요소 하나당 두개씩 추가됨

-data 전달

다음은 complete 섹션

### main

- main에서 화면이 로드되었을 때 데이터를 가져오는 controll추가해야됨

### Login

- REST API로 구현했으나 로그인 팝업이 불가하고, 페이지를 메인으로 보내고 그 정보를 바탕으로 DB에서 관련 데이터를 받아오는 것이므로 속도가 느리다. => Javascript SDK로 구현하려고 했으나 프론트에서 환경변수 관리가 어렵다. => REST API로 구현하고 로딩속도를 최저로 만들수 있도록 노력하고 로딩 애니메이션 추가하기

- login할 경우 쿠키,uid를 localStorage에 저장 => axios.defaults로 저장할 경우 새로고침하면 사라짐

- REST API로 구현했을 때 social/signUp으로가면 회원가입 한 사람이 로그인할 경우 화면이 매끄럽지 않음

- 소셜 로그인 - DB에 id있을경우, 없을 경우
- 카카오 로그아웃 구현하지 않았음 => 누를 떄 마다 재로그인을 해야됨
- 네이버 로그아웃 => http://nid.naver.com/nidlogin.logout 팝업하기?

### Router

- 현재 로직이 맞는지 모르겠음.

### 알게된 것

1. 데이터를 보낼 때 header의 컨텐트 타입과 body의 데이터 타입이랑 똑같아야 함 => 아닐 시 가지 않음

2. DOMcontentedLoad vs window onLoad

- window onload는 이미지 그리고 css ,서브프레임 등이 완벽하게 로딩이 끝났을 때 이벤트가 시작된다.
- DOMcontentedLoad는 초기 HTML문서를 완전히 불러오고 분석했을 때 발생하고, 스타일시트, 이미지, 하위 프레임의 로딩은 기다리지 않는다.

3. useState는 클로저를 이용해 구현할 수 있다.

- https://ko.javascript.info/onload-ondomcontentloaded

4. JWT token

- Refresh 토큰과 Access 토큰 두 개를 받아서 accessToken이 만료될 시 Refresh를 이용해 재발급하는 방식

5. onclick 문제점

- <button onclick>로 이벤트를 등록하면 함수를 전역에서만 찾는다.
- 전역변수로 선언되면 자바스크립트는 파일이 달라도 하나의 전역변수로 선언되기 때문에 문제가 일어나기 쉽다.

6. attribute에 직접적으로 이벤트를 등록한 이유

- index.js에서 DOM을 찾아서 이벤트를 등록하면 가독성이 떨어짐
- 전역변수로 선언하는 것에 있어서 거부감이 있었으나 가독성과 속도의 저하도 크지 않을 것 같아서 attribute로 직접 이벤트를 등록함
- 또한 처음엔 e.target이 되지가 않아서 다시 바꿧으나 event(this)이렇게하면 e.target을 가져올 수 있음\

7. axios를 추가한 이유

- 로그인을 하고 API통신을 하기 위해서는 쿠키를 헤더에 넣고 통신을 해야된다.
- localStrage에 쿠키를 저장하는 것보다 axios.defaults 사용하는 것이 더 안전할 거라고 생각하기도 했고 fetch를 더 간편하게 할 수 있기 때문에 추가했음

8. 코드 로직을 짜야 할 때

- 이번에 social로그인 로직을 짤 때 기준이 없어서 너무 오래걸렸다. => auth_redirect를 처음에 로그인, 다음에 signUp그 다음에 main으로 했는데 main으로 할 경우 리렌더링이 일어날 때 마다 API가 호출됨 => 비효율 => 다시 login으로 로직변경
- 최대한 직관적으로 짜기 위헤 API를 호출해서 이미 회원가입한 아이디면 needSignup:false 회원가입을 하지 않은 아이디면 needSignUp:true를 주는 것으로 해결했다.

9. router구현

- history.pushState로 url을 변경 => 현재의 url에 맞는 view 렌더하기.
