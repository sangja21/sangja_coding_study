/*
3.5 라우터 리팩터링하기

 현재는 분기문에서 모든 요청을 분석합니다. 아직은 함수가 총 3개뿐입니다.
 만약 이런 함수가 100개가 넘어간다면, 유지보수하기가 매우 힘들겁니다.
 함수를 하나 추가할 때마다 분기문에서 실수하지 않도록 조치를 해야 합니다.
 유지보수성을 높이는 관점에서 라우터를 살짝만 리팩터링 하겠습니다.

  분기문에서 사용되는 매개변수가 같은 패턴을 보일 때는 맵 자료구조가 유용합니다.
  우리가 만든 라우팅 규칙도 분기문에 들어가는 매개변수라 같은 패턴을 보입니다.
  그러므로 맵을 사용해서 분기문을 조금 더 깔끔하게 할 수 있습니다.

*/

// 01 라우팅 관련 코드를 다음과 같이 맵을 사용해 리팩터링 해봅시다.

const http = require("http");
const url = require("url")

http
 .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname; 
    res.setHeader("Content-Type", "text/html");

/*
    if (path === "/user") {
        user(req, res); // user() 함수 실행
    } else if (path === "/feed") {
        feed(req, res); // feed() 함수 실행
    } else {
        notFound(req, res) // notfound() 함수 실행
    }
*/

    // refactoring
    if (path in urlMap){ // urlMap에 path가 있는지 확인
        // 객체와 함께 in 연산자를 사용하면 객체의 키가 있는지 검사합니다.
        // 예를 들어 {"a":1, "b":2, "c":3} 이라는 abc 객체를 대상으로 "a" in abc를 하면 true가 됩니다.
        // 자바스크립트의 in 연산자와 맵을 사용해 아주 간단하게 URL 라우팅을 할 수 있게 되었습니다.

        urlMap[path](req, res); // urlMap path값으로 매핑된 함수 실행
        // urlMap[키]를 넣으면 키에 해당하는 값을 반환합니다. 키로 path를 넣으면 값인 함수가 반환됩니다.
        // urlMap['user']을 입력하면 user가 반환되므로 결국 코드는 user(req, res);가 됩니다.

    } else {
        notFound(req, res);
    }
 })     
    .listen("3000", () => console.log("라우터를 만들어보자!!"));


const user = (req, res) => {
    const userInfo = url.parse(req.url, true).query;
    res.end(`[user] name : ${userInfo.name}, age: ${userInfo.age}`);
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

// 라우터 규칙 매칭 키로 path가 들어가고 값에 함수를 항당
const urlMap = {
    "/" : (req, res) => res.end("HOME"),
    "/user": user,
    "/feed": feed,
};

/*
const urlMap : 자바스크립트에서는 객체라고 부르기도 합니다만, 키와 값이 같이 있는 객체이므로 맵으로 이름 지었습니다.
자바스크립트에서는 함수가 일급 객체(firtst class object)입니다. 
일급 객체는 값으로 할당이 가능하고 함수의 결과로 반환받을 수도 있습니다. 

* 코드의 가장 하단에 urlMap을 추가한 이유는 user()와 feed() 함수보다 위에 있으면 에러가 나기 때문입니다.
const로 선언한 변수들은 초기화 전에 읽을 수는 없어서 에러가 나게 됩니다.

Hoisting은 이름에서 유추할 수 있듯 함수, 클래스, 변수를 끌어올려서 선언되기 전에 사용하도록 하는 기능입니다.
즉, 어디서 선언이 되든지 참조할 수 있습니다.

* 반면, let, const, 함수 표현식, 클래스 표현식은 호이스팅 되지 않습니다. 선언이 되고난 후에 참조 할 수 있습니다.

*/

/*
라우팅에 사용하는 함수가 많아지게 되고, 각 함수에 공통 기능을 적용하고 싶을 때는 어떻게 하면 좋을까요?
익스프레스는 미들웨어라는 개념이 있어서 요청에 대한 전후 처리를 할 수 있습니다.
*/
