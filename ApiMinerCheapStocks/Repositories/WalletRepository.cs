using ApiMinerCheapStocks.Context;
using ApiMinerCheapStocks.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace ApiMinerCheapStocks.Repositories
{
    public class WalletRepository :  IWalletRepository
    {
        private readonly AppDbContext _appDbContext;
        private readonly DbSet<Wallet> _dbSet;
        public WalletRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
            _dbSet = _appDbContext.Set<Wallet>();
        }

        public async Task AddAsync(Wallet wallet, CancellationToken cancellationToken)
        {
            _dbSet.Add(wallet);
            await _appDbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task<List<Wallet>> GetAsync(CancellationToken cancellationToken)
        {
            return await _appDbContext.Wallets.ToListAsync(cancellationToken);
        }

        public async Task<Wallet> GetByIdAsync(string id, CancellationToken cancellationToken)
        {
            Guid guidId = Guid.Parse(id);
            var wallet = await _dbSet.FindAsync(guidId, cancellationToken);
            return wallet;
        }

        public async Task<List<Wallet>> FilterAsync(Expression<Func<Wallet, bool>> predicate, CancellationToken cancellationToken)
        {
            return await _dbSet.AsNoTracking().Where(predicate).ToListAsync(cancellationToken);
        }

        public async Task UpdateAsync(string id, Wallet request, CancellationToken cancellationToken)
        {
            Wallet wallet = await GetByIdAsync(id, cancellationToken);
            wallet.Name = request.Name;
            wallet.MoneyApplied = request.MoneyApplied;
            _appDbContext.Wallets.Update(wallet);
            await _appDbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task RemoveAsync(string id, CancellationToken cancellationToken)
        {
            Guid guidId = Guid.Parse(id);
            var wallet = await _dbSet.FindAsync(guidId, cancellationToken);
            _dbSet.Remove(wallet);
            await _appDbContext.SaveChangesAsync(cancellationToken);
        }

    }
}
