using ApiMinerCheapStocks.Models;

namespace ApiMinerCheapStocks.Repositories
{
    public interface IWalletStockRepository
    {
        Task<List<WalletStock>> GetByWalletIdAsync(string id, CancellationToken cancellationToken);
        Task<WalletStock> AddWalletStockAsync(WalletStock walletStock, CancellationToken cancellationToken);
        Task RemoveWalletStockAsync(string id, CancellationToken cancellationToken);
    }
}
