// 01 my First Express Server : localhost:3000으로 접근하면 "헬로 Express"를 반환하는 서버

const express = require("express"); // express 모듈 불러오기
const app = express(); // express를 초기화 후 app에 할당

const port = 3000;

app.get("/", (req, res) => { // "/"으로 요청이 오는 경우 실행됨
    // url의 path가 '/'이면서 http 메서드가 get()인 경우 콜백함수를 실행
    res.set({"Content-Type": "text/html; charset=utf-8" }); // 헤더값 설정
    // 반환할 콘텐츠의 정보를 설정합니다. 결과의 콘텐츠 타입은 html이며 결과에 한글이 있으므로 charSet을 utf-8로 변경했습니다.
    res.end("헬로 Express");
});

app.listen(port, () => { // 서버를 기동해 클라이언트 요청을 기다림
    console.log(`START SERVER : use ${port}`);
    // listen() 함수를 사용해 클라이언트의 요청을 기다립니다. 포트는 3000번을 사용했습니다.

    /*
    listen() 함수는 일반적으로 네트워크 프로그래밍, 
    특히 서버 어플리케이션에서 사용되며, 서버가 클라이언트로부터의 연결 요청을 수신하기 시작하도록 지시하는 데 사용됩니다.
    */

});
