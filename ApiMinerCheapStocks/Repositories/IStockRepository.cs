using ApiMinerCheapStocks.Models;
using ApiMinerCheapStocks.Repositories;

namespace ApiMinerCheapStocks.Services
{
    public interface IStockRepository
    {
        Task AddAsync(Stock stock, CancellationToken cancellationToken);
        Task<Stock?> AddStockFromApiByTickerAsync(string ticker, CancellationToken cancellationToken);
        Task<List<Stock>> GetAsync(CancellationToken cancellationToken);
        Task RemoveAsync(string id, CancellationToken cancellationToken);
        Task<Stock?> GetByTickerAsync(string ticker, CancellationToken cancellationToken);
    }
}
