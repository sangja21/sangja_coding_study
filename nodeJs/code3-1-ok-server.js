// 모든 요청에 "OK"를 반환하는 서버를 Node.js로 만들어 봅시다. 이 후 만든 서버를 기반으로 여러 요청을 받을 수 있도록 라우터 기능을 추가, 확장해 가겠습니다.

const http = require("http");
const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html"); // 응답의 헤더 설정
    // 응답의 헤더 값을 설정합니다. text/html은 텍스트를 html로 해석하겠다는 의미입니다.

    res.end("OK"); // OK를 응답하고 종료
});

server.listen("3000", () => console.log("OK 서버 시작!")); // 접속대기
// createServer()로 서버 인스턴스를 생성하고, 그 뒤에 listen() 함수를 붙여서 실행
// 3000은 포트번호이고, 그 뒤에 있는 함수는 서버가 시작될 때 실행하는 콜백함수
