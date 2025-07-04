package kr.gdu.boot_react.mapper;


import kr.gdu.boot_react.dto.BoardDto;
import kr.gdu.boot_react.entity.BoardEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BoardMapper {
    BoardEntity toEntity(BoardDto boardDto);

    BoardDto toDto(BoardEntity boardEntity);
}
