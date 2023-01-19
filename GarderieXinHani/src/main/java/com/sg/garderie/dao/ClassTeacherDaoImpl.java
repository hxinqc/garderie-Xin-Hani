package com.sg.garderie.dao;

import com.sg.garderie.model.ClassTeacher;
import com.sg.garderie.model.Teacher;
import com.sg.garderie.model.TeacherClassId;
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
        deleteClassTeachersByClassId(classId);
        if (ids != null && ids.length > 0) {
            final String INSERT_CLASS = "INSERT INTO ClassTeacher(classId, teacherId) "
                    + "VALUES(?,?)";
            int length = ids.length;
            IntStream.range(0, length)
                    .forEach(index -> jdbc.update(INSERT_CLASS,
                            classId, ids[index]));
        }
    }

    @Override
    public List<Teacher> getClassTeachersByClassId(int classId) {
       try {
           final String SELECT_CLASS_BY_ID = "SELECT teacher.* FROM ClassTeacher JOIN teacher "
           + "ON ClassTeacher.teacherId = teacher.id WHERE classId = ?";

           return jdbc.query(SELECT_CLASS_BY_ID, new TeacherDaoImpl.TeacherMapper(), classId);
       } catch (DataAccessException ex) {
           return null;
       }
    }

    @Override
    public List<ClassTeacher> getAllClassesTeachers() {
        try {
            final String SELECT_CLASS_Teachers_BY_ID = "SELECT * FROM ClassTeacher ";
            return jdbc.query(SELECT_CLASS_Teachers_BY_ID, new ClassTeachersMapper());
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<ClassTeacher> getAllClassesTeachersByClassId(int classId) {
        try {
            final String SELECT_CLASS_Teachers_BY_ID = "SELECT * FROM ClassTeacher WHERE classId = ? ";
            return jdbc.query(SELECT_CLASS_Teachers_BY_ID, new ClassTeachersMapper(), classId);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<TeacherClassId> getAllClassesTeachersDisplay(int classId) {
        try {
            final String SELECT_CLASS_Teachers_BY_ID = "SELECT teacher.*, ClassTeacher.classId " +
                    "FROM teacher LEFT JOIN ClassTeacher ON teacher.id = ClassTeacher.teacherId " +
                    "WHERE ClassTeacher.classId = ? or ClassTeacher.classId is null; ";
            return jdbc.query(SELECT_CLASS_Teachers_BY_ID, new TeacherClassIdMapper(), classId);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<TeacherClassId> getTeachersForClass(int classId) {
        try {
            final String SELECT_CLASS_Teachers_BY_ID = "SELECT teacher.*, ClassTeacher.classId " +
                    "FROM teacher LEFT JOIN ClassTeacher ON teacher.id = ClassTeacher.teacherId " +
                    "WHERE ClassTeacher.classId = ? or ClassTeacher.classId is null; ";
            return jdbc.query(SELECT_CLASS_Teachers_BY_ID, new TeacherClassIdMapper(), classId);
        } catch (DataAccessException ex) {
            return null;
        }
    }

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
            classTeacher.setTeacherId(rs.getInt("teacherId"));

            return classTeacher;
        }
    }

    public static final class TeacherClassIdMapper implements RowMapper<TeacherClassId> {
        @Override
        public TeacherClassId mapRow(ResultSet rs, int index) throws SQLException {
            TeacherClassId teacherClassId = new TeacherClassId();
            teacherClassId.setId(rs.getInt("ID"));
            teacherClassId.setFirstName(rs.getString("FirstName"));
            teacherClassId.setLastName(rs.getString("LastName"));
            teacherClassId.setIsActive(rs.getBoolean("IsActive"));
            if (rs.getObject("classId") != null)
                teacherClassId.setClassId(rs.getInt("classId"));
            return teacherClassId;
        }
    }

}
