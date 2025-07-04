package kr.gdu.boot_react.service;

import kr.gdu.boot_react.dto.LoginDto;
import kr.gdu.boot_react.dto.MemberDto;
import kr.gdu.boot_react.entity.MemberEntity;
import kr.gdu.boot_react.mapper.MemberMapper;
import kr.gdu.boot_react.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberMapper mapper;
    private final MemberRepository repository;

    public void memberInsert(MemberDto memberDto) {
        MemberEntity entity = mapper.toEntity(memberDto);
        repository.save(entity);
    }

    public MemberDto loginCheck(String id) {
        MemberEntity mem = repository.findById(id).orElse(null);
        MemberDto memDto = mapper.toDto(mem);
        return memDto;
    }
}
