using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class RequestStudentName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Request_Student_StudentId",
                table: "Request");

            migrationBuilder.DropIndex(
                name: "IX_Request_StudentId",
                table: "Request");

            migrationBuilder.AddColumn<string>(
                name: "StudentName",
                table: "Request",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StudentName",
                table: "Request");

            migrationBuilder.CreateIndex(
                name: "IX_Request_StudentId",
                table: "Request",
                column: "StudentId");

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
