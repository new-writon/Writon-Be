class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;  // 운영적 에러 여부

  // stack은 일반적으로 오류가 발생한 위치와 관련된 호출 스택(Call Stack) 정보를 나타내는 속성입니다. 
  /* Error: 예시 에러 발생
    at 함수1 (/path/to/file.js:10:15)
    at 함수2 (/path/to/file.js:20:5)
    at /path/to/file.js:30:7
    */

    // 운영적 에러는 운영자가 예상한 에러를 뜻함.. 예외 처리
  constructor(statusCode: number, message: string | undefined, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
