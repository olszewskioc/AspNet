using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;
using School.Data;
using School.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using School.DTOs;

namespace School.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<StudentController> _logger;
        public StudentController(AppDbContext context, ILogger<StudentController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentReadDTO>>> Get()
        {
            try
            {
                var students = await _context.Students
                    .Include(s => s.Course)
                    .Select(s => new StudentReadDTO
                    {
                        StudentId = s.StudentId,
                        StudentName = s.StudentName,
                        Course = new CourseStudentReadDTO
                        {
                            CourseId = s.Course.CourseId,
                            Description = s.Course.Description
                        }
                    })
                    .ToListAsync();

                _logger.LogInformation("Students get with success");
                return Ok(students);
            }
            catch (NpgsqlException ex)
            {
                _logger.LogError(ex, "ERROR DB");
                return StatusCode(400, $"ERROR DB: {ex.Message}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ERROR");
                return StatusCode(500, $"ERROR: {ex.Message}");
            }
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<StudentReadDTO>> Get(int id)
        {
            try
            {
                var students = await _context.Students
                    .Include(s => s.Course)
                    .Select(s => new StudentReadDTO
                    {
                        StudentId = s.StudentId,
                        StudentName = s.StudentName,
                        Course = new CourseStudentReadDTO
                        {
                            CourseId = s.Course.CourseId,
                            Description = s.Course.Description
                        }
                    })
                    .FirstOrDefaultAsync(s => s.StudentId == id);
                if (students == null) return NotFound("Student not found");

                _logger.LogInformation($"Student {students.StudentName} get with success\n");
                return Ok(students);
            }
            catch (NpgsqlException ex)
            {
                _logger.LogError(ex, "ERROR DB");
                return StatusCode(400, $"ERROR DB: {ex.Message}");

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ERROR");
                return StatusCode(500, $"ERROR: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<ActionResult<StudentReadDTO>> Post([FromBody] StudentCreateDTO studentDto)
        {
            try
            {
                var course = await _context.Courses.FirstOrDefaultAsync(c => c.CourseId == studentDto.CourseId);
                if (course == null) return BadRequest($"Course not found: ${studentDto.CourseId}");
                var student = new Student
                {
                    StudentName = studentDto.StudentName,
                    CourseId = studentDto.CourseId
                };
                _context.Students.Add(student);
                _logger.LogInformation($"Student ${student.StudentName} added to the context!\n");
                await _context.SaveChangesAsync();

                var studentRead = new StudentReadDTO
                {
                    StudentId = student.StudentId,
                    StudentName = student.StudentName,
                    Course = new CourseStudentReadDTO {CourseId = course.CourseId, Description = course.Description}
                };
                return Ok(studentRead);
            }
            catch (NpgsqlException ex)
            {
                _logger.LogError(ex, "ERROR DB");
                return StatusCode(400, $"ERROR DB: {ex.Message}");

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ERROR");
                return StatusCode(500, $"ERROR: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] StudentUpdateDTO studentDto)
        {
            try
            {
                var student = await _context.Students.FindAsync(id);
                if (student == null) return NotFound($"Student not found: ${id}");

                var course = await _context.Courses.FirstOrDefaultAsync(c => c.CourseId == studentDto.CourseId);
                if (course == null) return BadRequest($"Course not found: ${studentDto.CourseId}");

                student.StudentName = studentDto.StudentName ?? student.StudentName;
                student.CourseId = studentDto.CourseId ?? student.CourseId;

                await _context.SaveChangesAsync();
                _logger.LogInformation($"Student {student.StudentName} updated succesfuly\n");
                return Ok(new { message = "Student uptdated succesfully!" });

            }
            catch (NpgsqlException ex)
            {
                _logger.LogError(ex, "ERROR DB");
                return StatusCode(500, $"ERROR DB: {ex.Message}");

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ERROR");
                return StatusCode(500, $"ERROR: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var student = await _context.Students.FindAsync(id);
                if (student == null) return NotFound($"Student not found: ${id}");
                _context.Students.Remove(student);
                await _context.SaveChangesAsync();
                _logger.LogWarning($"Stuend ${student.StudentName} deleted!");
                return NoContent();
            }
            catch (NpgsqlException ex)
            {
                _logger.LogError(ex, "ERROR DB");
                return StatusCode(500, $"ERROR DB: {ex.Message}");

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ERROR");
                return StatusCode(500, $"ERROR: {ex.Message}");
            }
        }
    }
}