package kr.gdu.boot_react.service;

import jakarta.activation.DataContentHandler;
import kr.gdu.boot_react.dto.BoardDto;
import kr.gdu.boot_react.entity.BoardEntity;
import kr.gdu.boot_react.mapper.BoardMapper;
import kr.gdu.boot_react.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.DoubleSummaryStatistics;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardMapper boardMapper;

    public int boardCount(String boardid) {
        Specification<BoardEntity> spec = (root,query,cri)->
            cri.equal(root.get("boardid"),boardid);
        //where boardid = :boardid
        return (int)boardRepository.count(spec);
    }


    public Page<BoardEntity> boardList(Integer pageInt, int limit, String boardid) {
        Specification<BoardEntity> spec = (root,query,cri)->
                cri.equal(root.get("boardid"),boardid);
        Pageable pageable = PageRequest.of(pageInt-1 , limit, Sort.by(Sort.Order.desc("num")));
        return boardRepository.findAll(spec,pageable);
    }

    public BoardEntity insert(BoardEntity entity) {
        BoardEntity save = boardRepository.save(entity);
        return save;
    }

    public BoardDto findByNum(int num) {
        Optional<BoardEntity> byId = boardRepository.findById(num);
        BoardEntity boardEntity = byId.orElseGet(null);
        BoardDto dto = boardMapper.toDto(boardEntity);
        return dto;
    }

    public void addReadCnt(int num) {
        boardRepository.addReadcnt(num);
    }

    public BoardEntity boardUpdate(BoardEntity entity) {
        return boardRepository.save(entity);
    }
}
