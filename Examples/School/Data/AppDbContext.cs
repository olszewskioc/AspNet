using Microsoft.EntityFrameworkCore;
using School.Models;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace School.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseSubjectStudent> CourseSubjectStudents { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<CourseSubjectStudent>()
                .HasKey(css => new { css.StudentId, css.CourseId, css.SubjectId });
        }
    }
}