using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class ratings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rating_Student_StudentId",
                table: "Rating");

            migrationBuilder.DropIndex(
                name: "IX_Rating_StudentId",
                table: "Rating");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "Rating");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StudentId",
                table: "Rating",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Rating_StudentId",
                table: "Rating",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rating_Student_StudentId",
                table: "Rating",
                column: "StudentId",
                principalTable: "Student",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
