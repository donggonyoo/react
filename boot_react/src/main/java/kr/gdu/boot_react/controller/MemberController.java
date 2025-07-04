package kr.gdu.boot_react.controller;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import kr.gdu.boot_react.dto.LoginDto;
import kr.gdu.boot_react.dto.MemberDto;
import kr.gdu.boot_react.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/member")
@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService service;


    @PostMapping("joinPro")
    public void joinPro(MemberDto memberDto) {
        service.memberInsert(memberDto);
    }

   /* @PostMapping("logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("id", null);
        cookie.setMaxAge(0); // 쿠키 만료
        cookie.setPath("/");
        response.addCookie(cookie);
        return ResponseEntity.ok().build();
    }*/

    @PostMapping("loginPro")
    public ResponseEntity loginPro(LoginDto dto, HttpServletResponse response,
                                        @CookieValue(value="id",required = false)Cookie cookie) {
        if(cookie == null) {
            cookie = new Cookie("id", "");
            response.addCookie(cookie);
        }
        MemberDto mem = service.loginCheck(dto.getId()); //id를 이용해 값 꺼내와
        System.out.println("PostLoginPro의 DTO : "+mem);

        if(mem != null) {
            if(mem.getPass().equals(dto.getPass())) {
                cookie.setValue(dto.getId());
                cookie.setDomain("localhost");
                cookie.setPath("/");
                cookie.setMaxAge(30); //쿠키허용시간30초
                cookie.setSecure(true);
                response.addCookie(cookie); //응답객체에 쿠키를 저장
                System.out.println("cookie : "+cookie);
                return new ResponseEntity("{\"message\":\"login_success\",\"token\":\"1\"}", HttpStatus.OK);
            }
            else{
                return new ResponseEntity("{\"message\":\"비밀번호오류\",\"token\":\"0\"}", HttpStatus.UNAUTHORIZED);
            }
        }
        else{
            return new ResponseEntity("{\"message\":\"아이디없음\",\"token\":\"0\"}", HttpStatus.UNAUTHORIZED);
        }
       
        


    }
}
