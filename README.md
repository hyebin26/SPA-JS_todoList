## vanilla js SPA todoList

1. main, header 리팩토링
2. 로직 변경
3. 서버에 토큰 보내는 것 추가

### 다음할 것

- 토큰 유효성 검증하기 => https://cotak.tistory.com/102

* main 으로 todo 데이터 받기
* window.onload 이벤트 추가하기

1. useState 테스트해보기
2. router연결
3. DB에 task , collection 추가
4. 배포

### content

- delete, 뒤로가기 설정
- taskBox에 완료 버튼 이벤트 추가하기

### popupz

-data 전달

다음은 complete 섹션

### main

- main에서 화면이 로드되었을 때 데이터를 가져오는 controll추가해야됨

### Login

- 카카오 로그아웃 구현하지 않았음 => 누를 떄 마다 재로그인을 해야됨
- 네이버 로그아웃 => http://nid.naver.com/nidlogin.logout 팝업하기?

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
