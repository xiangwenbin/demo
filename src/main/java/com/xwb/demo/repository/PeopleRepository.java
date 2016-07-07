package com.xwb.demo.repository;
/**
 * 基于spring data jpa 的orm持久层框架demo
 */
import org.springframework.data.jpa.repository.JpaRepository;

import com.xwb.demo.meta.People;

public interface PeopleRepository extends JpaRepository<People, Long>{

}
