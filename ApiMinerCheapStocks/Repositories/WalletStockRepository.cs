using ApiMinerCheapStocks.Context;
using ApiMinerCheapStocks.Models;
using ApiMinerCheapStocks.Services;
using Microsoft.EntityFrameworkCore;
using System.Threading;

namespace ApiMinerCheapStocks.Repositories
{
    public class WalletStockRepository : IWalletStockRepository
    {
        private readonly AppDbContext _appDbContext;
        private readonly DbSet<WalletStock> _dbSet;
        private readonly IStockRepository _stockRepository;
        private readonly IWalletRepository _walletRepository;

        public WalletStockRepository(AppDbContext appDbContext, IStockRepository stockRepository, IWalletRepository walletRepository)
        {
            _appDbContext = appDbContext;
            _dbSet = _appDbContext.Set<WalletStock>();
            _stockRepository = stockRepository;
            _walletRepository = walletRepository;
        }

        private async Task UpdateWalletValue(WalletStock walletStock, 
            Func<double, double, double> updateOperationValue, 
            CancellationToken cancellationToken)
        {
            var stock = await _stockRepository.GetByTickerAsync(walletStock.Ticker, cancellationToken);

            var wallet = await _walletRepository.GetByIdAsync(walletStock.WalletId.ToString(), cancellationToken);

            var valueToBeProcessed = stock.Price * walletStock.Quantity;

            wallet.MoneyApplied = updateOperationValue(wallet.MoneyApplied, valueToBeProcessed);

            await _walletRepository.UpdateAsync(wallet.Id.ToString(), wallet, cancellationToken);
        }

        public async Task<WalletStock> AddWalletStockAsync(WalletStock walletStock, CancellationToken cancellationToken)
        {
            var wallet = await _walletRepository.GetByIdAsync(walletStock.WalletId.ToString(), cancellationToken);
            var stock = await _stockRepository.GetByTickerAsync(walletStock.Ticker, cancellationToken);

            stock ??= await _stockRepository.AddStockFromApiByTickerAsync(walletStock.Ticker, cancellationToken);

            walletStock.MinningDate = DateTime.Now;
            await UpdateWalletValue(walletStock, (current, change) => current + change, cancellationToken);

            _dbSet.Add(walletStock);
            await _appDbContext.SaveChangesAsync(cancellationToken);
            return walletStock;
        }

        public async Task<List<WalletStock>> GetByWalletIdAsync(string id, CancellationToken cancellationToken)
        {
            Guid guidId = Guid.Parse(id);
            var walletStock = await _dbSet.AsNoTracking().Where(x => x.WalletId == guidId).ToListAsync(cancellationToken);
            return walletStock;
        }

        public async Task RemoveWalletStockAsync(string id, CancellationToken cancellationToken)
        {
            Guid guidId = Guid.Parse(id);
            var walletStock = await _dbSet.FindAsync(guidId, cancellationToken);
            await UpdateWalletValue(walletStock, (current, change) => current - change, cancellationToken);

            _dbSet.Remove(walletStock);
            await _appDbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
