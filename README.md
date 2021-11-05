## vanilla js SPA todoList

1. add popup logic 변경

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

### 다음할 것

- server에 todo테이블에 데이터 추가\*\*
- 데이터 join하기 mysql 켜서 확인
- 배열은 있는 그대로 저장 x => 배열 형태의 데이터를 통째로 String으로 변환하기

1. router연결
2. DB에 task , collection 추가
3. 배포
