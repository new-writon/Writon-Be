### 💻 기술 스택

---
🔑**Front-End**🔑 : 
</br>
Lanuage && Framework 
</br>&nbsp;
   <img src="https://img.shields.io/badge/javascript-F7DF1E?style=flat-the-badge&logo=javascript&logoColor=white"> 
   <img src="https://img.shields.io/badge/react-61DAFB?style=flat-the-badge&logo=react&logoColor=white"> 
</br>
Communication Method
</br>&nbsp;
 <img src="https://img.shields.io/badge/axios-5A29E4?style=flat-the-badge&logo=axios&logoColor=white"> 
</br>
State Management 
</br>&nbsp;
<img src="https://img.shields.io/badge/recoil-f26b00?style=flat-the-badge&logo=relay&logoColor=white"> 
</br>
Build Tool 
</br>&nbsp;
<img src="https://img.shields.io/badge/vite-646CFF?style=flat-the-badge&logo=vite&logoColor=white"> 
</br></br>
🔓**Back-End**🔓 : 
</br>
Lanuage && Framework 
</br>&nbsp;
 <img src="https://img.shields.io/badge/typescript-3178C6?style=flat-the-badge&logo=typescript&logoColor=white"> 
 <img src="https://img.shields.io/badge/node.js-339933?style=flat-the-badge&logo=node.js&logoColor=white"> 
 <img src="https://img.shields.io/badge/express-000000?style=flat-the-badge&logo=express&logoColor=white"> 
</br>
Infra
</br>&nbsp;
 <img src="https://img.shields.io/badge/docker-2496ED?style=flat-the-badge&logo=docker&logoColor=white"> 
 <img src="https://img.shields.io/badge/githubactions-2088FF?style=flat-the-badge&logo=githubactions&logoColor=white"> 
 <img src="https://img.shields.io/badge/amazons3-569A31?style=flat-the-badge&logo=amazons3&logoColor=white"> 
 <img src="https://img.shields.io/badge/amazonec2-FF9900?style=flat-the-badge&logo=amazonec2&logoColor=white"> 
 <img src="https://img.shields.io/badge/amazonrds-527FFF?style=flat-the-badge&logo=amazonrds&logoColor=white"> 
</br>
Monitoring
</br>&nbsp;
 <img src="https://img.shields.io/badge/pm2-2B037A?style=flat-the-badge&logo=pm2&logoColor=white"> 
 <img src="https://img.shields.io/badge/slack-4A154B?style=flat-the-badge&logo=slack&logoColor=white"> 
</br>
DB
</br>&nbsp;
 <img src="https://img.shields.io/badge/mysql-4479A1?style=flat-the-badge&logo=mysql&logoColor=white"> 
 <img src="https://img.shields.io/badge/redis-DC382D?style=flat-the-badge&logo=redis&logoColor=white"> 
</br>
API Documentation 
</br>&nbsp;
 <img src="https://img.shields.io/badge/postman-FF6C37?style=flat-the-badge&logo=postman&logoColor=white"> 











## 📌 Commit Convention

---

### [TAG] 메시지

| 태그 이름  |                               설명                                |
| :--------: | :---------------------------------------------------------------: |
|  chore   |                     코드 수정, 내부 파일 수정                     |
|   feat   |                         새로운 기능 구현                          |
|   add    | FEAT 이외의 부수적인 코드 추가, 라이브러리 추가, 새로운 파일 생성 |
|   fix    |                          버그, 오류 해결                          |
|   style    |      코드에 관련 없는 주석 달기, 줄바꿈                          |
|   docs   |                   README나 WIKI 등의 문서 개정                    |

## 💻 Branch Strategy

---
<details>
<summary>Git Workflow</summary>
<div markdown="1">

```
main → develop → feature_# / fix_#
feature, fix 이하 번호는 issue 번호에 맞게 생성

Issue 예시
/-------------------------
Feature/Fix Request
기능 설명 : 초대장을 보내줍니다.
To-Do List
* 난수 생성해서 초대코드 보내주기
-------------------------/

PR 예시
/-------------------------
Solved Issue
close/해결한 이슈의 링크

Motivation
* 초대장 생성 api 구현

Key Changes
* 난수 생성해서 초대코드 생성

To Reviewers
* 머지해주세요~~
-------------------------/

1. issue 생성
2. local - feature_# / fix_# 에서 각자 기능 작업
3. remote - feature_# / fix_# 에 Push
4. remote - develop 으로 PR
5. 코드 리뷰 후 Confirm 받고 remote - develop Merge
6. remote - develop 에 Merge 될 때 마다 모든 팀원 local - develop pull 받아 최신 상태 유지
```

</div>
</details>

| Branch Name |       설명       |
| :---------: |:--------------:|
|    main     |    배포용 브랜치     |
|   develop   |   구현 완료 브랜치    |
| feature\_/#  | 이슈 별 기능 구현 브랜치 |
|   fix\_/#    |  이슈 별 픽스 브랜치   |

## 📃 API Documentation

[API명세서](https://documenter.getpostman.com/view/23289358/2s93eSZvMC)

## ⚙️ Software Architecture

---
![Architecture](https://github.com/KUALSNS/BE/assets/37439067/cd0733d3-629c-40d2-b115-1f0835adb8f7)

