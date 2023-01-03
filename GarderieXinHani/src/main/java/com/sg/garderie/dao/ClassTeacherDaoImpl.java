package com.sg.garderie.dao;

import com.sg.garderie.model.ClassFood;
import com.sg.garderie.model.ClassTeacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.stream.IntStream;

@Repository
public class ClassTeacherDaoImpl implements ClassTeachersDao{

    @Autowired
    JdbcTemplate jdbc;

    @Override
    @Transactional
     public void addClassTeachers(int classId, int[] ids) {
        final String INSERT_CLASS = "INSERT INTO ClassTeacher(classId, teacherId) "
                + "VALUES(?,?)";
        int length = ids.length;
        IntStream.range(0, length)
                .forEach(index -> jdbc.update(INSERT_CLASS,
                        classId, ids[index]));

    }

       @Override
    public List<ClassTeacher> getClassTeachersByClassId(int classId) {
           try {
               final String SELECT_CLASS_BY_ID = "SELECT * FROM ClassTeacher WHERE classId = ?";
               return jdbc.query(SELECT_CLASS_BY_ID, new ClassTeachersMapper(), classId);
           } catch (DataAccessException ex) {
               return null;
           }    }

    @Override
    public List<ClassTeacher> getAllClassesTeachers() {
        try {
            final String SELECT_CLASS_Teachers_BY_ID = "SELECT * FROM ClassTeacher ";
            return jdbc.query(SELECT_CLASS_Teachers_BY_ID, new ClassTeachersMapper());
        } catch (DataAccessException ex) {
            return null;
        }    }

    @Override
    public void deleteClassTeachersByClassId(int classId) {
        final String DELETE_CLASS_Teachers = "DELETE FROM ClassTeacher "
                + " WHERE classId=?";
        jdbc.update(DELETE_CLASS_Teachers, classId);

    }


    public static final class ClassTeachersMapper implements RowMapper<ClassTeacher> {
        @Override
        public ClassTeacher mapRow(ResultSet rs, int index) throws SQLException {
            ClassTeacher classTeacher = new ClassTeacher();
            classTeacher.setClassId(rs.getInt("classId"));
            classTeacher.setTeacherId(rs.getInt("foodId"));

            return classTeacher;
        }
    }

}
