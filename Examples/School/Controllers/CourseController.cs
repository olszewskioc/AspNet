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
    public class CourseController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<CourseController> _logger;
        public CourseController(AppDbContext context, ILogger<CourseController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseReadDTO>>> Get()
        {
            try
            {
                var courses = await _context.Courses
                    .Include(c => c.Students)
                    .Select(course => new CourseReadDTO
                    {
                        CourseId = course.CourseId,
                        Description = course.Description,
                        Students = course.Students.Select(s => new StudentInCourseDTO
                        {
                            StudentId = s.StudentId,
                            StudentName = s.StudentName
                        }).ToList()
                    })
                    .ToListAsync();

                _logger.LogInformation("Courses fetched successfully");
                return Ok(courses);
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
        public async Task<ActionResult<CourseReadDTO>> Get(int id)
        {
            try
            {
                var courses = await _context.Courses
                    .Include(c => c.Students)
                    .Select(course => new CourseReadDTO
                    {
                        CourseId = course.CourseId,
                        Description = course.Description,
                        Students = course.Students.Select(s => new StudentInCourseDTO
                        {
                            StudentId = s.StudentId,
                            StudentName = s.StudentName
                        }).ToList()
                    })
                    .FirstOrDefaultAsync(c => c.CourseId == id);

                _logger.LogInformation("Courses fetched successfully");
                return Ok(courses);
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
        public async Task<ActionResult<CourseReadDTO>> Post([FromBody] CourseCreateDTO courseDto)
        {
            try
            {
                var course = new Course
                {
                    Description = courseDto.Description
                };

                _context.Courses.Add(course);
                _logger.LogInformation($"Course {course.Description} added to the context!");
                await _context.SaveChangesAsync();

                var courseRead = new CourseReadDTO
                {
                    CourseId = course.CourseId,
                    Description = course.Description,
                    Students = new List<StudentInCourseDTO>() // retorno vazio, pois ainda não há alunos
                };

                return Ok(courseRead);
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
        public async Task<ActionResult> Put(int id, [FromBody] CourseUpdateDTO courseDto)
        {
            try
            {
                var course = await _context.Courses.FindAsync(id);
                if (course == null) return NotFound($"Course not found: ${id}");

                course.Description = courseDto.Description ?? course.Description;

                await _context.SaveChangesAsync();
                _logger.LogInformation($"Course {course.Description} updated succesfuly\n");
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

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var course = await _context.Courses.FindAsync(id);
                if (course == null) return NotFound($"Course not found: ${id}");
                _context.Courses.Remove(course);
                await _context.SaveChangesAsync();
                _logger.LogWarning($"Course ${course.CourseId} deleted!");
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