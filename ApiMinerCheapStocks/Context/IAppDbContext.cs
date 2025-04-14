using ApiMinerCheapStocks.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiMinerCheapStocks.Context
{
    public interface IAppDbContext : IDisposable
    {
        DbSet<Stock>? Stocks { get; set;  }
        DbSet<Wallet>? Wallets { get; set; }
    }
}
