import {useState} from "react";

// 1.props변수에 age값을 가져옴
// 2. props는 상수(값 변경 불가능)
//3.변경하고싶다면 useState사용해야함
//4.{age} : props의 age값만 저장
export default function Hello({age}){
    //props.age=11 불가능
    const [name,setName]= useState('MIKE');
    const[newAge,setAge] = useState(age);
    

    const msg = newAge>=40?setAge(0):(newAge>=18?"성인":"미자");

    
    return(
        <div style={{color:"purple"}}>
            <h2>{name}:{newAge}살({msg}) </h2>
            <button onClick={()=>{
                setName(name==="MIKE"?"TOM":"MIKE")
                setAge(newAge + 1);
            
                
            }}>이름/나이변경</button>
        </div>
    );
}