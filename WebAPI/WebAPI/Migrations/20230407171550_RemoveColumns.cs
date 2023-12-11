using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class RemoveColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Request_Instructor_InstructorId",
                table: "Request");

            migrationBuilder.DropForeignKey(
                name: "FK_Request_Student_StudentId",
                table: "Request");

            migrationBuilder.DropIndex(
                name: "IX_Request_InstructorId",
                table: "Request");

            migrationBuilder.DropIndex(
                name: "IX_Request_StudentId",
                table: "Request");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Request_InstructorId",
                table: "Request",
                column: "InstructorId");

            migrationBuilder.CreateIndex(
                name: "IX_Request_StudentId",
                table: "Request",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Request_Instructor_InstructorId",
                table: "Request",
                column: "InstructorId",
                principalTable: "Instructor",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Request_Student_StudentId",
                table: "Request",
                column: "StudentId",
                principalTable: "Student",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
