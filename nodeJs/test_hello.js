// hello.js를 테스트 하는 코드 : k6 test Script

import http from "k6/http";

export const options = { // 테스트 옵션
    vus: 100, // virtual users(가상 유저)를 설정하는 항목
    duration: "10s", // 몇초동안 테스트를 진행할지를 선택하는 옵션
}; // 얘제 코드는 유저 100명이 10초동안 계속 요청을 보내는 설정

export default function () { // 테스트에 사용할 함수 지정 : 성능 테스트 시 싱행되는 함수
    http.get("http://localhost:8000"); // http get 메서드를 사용해서 http://localhost:8000에 요청을 보낸다는 의미
}

// 위의 코드를 실행하면 가상 유저 100명이 10초 동안 http://localhost:8000에 동시에 계속해서 요청을 보낸다는 의미

// hello.js에서는 요청 하나당 2초 딜레이가 있습니다. 즉 요청 하나가 완료되는 데 2초가 걸립니다.
// 스레드가 하나이므로 동기식 코드라면 200초가 걸려야 합니다.
// 하지만 setTimeout은 이벤트 루프를 통해 비동기 처리됩니다. 2초 동안 요청을 100개를 동시에 처리할 수도 있는 겁니다.

// node hello.js 명령으로 서버를 실행한 후 -> k6 실행
// terminal : k6 run test_hello.js


/*
➜  sangja_coding_study git:(main) ✗ k6 run test_hello.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

WARN[0000] The moduleSpecifier "test_hello.js" has no scheme but we will try to resolve it as remote module. This will be deprecated in the future and all remote modules will need to explicitly use "https" as scheme.
ERRO[0000] The moduleSpecifier "test_

`k6`는 성능 테스트를 위한 도구입니다. `k6 run` 명령어를 사용하면 k6 스크립트를 실행하여 성능 테스트를 진행할 수 있습니다.

당신이 받은 오류 메시지를 해석하면 다음과 같습니다:

1. **WARN[0000] The moduleSpecifier "test_hello.js" has no scheme ...**
    - 경고: "test_hello.js"에 스키마가 없기 때문에 원격 모듈로 해석을 시도할 것입니다. 미래에는 이 방식이 사용되지 않을 예정이므로 모든 원격 모듈에는 명확하게 "https" 스키마가 필요합니다.
    
2. **ERRO[0000] The moduleSpecifier "test_hello.js" couldn't be found on local disk. ...**
    - 오류: "test_hello.js"를 로컬 디스크에서 찾을 수 없습니다. 파일 경로가 올바른지 확인하세요. 만약 Docker 이미지를 사용하여 k6를 실행하고 있다면 스크립트와 모듈이 들어있는 로컬 디렉토리를 마운트했는지 확인하세요. 또한 "https://"를 앞에 붙여 원격 모듈로 로드하려고 했지만, 이것도 작동하지 않았습니다.

해결 방법:

- **로컬 파일의 경로 확인**: `test_hello.js` 파일이 현재 디렉토리에 있는지 확인하세요.
- **Docker 사용 시**: 만약 `k6`를 Docker로 실행 중이라면, 스크립트가 있는 로컬 디렉토리를 Docker 컨테이너 안으로 마운트해야 합니다. 이것은 오류 메시지에 나와 있는 `-v /local/path/:/inside/docker/path` 옵션을 사용하여 할 수 있습니다.
- **원격 모듈 사용 시**: 원격 모듈을 사용하려면, 해당 모듈의 URL을 명확하게 지정해야 합니다. 그러나 대부분의 경우 로컬 파일의 경로 문제일 가능성이 높습니다.

위의 점검 사항을 확인하면서 문제를 해결해보세요.

*/


/*
➜  nodeJs git:(main) ✗ k6 run test_hello.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: test_hello.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 40s max duration (incl. graceful stop):
  // 가상 유저 100명으로 최대 40초 동안 테스트하는 시나리오
  // 실제 테스트시간은 10초인데 gracefulStop의 기본값 30초를 더해서 40초가 됨.
  // gracefulStop 옵션은 가상 유저를 테스트 중에 변경하는 시나리오에서 갑자기 유저를 변경하면 데이터가 급변하는 현상이 생기게 되므로
  // 최소 30초 동안은 기존 유저값이 유지된다는 의미

  // 예제에서는 유저 수를 동적으로 조절하지 않으므로 큰 의미가 없습니다.
  // 즉, 실제 테스트 시간인 10초동안만 실행됩니다.


           * default: 100 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 93 kB 9.1 kB/s
     data_sent......................: 40 kB 3.9 kB/s
     http_req_blocked...............: avg=537.47µs min=0s     med=1µs     max=4.48ms  p(90)=2.56ms  p(95)=2.74ms
     http_req_connecting............: avg=455.35µs min=0s     med=0s      max=2.83ms  p(90)=2.54ms  p(95)=2.7ms
     http_req_duration..............: avg=2.02s    min=2s     med=2.02s   max=2.06s   p(90)=2.05s   p(95)=2.06s
    // http 요청 기간에 대한 결과 : 평균 2.02s, p(90)=2.05s 90%의 요청이 2.08초 이하라는 의미

       { expected_response:true }...: avg=2.02s    min=2s     med=2.02s   max=2.06s   p(90)=2.05s   p(95)=2.06s
     http_req_failed................: 0.00% ✓ 0         ✗ 500
    // http 요청이 얼마나 실패했는지를 보여줌 : 0%

     http_req_receiving.............: avg=2.01s    min=1.99s  med=2s      max=2.02s   p(90)=2.02s   p(95)=2.02s
     http_req_sending...............: avg=7.72µs   min=2µs    med=6µs     max=101µs   p(90)=13µs    p(95)=16.04µs
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s      max=0s      p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=15.11ms  min=1.84ms med=11.14ms max=39.66ms p(90)=33.49ms p(95)=36.74ms
     http_reqs......................: 500   49.253965/s
    // http 요청이 500번 발생했다는 뜻, 100명의 유저가 10초동안 2초 간격으로 요청을 보냈으므로 500회

     iteration_duration.............: avg=2.02s    min=2s     med=2.02s   max=2.07s   p(90)=2.06s   p(95)=2.06s
    // http 요청이 한 번 완료되고 다시 시작될 때까지 걸리는 시간에 대한 데이터. 평균 2.02초

     iterations.....................: 500   49.253965/s
     vus............................: 100   min=100     max=100
     vus_max........................: 100   min=100     max=100


running (10.2s), 000/100 VUs, 500 complete and 0 interrupted iterations
default ✓ [======================================] 100 VUs  10s


*** 위 내용을 종합하면 대략 2초 걸리는 요청 100개릂 거의 동시에 처리했다는 것을 알 수 있습니다.




*/

