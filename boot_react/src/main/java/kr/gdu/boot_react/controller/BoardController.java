package kr.gdu.boot_react.controller;

import ch.qos.logback.core.util.StringUtil;
import jakarta.servlet.http.HttpServletRequest;
import kr.gdu.boot_react.dto.BoardDto;
import kr.gdu.boot_react.entity.BoardEntity;
import kr.gdu.boot_react.mapper.BoardMapper;
import kr.gdu.boot_react.repository.BoardRepository;
import kr.gdu.boot_react.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/board")
//react(front-end)가 존재하는 서버(3000)를 입력해줌
//allowCredentials : 인증의 요청도 허용
@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
@RequiredArgsConstructor
public class BoardController {

    @Value("${img.upload}")
    String PATH;

private final BoardService boardService;
private final BoardMapper boardMapper;

    @GetMapping("boardList")
    public Map<String,Object> boardList(@RequestParam Map<String,String> param) {
        System.out.println("param :  " +param);
        Integer pageInt = null;
        for(String key : param.keySet()){
            if(StringUtil.isNullOrEmpty(key)){
                param.put(key, null);
            }
        }
        if(param.get("pageNum") != null){
            pageInt = Integer.parseInt(param.get("pageNum"));
        }
        else{
            pageInt = 1;
        }
        String boardid = param.get("boardid");
        System.out.println("boardid : "+boardid);
        if(boardid == null){
            boardid = "1";
        }
        String boardName = null;
        switch (boardid) {
            case "1"->boardName = "공지사항";
            case "2"->boardName = "자유게시판";
            case "3"->boardName = "Q&A";
        }
        int limit = 10;
        int boardCount =boardService.boardCount(boardid); //전체게시물건수
        List<BoardEntity> bList = boardService.boardList(pageInt,limit,boardid).getContent();
        int bottomLine = 10; //한페이지의 페이지번호 갯수
        int start = (pageInt - 1) /bottomLine * bottomLine+1;
        int end  = start+bottomLine - 1;
        int maxpage = (boardCount / bottomLine) + (boardCount % bottomLine == 0 ? 0 : 1);
        if(end > maxpage){
            end = maxpage;
        }
        return Map.of(
                "boardid",boardid,
                "boardName",boardName,
                "pageInt",pageInt,
                "maxPage",maxpage,
                "start",start,
                "end",end,
                "boardCount",boardCount,
                "bList",bList,
                "bottomLine",bottomLine
        );
    }

    @PostMapping("boardPro")
    public BoardEntity boardPro(@RequestParam(value = "file2",required = false)MultipartFile multipartFile,
                         BoardDto boardDto , HttpServletRequest request) {
        //String path = request.getServletContext().getRealPath("/")+"img/board";
        String path=PATH+"/img/board";
        File dir = new File(path);
        if(!dir.exists()){
          dir.mkdirs();
        }
        String fileName = "";
        if(multipartFile != null && !multipartFile.isEmpty()){
            File file = new File(path, multipartFile.getOriginalFilename());
            fileName = multipartFile.getOriginalFilename();
            try{
                multipartFile.transferTo(file);
            }
            catch (Exception e){
                e.printStackTrace();
            }
        }
        boardDto.setBoardid(boardDto.getBoardid());
        boardDto.setFile1(fileName);
        BoardEntity entity = boardMapper.toEntity(boardDto);
        BoardEntity num = boardService.insert(entity);
        return num;
    }
    @GetMapping("boardInfo")
    public Map<String,Object> boardInfo(@RequestParam Map<String,String> param) {
        String pm = param.get("num");
        int num = Integer.parseInt(pm);
        BoardDto dto = boardService.findByNum(num);
        boardService.addReadCnt(num);
        String boardName = "";
        switch (dto.getBoardid()) {
            case "1"->boardName = "공지사항";
            case "2"->boardName = "자유게시판";
            case "3"->boardName = "Q&A";
        }

        return Map.of("board",dto,
                        "boardName",boardName);
    }

    @GetMapping("boardUpdateForm")
    public Map<String,Object> boardUpdateForm(@RequestParam int num) {
        BoardDto dto = boardService.findByNum(num);
        System.out.println("GETboardUpdateForm : "+dto);
        String boardName = "";
        switch (dto.getBoardid()) {
            case "1"->boardName = "공지사항";
            case "2"->boardName = "자유게시판";
            case "3"->boardName = "Q&A";
        }

        return Map.of("board",dto,
                "boardName",boardName);
    }

    @PostMapping("boardUpdatePro")
    public Map<String,Object> boardUpdatePro(@RequestParam(value = "file2",required = false)MultipartFile multipartFile,
                                             BoardDto dto) {
        BoardDto dbBoard = boardService.findByNum(dto.getNum());
        System.out.println("dto"+dto);
        HashMap<String, Object> map = new HashMap<>();
        if(!dto.getPass().equalsIgnoreCase(dbBoard.getPass())){
            map.put("msg","pw오류");
            map.put("code",100);
            return map;
        }
        String path = PATH +"/img/board";
        File dir = new File(path);
        if(!dir.exists()){
            dir.mkdirs();
        }
        //입력값 정상,비번일치
        String fileName = "";
        if(multipartFile != null && !multipartFile.isEmpty()){
            File file = new File(path, multipartFile.getOriginalFilename());
            fileName = multipartFile.getOriginalFilename();
            try{
                multipartFile.transferTo(file);
            }
            catch (Exception e){
                e.printStackTrace();
            }
        }
        else{
            dto.setFile1(dbBoard.getFile1());
        }
        try{
            dto.setRegdate(dbBoard.getRegdate());
            BoardEntity entity = boardMapper.toEntity(dto);
            boardService.boardUpdate(entity);
            map.put("msg","게시글 수정");
            map.put("code",0);
        }
        catch(Exception e){
            map.put("msg","게시물 수정 실패");
            map.put("code",200);
            e.printStackTrace();
        }
        return map;
    }
}
