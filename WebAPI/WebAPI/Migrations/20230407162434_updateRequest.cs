using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class updateRequest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "InstructorId",
                table: "Student",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Student_InstructorId",
                table: "Student",
                column: "InstructorId");

            migrationBuilder.CreateIndex(
                name: "IX_Request_InstructorId",
                table: "Request",
                column: "InstructorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Request_Instructor_InstructorId",
                table: "Request",
                column: "InstructorId",
                principalTable: "Instructor",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Student_Instructor_InstructorId",
                table: "Student",
                column: "InstructorId",
                principalTable: "Instructor",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Request_Instructor_InstructorId",
                table: "Request");

            migrationBuilder.DropForeignKey(
                name: "FK_Student_Instructor_InstructorId",
                table: "Student");

            migrationBuilder.DropIndex(
                name: "IX_Student_InstructorId",
                table: "Student");

            migrationBuilder.DropIndex(
                name: "IX_Request_InstructorId",
                table: "Request");

            migrationBuilder.DropColumn(
                name: "InstructorId",
                table: "Student");
        }
    }
}
