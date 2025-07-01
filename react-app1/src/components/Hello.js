/* eslint-disable no-unreachable */
import World from "./World"; //하위의 World Component
import styles from "./Hello.module.css";//Hello.module.css컴포넌트를 가져와
const Hello = function(){
    return(
    <>
     <p className={styles.box}>Hello</p>{/* Hello.module.css */}
     <p className="box">Hello</p>{/* index.css */}
    <World/>
    </>
    );
}
export default Hello; 
/*Hello 컴포넌트를 기본 내보내기로 설정합니다.
다른 파일에서 import Hello from './Hello'로 가져와 사용할 수 있습니다. */