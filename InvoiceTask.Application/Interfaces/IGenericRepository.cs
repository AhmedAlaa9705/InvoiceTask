using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceTask.Application.Interfaces
{
    public interface IGenericRepository<T>where T:class
    {
        List<T> GetAll();
        List<T> GetAll(params string[] includes);
        T GetById(object id);
        T GetById(Expression<Func<T, bool>> filter, params string[] includes);
        T GetByIdWithInclude(Expression<Func<T, bool>> filter, object id, string[] includes = null);
        void Insert(T obj);
        void Update(T obj);
        void Delete(int id);
        IList<T> Fitler(Expression<Func<T, bool>> pridicate);
        IList<T> Fitler(Expression<Func<T, bool>> pridicate, params string[] includes);
    }
}
