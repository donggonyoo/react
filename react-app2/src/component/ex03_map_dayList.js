
import data from "../db/data.json"

export default function DayList(){
    return(
        <>
   
            <h2>day 리스트</h2>
            <ul className="list_day">
            {data.days.map((m)=>(            
                    <li>Day{m.day}</li>    
                 
            ))}
           </ul>
        </>
    )
}