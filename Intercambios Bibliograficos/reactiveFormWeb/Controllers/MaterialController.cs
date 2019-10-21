using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IntercambiosBibliograficos.Models;
using Microsoft.AspNetCore.Mvc;

namespace IntercambiosBibliograficos.Controllers
{
       
    public class MaterialController : Controller
    {
        MaterialDataAccessLayer objmaterial = new MaterialDataAccessLayer();

        /// <summary>
        /// Retorna una lista de Materiales Bibliograficos.
        /// </summary>
        /// <remarks>
        /// Retorna una lista que contiene todos los Materiales Bibliograficos disponibles.
        /// </remarks>
        [HttpGet]
        [Route("api/Material/Index")]
        public IEnumerable<TblMaterial> Index()
        {
            return objmaterial.GetAllMateriales();
        }

        /// <summary>
        /// Retorna una lista de Materiales Bibliograficos de un Usuario.
        /// </summary>
        /// <remarks>
        /// Retorna una lista que contiene todos los Materiales Bibliograficos disponibles de un Usuario.
        /// </remarks>
        /// <param name="Email">Email para realizar la busqueda</param>
        [HttpGet]
        [Route("api/Material/IndexUser/{Email}")]
        public IEnumerable<TblMaterial> IndexUser(string Email)
        {
            return objmaterial.GetAllMaterialesOfUser(Email);
        }

        /// <summary>
        /// Crea un Material Bibliografico.
        /// </summary>
        /// <remarks>
        /// Realiza la creacion de un Material Bibliografico con los datos ingresados y se lo asigna a su creador.
        /// </remarks>
        /// <param name="material">Los atributos del Material Bibliografico que se creara</param>
        [HttpPost]
        [Route("api/Material/Create")]
        public int Create([FromBody] TblMaterial material)
        {
            return objmaterial.AddMaterial(material);
        }

        /// <summary>
        /// Retorna los Detalles de un Material Bibliografico
        /// </summary>
        /// <remarks>
        /// Recibe una Id como parametro y busca un Material Bibliografico con dicha Id.
        /// </remarks>
        /// <param name="id">Id para realizar la busqueda</param>
        [HttpGet]
        [Route("api/Material/Details/{id}")]
        public TblMaterial Details(int id)
        {
            return objmaterial.GetMaterialData(id);
        }

        /// <summary>
        /// Edita un Material Bibliografico.
        /// </summary>
        /// <remarks>
        /// Realiza la edicion de un Material Bibliografico con los datos ingresados.
        /// </remarks>
        /// <param name="material">Los atributos del Material Bibliografico que se editaran</param>
        [HttpPut]
        [Route("api/Material/Edit")]
        public int Edit([FromBody]TblMaterial material)
        {
            return objmaterial.UpdateMaterial(material);
        }

        /// <summary>
        /// Elimina un Material Bibliografico.
        /// </summary>
        /// <remarks>
        /// Realiza la eliminacion de un Material Bibliografico.
        /// </remarks>
        /// <param name="id">Id del Material Bibliografico que se eliminara</param>
        [HttpDelete]
        [Route("api/Material/Delete/{id}")]
        public int Delete(int id)
        {
            return objmaterial.DeleteMaterial(id);
        }
    }
}
