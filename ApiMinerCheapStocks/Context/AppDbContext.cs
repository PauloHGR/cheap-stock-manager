using ApiMinerCheapStocks.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ApiMinerCheapStocks.Context
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>, IAppDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public virtual DbSet<Stock>? Stocks { get; set; }
        public virtual DbSet<Wallet>? Wallets { get; set; }
        public virtual DbSet<WalletStock>? WalletStocks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Stock>().HasKey(c => new { c.Id, c.Ticker });
            modelBuilder.Entity<WalletStock>().HasOne(s => s.Stock).WithMany(ws => ws.WalletStocks).HasForeignKey(s => new { s.StockId, s.Ticker });
            modelBuilder.Entity<WalletStock>().HasOne(s => s.Wallet).WithMany(ws => ws.WalletStocks).HasForeignKey(s => s.WalletId);
        }
    }
}
