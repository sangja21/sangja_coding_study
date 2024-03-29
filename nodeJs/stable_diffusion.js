const axios = require("axios");
const fs = require("fs");
const path = require("path");
const env = require("dotenv").config();

// const webuiServerUrl = "http://127.0.0.1:7860"; // localhost 서버주소
const webuiServerUrl = "http://192.168.0.51:7860"; // 내 옆자리 윈도우PC와 연결
const outDir = "api_out";
const outDirT2i = path.join(outDir, "txt2img");
const outDirI2i = path.join(outDir, "img2img");

const mysql = require("mysql");

// 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: process.env.HOST, // 데이터베이스 호스트
  user: process.env.USER0, // 데이터베이스 사용자 이름
  password: process.env.PASSWORD, // 데이터베이스 비밀번호
  database: process.env.DATABASE, // 사용할 데이터베이스 이름
});

// 데이터베이스 연결
db.connect((err) => {
  if (err) {
    console.error("데이터베이스 연결 실패:", err);
    return;
  }
  console.log("데이터베이스에 연결됨");
});

// 디렉터리 생성
if (!fs.existsSync(outDirT2i)) fs.mkdirSync(outDirT2i, { recursive: true });
if (!fs.existsSync(outDirI2i)) fs.mkdirSync(outDirI2i, { recursive: true });

function saveImagePathToDB(prompt, img_path) {
  const query = "INSERT INTO txt2img_path(prompt, img_path) VALUES (?, ?)";
  db.query(query, [prompt, img_path], (err, result) => {
    if (err) {
      console.error("데이터베이스 저장 중 오류 발생:", err);
      return;
    }
    console.log("이미지 경로 저장됨:", img_path);
  });
}

function timestamp() {
  return new Date()
    .toISOString()
    .replace(/[-:.T]/g, "")
    .slice(0, 15);
}

function encodeFileToBase64(filePath) {
  return fs.readFileSync(filePath, "base64");
}

function decodeAndSaveBase64(base64Str, savePath) {
  fs.writeFileSync(savePath, base64Str, "base64");
}

async function callApi(apiEndpoint, payload) {
  try {
    const response = await axios.post(
      `${webuiServerUrl}/${apiEndpoint}`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
}

async function callTxt2ImgApi(payload) {
  const response = await callApi("sdapi/v1/txt2img", payload);
  if (response && response.images) {
    response.images.forEach((image, index) => {
      const savePath = path.join(
        outDirT2i,
        `txt2img-${timestamp()}-${index}.png`
      );
      decodeAndSaveBase64(image, savePath);
      const prompt = payload.prompt;
      console.log("-------------------------------------------------------");
      console.log(prompt);
      console.log(savePath);
      console.log("-------------------------------------------------------");
      saveImagePathToDB(prompt, savePath);
    });
  }
}

async function callImg2ImgApi(payload) {
  const response = await callApi("sdapi/v1/img2img", payload);
  if (response && response.images) {
    response.images.forEach((image, index) => {
      const savePath = path.join(
        outDirI2i,
        `img2img-${timestamp()}-${index}.png`
      );
      decodeAndSaveBase64(image, savePath);
    });
  }
}

async function getRandomInt() {
  const max = 2147483647;
  return Math.floor(Math.random() * max);
}

async function main() {
  const txt2ImgPayload = {
    prompt: `Cinematic film still of neo the one, matrix movie, monocolor background, cinematic dramatic atmosphere, sharp focus, volumetric lighting, cinematic lighting, studio quality, professional color grading, very detailed face, masterpiece, best quality, highest quality:1.3, epic detailed scenery, vibrant colors, (high resolution:1.3), (sharp focus:1.3), high detailed face, intricate details, 
    magazine cover, movie poster, wallpaper, natural lighting, perfect contrast, professional cinematic shot, 4k, perfect ambient lighting, vivid colors, intricate details, shallow depth of field, extreme cinematic photorealism:1.3,perfect cinematic atmospheric lighting, perfect realistic cinematic reflections, photographed on a Canon EOS R5, 50mm lens, F/2.8, HDR, 8k resolution, cinematic lens flares, extreme photorealism:1.3, dslr, <lora:koreanDollLikeness:1>`, // extra networks also in prompts
    negative_prompt: `anime, cgi, painting, cartoon, painting, illustration, (worst quality, low quality, normal quality:1.8), (grayscale:1.4), midget, bad proportions, big head`,
    seed: 111111,
    steps: 20,
    width: 512,
    height: 512,
    cfg_scale: 7,
    sampler_name: "DPM++ 2M Karras",
    n_iter: 1,
    batch_size: 1,
  };

  await callTxt2ImgApi(txt2ImgPayload);

  /*
   const initImages = [encodeFileToBase64("/path/to/your/image.png")];
   const img2ImgPayload = {
    // 여기에 img2img API를 위한 페이로드를 넣으세요.
    initImages: initImages,
    // 나머지 페이로드 요소들...
  };
  await callImg2ImgApi(img2ImgPayload);
  */
  db.end((err) => {
    if (err) {
      console.error("데이터베이스 연결 종료 중 오류 발생:", err);
    } else {
      console.log("데이터베이스 연결 종료됨");
    }
  });
}

main();
