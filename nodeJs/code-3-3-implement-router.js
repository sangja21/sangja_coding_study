// 현재는 요청에 대한 응답을 createServer() 안에서 직접 컨트롤 합니다.
// 이렇게 되면 createServer() 안의 콜백함수에 모든 코드를 다 추가해야 하므로 좋지 않습니다. 
// 라우팅 이후의 처리를 별도의 함수를 만들어서 처리하도록 코드를 리팩터링 해봅시다.

// refactoring : 동작 결과를 변경하지 않으면서 코드의 구조를 재조정하는 작업

const http = require("http");
const url = require("url")

http
 .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname; 
    res.setHeader("Content-Type", "text/html");

    if (path === "/user") {
        // res.end("[user] name : andy, age: 30");

        user(req, res); // user() 함수 실행
    } else if (path === "/feed") {
        /* res.end(`<ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
        </ul>
        `) */

        feed(req, res); // feed() 함수 실행
    } else {
        // res.statusCode = 404;
        // res.end('404 page not found');

        notFound(req, res) // notfound() 함수 실행
    }
 })     
    .listen("3000", () => console.log("라우터를 만들어보자!!"));

const user = (req, res) => {
    res.end(`[user] name : andy, age: 30`);
};

const feed = (req, res) => {
    res.end(`
    <ul>
    <li>picture1</li>
    <li>picture2</li>
    <li>picture3</li>
    </ul>
    `);
};

const notFound = (req, res) => {
    res.statusCode = 404;
    res.end("404 page not found");
};

// 이제 메인 루틴을 깔끔히 유지하면서도 요청별 함수만 요구사항에 알맞게 변경하면 되는 코드가 되었습니다.