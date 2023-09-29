// "hello Node.js"를 출력하는 서버 예제

const http = require("http");
let count = 0;

const server = http.createServer((req, res) => { // 서버 객체 생성
    // createServer() : 서버 인스턴스를 만드는 함수
    log(count); // 카운트 1 증가
    res.statusCode = 200; // 결괏값 200, 요청에 대한 상태 코드를 200으로 설정 (200 : OK, 요청 처리 성공)
    res.setHeader("content-type", "text/plain"); // 헤더 설정
    // HTTP는 요청/응답에 대한 부가 정보를 설정할 수 있습니다. 부가 정보는 header에 설정하게 되는데, 여기서는 콘텐츠 타입을 'text/plain'으로 설정했습니다.
    // content-type은 해당 콘텐츠가 어떤 형태의 데이터인지를 나타냅니다. 
    // text-plain은 '텍스트를 평문으로 해석하겠다'라는 뜻입니다.
    res.write("hello\n"); // 응답값 설정
    setTimeout(() => { // setTimeout()은 콜백함수와 숫자를 인수로 받습니다. 숫자는 밀리초이며 해당시간이 지나면 콜백함수를 실행합니다.
        res.end("Node.js"); // 2초 후 Node.js 출력
    }, 2000);
});

function log(count) {
    console.log((count += 1));
}

server.listen(8000); // 8000번 포트로 서버 실행
// 사용할 포트 번호를 8000번으로 지정합니다. 또한 IP가 생략되었으므로 기본값이 localhost 혹은 127.0.0.1로 서버에 접근할 수 있습니다.

// curl은 HTTP 프로토콜로 된 API를 확인 할 때 가장 많이 사용하는 명령행 기반 프로그램입니다.
// in Terminal : curl localhost:8000

// 서버 실행 fn + F5

