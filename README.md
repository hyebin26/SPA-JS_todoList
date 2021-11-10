## vanilla js SPA todoList

1. fetch collection데이터 추가
2. react에 useState를 구현하는 방법 찾기

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

### 다음할 것

- main 으로 todo 데이터 받기
- window.onload 이벤트 추가하기

1. router연결
2. DB에 task , collection 추가
3. 배포

https://ko.javascript.info/onload-ondomcontentloaded
