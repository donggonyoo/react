import data from "../db/data.json"
import {useParams} from "react-router-dom" //라우터에서 제공되는 parameter를 가져옴
export default function Day(){
    const {day} = useParams();
   
    //(word.day(json객체의 키 값)===day(변수값)
    //useParams() : 문자열
    //word.day : 숫자
    const wordlist = data.words.filter(word=>(word.day===Number(day)))
    return(
<>
<h2>Day{day}</h2>
<table>
<tbody>
    {/*"words": [
    {
      "id": 1,
      "day": 1,
      "eng": "book",
      "kor": "책",
      "isDone": false
    },{....}] */}
    {/*data.words(배열)를 순회해 각 요소에 id,eng,kor만 뽑아서 하나의행으로*/}

    {wordlist.map(word=>(
        <tr>
            <td>{word.eng}</td>
            <td>{word.kor}</td>
        </tr>
    ))}
</tbody>
</table>
</>
    );
    
}