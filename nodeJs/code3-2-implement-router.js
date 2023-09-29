// localhost:3000/user와 localhost:3000/feed라는 두 URL이 있다고 가정하고 두 요청에 대해 다른 응답을 주는 코드를 작성하겠습니다.

// user와 feed 요청을 처리하는 서버
const http = require("http");
const url = require("url") // url 모듈을 로딩 : url 모듈을 로딩하고 url 변수에 할당합니다.

http
 .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname; // path name 할당
    // url 모듈을 사용해 요청(req)으로 받은 url의 pathnamedmf 얻어냅니다. 
    // "localhost:3000/user"라는 pathname은 "/user"가 됩니다.
    
    res.setHeader("Content-Type", "text/html");

    if (path === "/user") {
        res.end("[user] name : andy, age: 30"); // user 결괏값 설정
    } else if (path === "/feed") {
        res.end(`<ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
        </ul>
        `) // feed에 대한 결괏값 설정
    } else {
        res.statusCode = 404;
        // statusCode: statusCode는 HTTP 응답 객체의 속성 중 하나로, HTTP 상태 코드를 나타냅니다. 
        // HTTP 상태 코드는 웹 서버가 클라이언트에게 응답의 상태를 알려주는 데 사용되는 3자리 숫자입니다.
        res.end('404 page not found'); // 결괏값으로 에러 메시지 설정
    }

 })
    .listen("3000", () => console.log("라우터를 만들어보자!!"));

    // localhost:3000/user 
    // 위 주소를 브라우저에 입력후 접속해서 user name값이 반환되면 성공



/*
Node.js 환경에서 `require()` 메서드는 CommonJS 모듈 시스템의 일부로 사용되는 함수입니다. 이 함수는 특정 모듈을 불러올 때 사용됩니다. 주요 기능과 특징은 다음과 같습니다:

1. **모듈 가져오기**: `require()` 함수는 지정된 모듈의 내보낸 내용을 반환합니다.
   
   예:
   ```js
   const fs = require('fs');  // 'fs'는 파일 시스템을 다루는 기본 제공 모듈입니다.
   ```

2. **내장 모듈**: Node.js는 여러 내장 모듈을 제공하며, 이들 모듈은 추가 설치 없이 바로 `require()`를 사용해 불러올 수 있습니다. 위의 예제에서 `http`와 `fs` 모듈은 Node.js의 내장 모듈입니다.

3. **사용자 정의 모듈**: 사용자가 직접 작성한 파일도 `require()`로 불러올 수 있습니다. 이때는 파일 경로를 명시해야 합니다.

   예:
   ```js
   const myModule = require('./myModule.js');
   ```

4. **npm 패키지**: Node.js의 패키지 관리자인 npm을 사용하여 설치한 외부 패키지(라이브러리)도 `require()`로 불러올 수 있습니다.

5. **캐싱**: `require()`로 한 번 불러온 모듈은 캐싱되어, 다시 같은 모듈을 불러오려 할 때 빠르게 접근할 수 있습니다. 이렇게 해서 반복적인 파일 읽기 작업을 방지하며, 성능을 향상시킵니다.

6. **동기식 로딩**: `require()`는 동기적으로 작동합니다. 이는 모듈 로딩이 완료되기 전까지 코드 실행이 일시 중지된다는 것을 의미합니다.

`require()` 함수로 불러온 모듈은 `module.exports` 또는 `exports`를 사용하여 내보낼 수 있는 값을 정의합니다. 

위에서 언급한 `const http = require("http");` 코드는 Node.js의 내장 `http` 모듈을 불러오는 코드입니다. 이 `http` 모듈은 HTTP 서버 및 클라이언트 기능을 제공합니다.

*/