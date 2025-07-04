package kr.gdu.boot_react.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class MemberEntity {

    @Id
    private String id;

    private String pass;
    private String name;
    private int gender;
    private String tel;
    private String email;
    private String picture;

}
