<div>
 <img src="https://capsule-render.vercel.app/api?type=waving&color=adffe4&height=180&text=TripUs&animation=twinkling&fontColor=078d75&fontSize=60&section=header&desc=여행%20동행%20정보%20공유를%20위한%20커뮤니티%20서비스&descAlignY=65&fontAlignY=40" width="100%"/>
</div>

    
# TripUs (여행 동행 / 정보 공유를 위한 커뮤니티 서비스)

![image](https://github.com/user-attachments/assets/0b2fc27d-9337-4302-9cf6-f62a72b8c406)


## 프로젝트 개요

혼자 여행을 준비하고 떠나는 일이 부담스럽게 느껴지는 사용자들에게 여행 동행자를 쉽게 찾고, 함께한 여정의 추억을 나눌 수 있는 공간이 필요하다 생각했습니다.
TripUs는 여행 동행자를 구하는 사람들에게 여행 취향이나 일정이 맞는 사람을 쉽게 찾을 수 있는 커뮤니티입니다. 동행원 모집 게시글을 통해 동행 조건에 맞는 크루를 모집할 수 있습니다.
댓글, 좋아요, 채팅을 통해 사용자들 간에 실시간으로 소통할 수 있는 플랫폼을 제공합니다.

## 프로젝트 소개
<img src="https://github.com/user-attachments/assets/150fe16a-eaf0-4b2e-aa04-0e62ef4856e3" >
<img width="1020" alt="스크린샷 2025-05-26 오후 10 15 03" src="https://github.com/user-attachments/assets/72817eed-be65-4ec4-8116-0aaf6ae87b91" />




## 프로젝트 기간

2025.4.25 ~ 2025.5.19

## 기술 스택

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
<img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">

## 화면 구성

| 메인 페이지 | 게시글 페이지 |
| :-------------------------------------------: | :------------: |
|  <img width="329" src="https://github.com/user-attachments/assets/fb184b85-50ca-4cb0-b3e0-ecc2d1144f47"/> |  <img width="329" src="https://github.com/user-attachments/assets/6862d682-1ed9-4993-9876-92fa262ca62e"/>|  
| 게시글 작성 페이지 | 프로필 페이지 |  
| <img width="329" src="https://github.com/user-attachments/assets/3653b33f-4e1c-4151-a3ff-05d9bde1bec1"/>   |  <img width="329" src="https://github.com/user-attachments/assets/385cae88-dab1-4f56-9e95-1a179606aab7"/>     |
| 메시지 페이지 | 404 페이지 |
| <img width="329" src="https://github.com/user-attachments/assets/fae7e351-41d8-4cb1-8ea1-23050122e81c"/> |  <img width="329" src="https://github.com/user-attachments/assets/02ca112a-0cfc-4c58-bf0f-d703aeda61ef"/> |


## 기능 소개

### 게시글
<img width="1020" src="https://github.com/user-attachments/assets/a1a917fd-55d5-40e4-8fb2-b673f6880278">
<img width="400" src="https://github.com/user-attachments/assets/443d8a58-7514-40cf-9b78-b725deb6dc1c">
<img width="400" src="https://github.com/user-attachments/assets/a5a2cf5a-4b65-4df7-8d8d-44c51e39c4b6">
<hr>

- 하단의 댓글 입력 창을 통해 댓글을 등록할 수 있고, 댓글의 삭제 버튼을 통해 삭제가 가능합니다.
- 댓글 위의 좋아요 버튼을 통해, 게시글에 좋아요를 등록하거나 취소할 수 있습니다.
- 동행 신청하기 버튼을 통해 사용자는 해당 동행 모집 게시글에 동행을 신청할 수 있습니다.
- 한 번 더 클릭할 경우, 동행을 취소할 수 있습니다.
- 게시글 작성자는 승인/거절 버튼을 통해 신청자의 동행 신청을 승인 또는 거절할 수 있습니다. 

### 게시글 작성
<img width="500" src="https://github.com/user-attachments/assets/9a05a5b7-7c0a-4bbf-8aee-ae502c89e64f">
<hr>

- 게시판 선택을 통해, 게시판 종류에 따른 다른 양식을 제공합니다.
- 크루원을 모집할 경우, 2명에서 10명까지 모집 인원을 선택할 수 있습니다.
- 지역 입력은 200여객국을 자동 완성 기능으로 제공하며, 그 외의 도시나 나라도 입력할 수 있습니다.
- 일정 선택은 크루 모집의 경우 오늘 이후의 날짜만 선택이 가능하고, 항해 일지를 선택할 경우 오늘 이전의 날짜만 선택이 가능합니다.
- 오픈 카톡 주소를 입력하여 크루와의 서비스 외의 소통이 가능합니다.
- 사진을 추가할 경우 게시글 최상단에 슬라이드의 형태로 나타납니다.
- 동행조건은 성별과 나이로 선택할 수 있으며, 조건에 해당하지 않는 사용자는 동행 신청을 할 수 없습니다.

### 사용자 목록
<img width="300" src="https://github.com/user-attachments/assets/1d6e1027-7d00-4e6c-9ec1-131137d04e3f">
<img width="500" src="https://github.com/user-attachments/assets/af5ec2f2-dbb9-4a78-8d04-8f2e6ba9f193">
<hr>

- 헤더 상단의 아이콘을 클릭하면 전체 사용자 목록을 열 수 있습니다.
- 목록에는 사용자의 프로필 사진, 닉네임, 나이, 성별이 표시되며, 스크롤을 통해 전체 사용자 정보를 확인할 수 있습니다.
- 검색창을 통해 닉네임 또는 사용자 이름으로 검색이 가능하여 원하는 사용자를 빠르게 찾을 수 있습니다.
- 목록에서 사용자를 클릭하면 해당 사용자의 프로필 페이지로 이동할 수 잇습니다.
- 각 사용자 옆에는 온라인/오프라인 상태 표시가 포함되어 있어 현재 활동 중인 사용자를 쉽게 확인할 수 있습니다.

### 마이페이지
![프로필_gif_kn](https://github.com/user-attachments/assets/eddf3955-6a53-4abf-ad59-c6fb9ff8e977)
<hr>

- 마이페이지 우측 상단의 "회원정보 수정" 버튼을 통해 프로필 이미지를 원하는 이미지로 변경하거나 기본 이미지 변경할 수 있습니다.
- 유저 닉네임의 경우 2자 이상 10자 이내의 한글, 영문, 숫자로 구성하여 변경할 수 있으며 해당 제약 조건 위반 시 토스트 메시지를 띄워 사용자가 확인할 수 있도록합니다.
- 뱃지 형태의 자기소개 키워드를 태그 형식으로 사용자가 직접 작성할 수 있도록 해, 간결하고 자유롭게 추가 및 삭제할 수 있습니다.
- 자기소개 태그는 중복 및 공백문자를 입력을 할 수 없으며, 중복으로 등록할 시에는 토스트 메시지를 띄워 사용자가 확인할 수 있도록 합니다.
- 저장 버튼을 눌러 변경된 사용자 정보를 업데이트합니다.
- 마이페이지 내부에 "항해일지" 탭과 "크루모집" 탭을 분리하여, 사용자가 작성한 후기 게시글과 동행원 모집 게시글목록을 각각 한눈에 살펴볼 수 있습니다.
- 각 탭에서는 새로운 항해일지나 크루모집 게시글을 작성할 수 있습니다.
  
### 유저프로필
![유저프로필_gif_kn](https://github.com/user-attachments/assets/482b0117-8078-4804-b952-6a430422d142)
<hr>

- 유저프로필에서는 해당 유저의 프로필 이미지, 이름, 나이, 성별 그리고 자기소개 태그를 확인할 수 있습니다.
- 유저프로필에 우측 상단의 "채팅 보내기" 버튼을 통해 해당 유저와의 채팅창으로 이동하여 대화를 시작할 수 있습니다.
- 유저프로필 내부에 "항해일지" 탭과 "크루모집" 탭을 분리하여, 해당 유저가 작성한 후기 게시글과 동행원 모집 게시글 목록을 각각 한눈에 살펴볼 수 있습니다.

### 404 페이지
![404페이지](https://github.com/user-attachments/assets/1d0e303d-a11d-49f2-8378-c5c3ac2f87ad)
![404페이지 다크](https://github.com/user-attachments/assets/ed475b70-88e0-4fa0-be58-794d2fdab9c2)
<hr>

- 잘못된 경로로 집인하게 되었을 경우, 404 페이지를 띄워 바로 이전 페이지 또는 메인 페이지로 이동할 수 있습니다.


## 디렉토리 구조

```bash
📦public                    # 정적 파일
📦src
 ┣ 📂apis                   # API 호출 관련 함수
 ┣ 📂assets                 # 정적 리소스 (이미지, JSON 등)
 ┃ ┣ 📂data
 ┃ ┣ 📂images
 ┣ 📂components             # 공통 및 기능별 UI 컴포넌트
 ┃ ┣ 📂commons              # 공용 컴포넌트
 ┃ ┗ 📂features
 ┃ ┃ ┣ 📂home                   # 메인 홈페이지
 ┃ ┃ ┣ 📂message                # 메시지
 ┃ ┃ ┣ 📂notification           # 알림
 ┃ ┃ ┣ 📂post                   # 게시글 작성 및 수정
 ┃ ┃ ┣ 📂postDetail             # 게시글 상세 페이지
 ┃ ┃ ┣ 📂profile                # 유저 프로필
 ┃ ┗ ┗ 📂user                   # 유저 목록
 ┃
 ┣ 📂constants              # 상수 정의
 ┣ 📂context                # React Context
 ┣ 📂css                    # CSS 파일
 ┣ 📂hooks                  # 커스텀 훅
 ┣ 📂layouts                # 레이아웃 컴포넌트
 ┣ 📂pages                  # 라우트 페이지
 ┣ 📂store                  # zustand 전역 상태 관리
 ┣ 📂types                  # 타입 정의
 ┣ 📂utils                  # 유틸 함수
 ┣ 📜App.tsx
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```

## 팀원 소개

<div align="center">

  <table>
    <tr>
      <td align="center" style="border:1px solid #ccc; border-radius:10px; padding:10px; width:140px;">
        <img src="https://github.com/run3go.png" width="100px;" style="border-radius:50%;" alt="run3go"/><br />
        <b>박정수</b><br />
        <a href="https://github.com/run3go">@run3go</a>
        <span>Frontend</span>
      </td>
      <td align="center" style="border:1px solid #ccc; border-radius:10px; padding:10px; width:140px;">
        <img src="https://github.com/amykoomj.png" width="100px;" style="border-radius:50%;" alt="amykoomj"/><br />
        <b>구민지</b><br />
        <a href="https://github.com/amykoomj">@amykoomj</a>
        <span>Frontend</span>
      </td>
      <td align="center" style="border:1px solid #ccc; border-radius:10px; padding:10px; width:140px;">
        <img src="https://github.com/jieun22222.png" width="100px;" style="border-radius:50%;" alt="jieun22222"/><br />
        <b>송지은</b><br />
        <a href="https://github.com/jieun22222">@jieun22222</a>
        <span>Frontend</span>
      </td>
      <td align="center" style="border:1px solid #ccc; border-radius:10px; padding:10px; width:140px;">
        <img src="https://github.com/KwonTaeHun00.png" width="100px;" style="border-radius:50%;" alt="KwonTaeHun00"/><br />
        <b>권태훈</b><br />
        <a href="https://github.com/KwonTaeHun00">@KwonTaeHun00</a>
        <span>Frontend</span>
      </td>
      <td align="center" style="border:1px solid #ccc; border-radius:10px; padding:10px; width:140px;">
        <img src="https://github.com/seoyeoxxlee.png" width="100px;" style="border-radius:50%;" alt="seoyeoxxlee"/><br />
        <b>이서영</b><br />
        <a href="https://github.com/seoyeoxxlee">@seoyeoxxlee</a>
        <span>Frontend</span>
      </td>
    </tr>
  </table>

</div>

##
