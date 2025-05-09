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
    public class CourseSubjectStudentController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<CourseSubjectStudentController> _logger;
        public CourseSubjectStudentController(AppDbContext context, ILogger<CourseSubjectStudentController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseSubjectStudentReadDTO>>> Get()
        {
            try
            {
                var courseSubjectStudents = await _context.CourseSubjectStudents
                    .Include(css => css.Subject)
                    .Include(css => css.Course)
                    .Include(css => css.Student)
                    .Select(css => new CourseSubjectStudentReadDTO
                    {
                        Course = new CourseStudentReadDTO
                        {
                            CourseId = css.CourseId,
                            Description = css.Course.Description
                        },
                        Subject = new SubjectReadDTO
                        {
                            SubjectId = css.SubjectId,
                            Description = css.Subject.Description
                        },
                        Student = new StudentInCourseDTO
                        {
                            StudentId = css.StudentId,
                            StudentName = css.Student.StudentName
                        },
                    })
                    .ToListAsync();
                _logger.LogInformation($"courseSubjectStudents get with success\n");
                return Ok(courseSubjectStudents);
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
        public async Task<ActionResult<CourseSubjectStudentReadDTO>> Get(int id)
        {
            try
            {
                var courseSubjectStudents = await _context.CourseSubjectStudents
                    .Include(css => css.Subject)
                    .Include(css => css.Course)
                    .Include(css => css.Student)
                    .Select(css => new CourseSubjectStudentReadDTO
                    {
                        Course = new CourseStudentReadDTO
                        {
                            CourseId = css.CourseId,
                            Description = css.Course.Description
                        },
                        Subject = new SubjectReadDTO
                        {
                            SubjectId = css.SubjectId,
                            Description = css.Subject.Description
                        },
                        Student = new StudentInCourseDTO
                        {
                            StudentId = css.StudentId,
                            StudentName = css.Student.StudentName
                        },
                    })
                    .FirstOrDefaultAsync(css => css.Student.StudentId == id);
                _logger.LogInformation($"courseSubjectStudents get with success\n");
                return Ok(courseSubjectStudents);
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
        public async Task<ActionResult<CourseSubjectStudentReadDTO>> Post([FromBody] CourseSubjectStudentCreateDTO courseSubjectStudentCreateDTO)
        {
            try
            {
                var courseSubjectStudent = new CourseSubjectStudent
                {
                    StudentId = courseSubjectStudentCreateDTO.StudentId,
                    SubjectId = courseSubjectStudentCreateDTO.SubjectId,
                    CourseId = courseSubjectStudentCreateDTO.CourseId
                };

                _context.CourseSubjectStudents.Add(courseSubjectStudent);
                _logger.LogInformation("CourseSubjectStudent added to the context!");
                await _context.SaveChangesAsync();

                // Recupera com os dados de navegação
                var courseSubjectStudentFull = await _context.CourseSubjectStudents
                    .Include(c => c.Course)
                    .Include(s => s.Subject)
                    .Include(st => st.Student)
                    .FirstOrDefaultAsync(x =>
                        x.CourseId == courseSubjectStudent.CourseId &&
                        x.SubjectId == courseSubjectStudent.SubjectId &&
                        x.StudentId == courseSubjectStudent.StudentId
                    );

                if (courseSubjectStudentFull == null)
                    return NotFound("Não foi possível recuperar os dados inseridos.");

                var courseSubjectStudentRead = new CourseSubjectStudentReadDTO
                {
                    Course = new CourseStudentReadDTO
                    {
                        CourseId = courseSubjectStudentFull.Course.CourseId,
                        Description = courseSubjectStudentFull.Course.Description
                    },
                    Subject = new SubjectReadDTO
                    {
                        SubjectId = courseSubjectStudentFull.Subject.SubjectId,
                        Description = courseSubjectStudentFull.Subject.Description
                    },
                    Student = new StudentInCourseDTO
                    {
                        StudentId = courseSubjectStudentFull.Student.StudentId,
                        StudentName = courseSubjectStudentFull.Student.StudentName
                    },
                };

                return Ok(courseSubjectStudentRead);
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


        [HttpPut]
        public async Task<ActionResult> Put(
            [FromQuery] int studentId, 
            [FromQuery] int courseId, 
            [FromQuery] int subjectId, 
            [FromBody] CourseSubjectStudentUpdateDTO courseSubjectStudentUpdateDTO)
        {
            try
            {
                var courseSubjectStudent = await _context.CourseSubjectStudents
                    .FirstOrDefaultAsync(css => 
                        css.StudentId == studentId &&
                        css.CourseId == courseId &&
                        css.SubjectId == subjectId);

                if (courseSubjectStudent == null)
                    return NotFound($"Matrícula não encontrada para os IDs fornecidos: StudentId={studentId}, CourseId={courseId}, SubjectId={subjectId}");

                // Verifica se algum ID da chave composta foi alterado
                bool chaveAlterada = 
                    (courseSubjectStudentUpdateDTO.StudentId.HasValue && courseSubjectStudentUpdateDTO.StudentId.Value != studentId) ||
                    (courseSubjectStudentUpdateDTO.CourseId.HasValue && courseSubjectStudentUpdateDTO.CourseId.Value != courseId) ||
                    (courseSubjectStudentUpdateDTO.SubjectId.HasValue && courseSubjectStudentUpdateDTO.SubjectId.Value != subjectId);

                if (chaveAlterada)
                {
                    // Remove o registro antigo
                    _context.CourseSubjectStudents.Remove(courseSubjectStudent);

                    // Adiciona o novo com os valores atualizados
                    var newCourseSubjectStudent = new CourseSubjectStudent
                    {
                        StudentId = courseSubjectStudentUpdateDTO.StudentId ?? studentId,
                        CourseId = courseSubjectStudentUpdateDTO.CourseId ?? courseId,
                        SubjectId = courseSubjectStudentUpdateDTO.SubjectId ?? subjectId
                    };

                    _context.CourseSubjectStudents.Add(newCourseSubjectStudent);
                }
                else
                {
                    // Atualiza apenas os outros campos
                    courseSubjectStudent.StudentId = courseSubjectStudentUpdateDTO.StudentId ?? courseSubjectStudent.StudentId;
                    courseSubjectStudent.CourseId = courseSubjectStudentUpdateDTO.CourseId ?? courseSubjectStudent.CourseId;
                    courseSubjectStudent.SubjectId = courseSubjectStudentUpdateDTO.SubjectId ?? courseSubjectStudent.SubjectId;
                }

                await _context.SaveChangesAsync();
                _logger.LogInformation($"Matrícula atualizada com sucesso\n");
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



        [HttpDelete]
        public async Task<ActionResult> Delete([FromQuery] int studentId, [FromQuery] int courseId, [FromQuery] int subjectId)
        {
            var courseSubjectStudent = await _context.CourseSubjectStudents
                .FirstOrDefaultAsync(css => css.StudentId == studentId && css.CourseId == courseId && css.SubjectId == subjectId);

            if (courseSubjectStudent == null)
                return NotFound("Registration not found with the specified IDs.");

            _context.CourseSubjectStudents.Remove(courseSubjectStudent);
            await _context.SaveChangesAsync();

            _logger.LogWarning("CourseSubjectStudent deleted!");
            return NoContent();
        }
    }
}