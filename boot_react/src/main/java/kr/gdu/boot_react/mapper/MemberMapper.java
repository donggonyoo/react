package kr.gdu.boot_react.mapper;

import kr.gdu.boot_react.dto.MemberDto;
import kr.gdu.boot_react.entity.MemberEntity;
import org.mapstruct.Mapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Mapper(componentModel = "spring")
public interface MemberMapper  {
    MemberEntity toEntity(MemberDto member);

    MemberDto toDto(MemberEntity member);
}
