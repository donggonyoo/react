
import data from "../db/data.json"
import {Link} from "react-router-dom"
/*
<li key={m.id}></li>
리액트에서 리스트항목 출력 시 고유한값 필요
변경된 부분의 판단을 위해 key속성 사용
*/
export default function DayList(){
    return(
        <>
            <h2>day 리스트</h2>
            <ul className="list_day">
            {data.days.map((m)=>(            
                <li key={m.id}>
                    <Link to={`/day/${m.day}`}>Day{m.day} </Link>
                </li>
                    
            ))}
           </ul>
        </>
    )
}