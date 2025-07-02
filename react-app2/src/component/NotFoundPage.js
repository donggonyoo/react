
import {Link} from "react-router-dom"
/*
a태그 : 외부링크이동 (HTML기본) 
 - 브라우저 전체페이지를 새로고침

Link태그 : React router전용태그
 - 화면에 새로고침 X
*/
export default function NotFoundPage(){
    return(
        <>
         <h2>없는페이지임</h2>
        <Link to="/">돌아가기</Link>
        </>
    );
}