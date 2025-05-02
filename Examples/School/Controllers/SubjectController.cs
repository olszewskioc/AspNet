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
    public class SubjectController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<SubjectController> _logger;
        public SubjectController(AppDbContext context, ILogger<SubjectController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubjectReadDTO>>> Get()
        {
            try
            {
                var subjects = await _context.Subjects
                    .Select(subject => new SubjectReadDTO { SubjectId = subject.SubjectId, Description = subject.Description})
                    .ToListAsync();
                _logger.LogInformation($"subjects get with success\n");
                return Ok(subjects);
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
        public async Task<ActionResult<SubjectReadDTO>> Get(int id)
        {
            try
            {
                var subjects = await _context.Subjects
                    .Select(subject => new SubjectReadDTO { SubjectId = subject.SubjectId, Description = subject.Description})
                    .FirstOrDefaultAsync(s => s.SubjectId == id);
                _logger.LogInformation($"subjects get with success\n");
                return Ok(subjects);
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
        public async Task<ActionResult<SubjectReadDTO>> Post([FromBody] SubjectCreateDTO subjectDto)
        {
            try
            {
                var subject = new Subject
                {
                    Description = subjectDto.Description
                };
                _context.Subjects.Add(subject);
                _logger.LogInformation($"Student ${subject.Description} added to the context!\n");
                await _context.SaveChangesAsync();

                var subjectRead = new SubjectReadDTO
                { 
                    SubjectId = subject.SubjectId,
                    Description = subject.Description,
                };
                return Ok(subjectRead);
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
        public async Task<ActionResult> Put(int id, [FromBody] SubjectUpdateDTO subjectDto)
        {
            try
            {
                var subject = await _context.Subjects.FindAsync(id);
                if (subject == null) return NotFound($"subject not found: ${id}");

                subject.Description = subjectDto.Description ?? subject.Description;

                await _context.SaveChangesAsync();
                _logger.LogInformation($"subject {subject.Description} updated succesfuly\n");
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
                var subject = await _context.Subjects.FindAsync(id);
                if (subject == null) return NotFound($"subject not found: ${id}");
                _context.Subjects.Remove(subject);
                await _context.SaveChangesAsync();
                _logger.LogWarning($"subject ${subject.SubjectId} deleted!");
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