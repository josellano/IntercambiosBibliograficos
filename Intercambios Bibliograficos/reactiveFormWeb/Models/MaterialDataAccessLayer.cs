using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IntercambiosBibliograficos.Models
{
    public class MaterialDataAccessLayer
    {
        ApplicationDbContext db = new ApplicationDbContext();

        public IEnumerable<TblMaterial> GetAllMateriales()
        {
            try
            {
                return db.TblMaterial.ToList();
            }
            catch
            {
                throw;
            }
        }

       

        public IEnumerable<TblMaterial> GetAllMaterialesOfUser(string Email)
        {
            try
            {
                var result = (from a in db.TblMaterial
                              where a.Email == Email
                              select a).ToList();
                return result;
            }
            catch
            {
                throw;
            }
        }

        public int AddMaterial(TblMaterial material)
        {
            try
            {
                db.TblMaterial.Add(material);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
  
        public int UpdateMaterial(TblMaterial material)
        {
            try
            {
                db.Entry(material).State = EntityState.Modified;
                db.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }
        
        public TblMaterial GetMaterialData(int id)
        {
            try
            {
                TblMaterial material = db.TblMaterial.Find(id);
                return material;
            }
            catch
            {
                throw;
            }
        }
        
        public int DeleteMaterial(int id)
        {
            try
            {
                TblMaterial mat = db.TblMaterial.Find(id);
                db.TblMaterial.Remove(mat);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

    }
}
