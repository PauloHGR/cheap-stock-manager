using ApiMinerCheapStocks.Models;
using System.Linq.Expressions;

namespace ApiMinerCheapStocks.Repositories
{
    public interface IWalletRepository
    {
        Task AddAsync(Wallet wallet, CancellationToken cancellationToken);
        Task<List<Wallet>> GetAsync(CancellationToken cancellationToken);
        Task<Wallet> GetByIdAsync(string id, CancellationToken cancellationToken);
        Task<List<Wallet>> FilterAsync(Expression<Func<Wallet, bool>> predicate, CancellationToken cancellationToken);
        Task UpdateAsync(string id, Wallet request, CancellationToken cancellationToken);
        Task RemoveAsync(string id, CancellationToken cancellationToken);

    }
}
