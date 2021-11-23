## vanilla js SPA todoList

1. social/signup로직 변경

### 다음할 것

https://cotak.tistory.com/102

1. 무조건 router하고 signUp,login 체크

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

- 소셜 로그인 - DB에 id있을경우, 없을 경우
- 카카오 로그아웃 구현하지 않았음 => 누를 떄 마다 재로그인을 해야됨
- 네이버 로그아웃 => http://nid.naver.com/nidlogin.logout 팝업하기?

### signUp

- social로 로그인 => social/login으로 redirect => 매개변수로 nickname주기

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
