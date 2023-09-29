// 3-4. 동적으로 응답하기

// 앞에서 작성한(3-3) 서버는 브라우저에서 localhost:3000/user에 접속하면 언제나 같은 결과를 보여줍니다.
// user() 함수를 수정해서 매개변수에 따라 동적으로 응답이 변경되도록 해봅시다.
// 고정된 값이 아닌 url의 query 부분에 name과 age 정보를 추가하겠습니다.

const http = require("http");
const url = require("url")

http
 .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname; 
    res.setHeader("Content-Type", "text/html");

    if (path === "/user") {
        user(req, res); // user() 함수 실행
    } else if (path === "/feed") {
        feed(req, res); // feed() 함수 실행
    } else {
        notFound(req, res) // notfound() 함수 실행
    }
 })     
    .listen("3000", () => console.log("라우터를 만들어보자!!"));

    // 01. 먼저 user() 함수만 변경해봅시다.

    // user 요청에 query 정보 추가하기
const user = (req, res) => {
    const userInfo = url.parse(req.url, true).query;
    // 쿼리 스트링 데이터를 userInfo에 할당
    res.end(`[user] name : ${userInfo.name}, age: ${userInfo.age}`);
    // 결괏값으로 이름과 나이 설정
};
// url의 query 부분을 user라는 매개변수로 받습니다.
// 응답을 줄 때 user.name, user.age를 사용합니다.

// url : localhost:3000/user?name=sangja&age=30

/*

url.parse():

url 모듈의 parse() 함수는 주어진 URL 문자열을 URL 객체로 변환합니다. 이 객체에는 프로토콜, 호스트, 경로, 쿼리 문자열 등 URL의 여러 부분이 포함됩니다.
req.url:

req는 HTTP 요청 객체를 나타내며, Node.js의 HTTP 서버에서 클라이언트로부터의 요청 정보를 담고 있습니다.
req.url은 요청된 URL의 경로와 쿼리 문자열을 반환합니다. 예를 들어, http://example.com/user?id=123의 요청이 들어오면 req.url은 /user?id=123를 반환합니다.
true 인자:

url.parse() 함수의 두 번째 인자로 true를 전달하면 쿼리 문자열을 파싱하여 query 프로퍼티를 객체로 반환합니다. false나 인자가 없을 경우, 쿼리 문자열이 문자열로 반환됩니다.
.query:

이는 url.parse()의 결과로 반환된 객체에서 쿼리 문자열 파라미터를 객체 형태로 가져오기 위한 프로퍼티입니다. 예를 들어, 위의 URL 예시에서 userInfo는 { id: '123' }와 같은 객체를 반환합니다.
결과적으로, const userInfo = url.parse(req.url, true).query; 코드는 클라이언트의 요청 URL에서 쿼리 파라미터를 객체로 추출하여 userInfo에 할당합니다.
*/

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