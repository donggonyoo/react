import {useState , useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"

export default function Join(){
    const navigate = useNavigate();
    const[id,setId] = useState("");
    const[gname,setGname] = useState("");
    const[pass,setPass] = useState("");
    const[pass2,setPass2] = useState("");
    const[gender,setGender] = useState("");
    useEffect(()=>{setGender(1)},[gender])
    const[email,setEmail] = useState("");
    const[tel,setTel] = useState("");
    const[picture,setPictrue] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        alert("submit")
        try{
            const form = new FormData(); 
            console.log(id,gname,tel,gender)
            form.append("id",id);
            form.append("name",gname);
            form.append("tel",tel);
            form.append("gender",gender);
            form.append("email",email);
            form.append("pass",pass)
            form.append("picture",picture);
            fetch('http://localhost:8080/member/joinPro',{
                method:'POST',
                body:form,
                headers:{
                    Accept : 'application/json , text/plain, */*'
                }
            })
            navigate("/member/login");
        }
        catch(e){
            alert("서버전송오류")
            console.log(e)
        }
    }
    return(
        <div className="container">
            <div className="input-form-background row">
                <div className="input-form col-md-12 mx-auto">
                    <h4 className="mb-3">회원가입</h4>
                    <form className="validation-form" noValidate onSubmit={handleSubmit} method="post" name='f'>
                        <input type="hidden" name="picture"/>
                        <div className="row">
                            <div className="col-md-3 mb-3">
                                <label for="id">사진</label>
                                <img src="" width="100px" height="150px" onChange={(e)=>{setPictrue(e.target.value)}} value={picture} id="pic" />
                                <a className="btn btn-primary btn-block" href="javascript:win_upload()">사진업로드</a>
                            </div>
                            <div className="cols-md-9 mb-3">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label>아이디</label>
                                        <input type="text" className="form-control"
                                        onChange={(e)=>{setId(e.target.value);}} name="id" value={id}/>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label for="name">이름</label>
                                        <input type="text" className="form-control" id="name"
                                        onChange={(e)=>{setGname(e.target.value);}} name="gname" value={gname}/>
                                        <div className="invalid-feedback">이름 입력해주세요</div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label for="pass">비밀번호</label>
                                        <input type="password" className="form-control" placeholder="비밀번호"
                                        onChange={(e)=>{setPass(e.target.value);}} id="pass" name="pass" value={pass} required/> 
                                        <div className="invalid-feedback">비밀번호 입력해주세요</div>                                       
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label for="pass2">비밀번호 재입력</label>
                                        <input type="password" className="form-control" placeholder="비밀번호재입력"
                                        onChange={(e)=>{setPass2(e.target.value);}} id="pass2" name="pass2" value={pass2} required/>   
                                        <div className="invalid-feedback">비밀번호 재입력을 해주세요</div>                                     
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label for="gender">남자</label><input type="radio" onChange={(e)=>{setGender(1)}} checked name="gender" required/>
                                            
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label for="gender">여자</label><input type="radio" onChange={(e)=>{setGender(2)}} checked name="gender" required/>                                            
                                        </div>   
                                        <div className="mb-3">
                                        <label for="email">이메일</label>
                                        <input type="email" className="form-control" placeholder="ddd@mmm.com"
                                        onChange={(e)=>{setEmail(e.target.value);}} id="email" name="email" value={email} required/>  
                                        <div className="invalid-feedback">이메일을 입력 해주세요</div>                                      
                                    </div>

                                    <div className="mb-3">
                                        <label for="tel">전화번호</label>
                                        <input type="text" className="form-control" placeholder="전화번호"
                                        onChange={(e)=>{setTel(e.target.value);}} id="tel" name="tel" value={tel} required/>  
                                        <div className="invalid-feedback">전화번호를 입력 해주세요</div>                                      
                                    </div>                                      
                                    </div>                                                               
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary btn-lg btn-block" type="submit">가입완료</button>
                    </form>
                </div>
            </div>
        </div>
    )


}