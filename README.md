## vanilla js SPA todoList

1. popup 나가기 버튼 로직 수정(class로 하지 않고 useState를 사용함) => 리렌더링을 시키기위해
2. popup.js에 collection에서 form을 submit할 경우 method put으로 변경

### 다음할 것

- popup 로직 cancel 하고 x버튼 그리고 main popup로직변경
- 메인 페이지 화면 뚝뚝 끊키는 것 해결하기
- addtasks해야됨
- collectionTask.js에 완료버튼 이벤트
- collectionDone 이주하기

- https://github.com/facebook/react/issues/11527 => setState가 비동기인이유 확인하기
- 리렌더링을 할때 렌더링을 하나의 컴포넌트만 되게 하기

1. 로딩 애니매이션

https://cotak.tistory.com/102

- signUp은 social로 회원가입하면 바로 main, 아닐경우 로그인
- login은 social로 DB에 id존재하면 토큰 받고 메인으로

- main collection 데이터 받아오기

- 리팩토링 해보기 => 추상화 https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Make-useSate-hook/#_3-render-%E1%84%92%E1%85%A1%E1%86%B7%E1%84%89%E1%85%AE-%E1%84%8E%E1%85%AE%E1%84%89%E1%85%A1%E1%86%BC%E1%84%92%E1%85%AA참고
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
- Link class undefined 체크하기
- mutationObserver 사용못함 => 너무 비효율적 / Object만을 감지할 수는 아직 없음
  참고:https://stackoverflow.com/questions/32148423/how-to-use-or-is-it-possible-mutationobserver-to-monitor-window-location-pathn

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
- 또한 처음엔 e.target이 되지가 않아서 다시 바꿧으나 event(this)이렇게하면 e.target을 가져올 수 있음

7. axios를 추가한 이유

- 로그인을 하고 API통신을 하기 위해서는 쿠키를 헤더에 넣고 통신을 해야된다.
- 쿠키를 사용해서 저장하는 것보다 axios.defaults 사용하는 것이 더 안전할 거라고 생각하기도 했고 fetch를 더 간편하게 할 수 있기 때문에 추가했음

8. 코드 로직을 짜야 할 때

- 이번에 social로그인 로직을 짤 때 기준이 없어서 너무 오래걸렸다. => auth_redirect를 처음에 로그인, 다음에 signUp그 다음에 main으로 했는데 main으로 할 경우 리렌더링이 일어날 때 마다 API가 호출됨 => 비효율 => 다시 login으로 로직변경
- 최대한 직관적으로 짜기 위헤 API를 호출해서 이미 회원가입한 아이디면 needSignup:false 회원가입을 하지 않은 아이디면 needSignUp:true를 주는 것으로 해결했다.

9. router구현

- history.pushState로 url을 변경 => 현재의 url에 맞는 view 렌더하기.
- history.pushState로 url을 변경 => 현재의 url에 맞는 view를 렌더하기 위해서는 url이 변경하면 event를 추가해야됨 하지만 찾지 못했음
- 생각한 방법은 => history.pushState를 해당 함수에서 하는 것이 아니라 Router.HandePush("가고 싶은 링크")로 링크 변경하고 render를 하기

10. LocalStorage vs Cookie

- Cookie vs LocalStrage
- Cookie는 매번 서버로 전송이 되고 LocalStorage에 비해 용량이 적다.
- LocalStrage 매번 서버로 전송X 클라이언트 사이드에서 저장하고 관리, 용량도 쿠키보다 큼,영구 데이터 저장이 가능하다.

11. 토큰 유효성 검증(비동기 동기)

- token의 유효성을 검증할 때 checkToken이라는 함수에 우선 accessToken을 검증하고 만료되었을 경우 DB에 refreshToken이 존재하는지 체크하고 있을 경우 accessToken을 재발급 받는 형식으로 함수를 작성하였다. 하지만 DB를 호출하는 함수가 비동기여서 return값에 undefined가 나옴 => 다른 방법을 찾지 못하여 DB호출하는 함수를 쿼리문에서 구현

- 참고: https://stackoverflow.com/questions/14220321/how-to-return-the-response-from-an-asynchronous-call

12. Query String vs Path Variable

Path Variable

- 특정 인덱스에 대한 조회
- ex) 아이디가 20번인 유저 조회 -> /user/:userId

Query String

- 특정 값으로 필터링
- 이름이 james이고 20살인 유저조회 => /user?userName=james?age=20

13. event.currentTarget vs event.target

- 바닐라 자바스크립트로 링크를 구현할 때 모든 링크에서 onClickTag라는 하나의 함수를 공용으로 호출하기 때문에, 함수의 매개변수 to값이 계속해서 변경되었음.
- 고민된게 우선 계속해서 새로운 함수를 만들어 주는 것은 올바른 로직이 아니라고 생각해서 고민하던 중 현재의 target에 적혀있는 href값을 가져와서 url을 변경하려고 했으나 a태그 자식요소가 존재할 경우 target에 href가 존재하지 않음
- event.currentTarget은 무조건 이벤트가 걸려있는 위치를 반환하므로 자식요소를 클릭해도 이벤트가 걸려있는 a태그를 가져오므로 href값을 가져올 수 있음
