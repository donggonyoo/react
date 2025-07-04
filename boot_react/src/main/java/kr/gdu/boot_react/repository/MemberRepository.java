package kr.gdu.boot_react.repository;

import kr.gdu.boot_react.entity.BoardEntity;
import kr.gdu.boot_react.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, String> {

}
