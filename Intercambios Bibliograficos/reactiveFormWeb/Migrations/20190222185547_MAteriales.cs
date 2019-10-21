using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace IntercambiosBibliograficos.Migrations
{
    public partial class MAteriales : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tblMaterial",
                columns: table => new
                {
                    MaterialID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Autor = table.Column<string>(unicode: false, maxLength: 20, nullable: false),
                    Carrera = table.Column<string>(unicode: false, maxLength: 40, nullable: false),
                    Celular = table.Column<string>(unicode: false, maxLength: 20, nullable: true),
                    Edicion = table.Column<string>(unicode: false, maxLength: 20, nullable: false),
                    Email = table.Column<string>(unicode: false, maxLength: 40, nullable: false),
                    Estado = table.Column<string>(unicode: false, maxLength: 40, nullable: false),
                    PuntoLat = table.Column<string>(unicode: false, maxLength: 20, nullable: false),
                    PuntoLng = table.Column<string>(unicode: false, maxLength: 20, nullable: false),
                    Titulo = table.Column<string>(unicode: false, maxLength: 20, nullable: false),
                    Universidad = table.Column<string>(unicode: false, maxLength: 40, nullable: false),
                    Valor = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tmp_ms_x__C50613175BC02C9E", x => x.MaterialID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblMaterial");
        }
    }
}
