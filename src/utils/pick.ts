
/**
 * 
 * @param obj  요청 객체
 * @param keys  코드로 명시된 객체
 * @returns 
 *  요청객체를 코드로 명시된 객체와 비교하여 일치하는 객체들을 모아서 반환
 */ 
const pick = (obj: object, keys: string[]) => {
    /*
        reduce 함수를 사용하여 keys 배열을 순회하면서 새로운 객체를 생성합니다. 
        reduce 함수는 배열의 각 요소에 대해 지정된 콜백 함수를 호출하고, 
        그 결과를 누적하는데 사용됩니다. finalObj는 최종적으로 반환될 객체를 나타냅니다.
    */
    return keys.reduce<{ [key: string]: unknown }>((finalObj, key) => {
      if (obj && Object.hasOwnProperty.call(obj, key)) {
        finalObj[key] = obj[key as keyof typeof obj];
      }
      return finalObj;
    }, {});
  };
  
  export default pick;
  