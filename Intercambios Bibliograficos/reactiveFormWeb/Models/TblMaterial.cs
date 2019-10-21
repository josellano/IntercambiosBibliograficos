using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntercambiosBibliograficos.Models
{
    public partial class TblMaterial
    {
        
        public int MaterialID { get; set; }
        public string Titulo { get; set; }
        public string Autor { get; set; }
        public string Edicion { get; set; }
        public string Carrera { get; set; }
        public string Universidad { get; set; }
        public int Valor { get; set; }
        public string Estado { get; set; }
        public string PuntoLat { get; set; }
        public string PuntoLng { get; set; }
        public string Email { get; set; }
        public string Celular { get; set; }
    }
}
