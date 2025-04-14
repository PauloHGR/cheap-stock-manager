using ApiMinerCheapStocks.Context;
using ApiMinerCheapStocks.Models;
using ApiMinerCheapStocks.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Text.Json;

namespace ApiMinerCheapStocks.Services
{
    public class StockRepository : IStockRepository
    {
        private static readonly HttpClient httpClient = new HttpClient();
        private readonly AppDbContext _appDbContext;
        private readonly DbSet<Stock> _dbSet;

        public StockRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
            _dbSet = _appDbContext.Set<Stock>();
        }

        public async Task AddAsync(Stock stock, CancellationToken cancellationToken)
        {
            stock.MinningDate = DateTime.Now;
            _dbSet.Add(stock);
            await _appDbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task RemoveAsync(string id, CancellationToken cancellationToken)
        {
            Guid guidId = Guid.Parse(id);
            var stock = await _dbSet.FindAsync(guidId, cancellationToken);
            _dbSet.Remove(stock);
            await _appDbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task<List<Stock>> GetAsync(CancellationToken cancellationToken)
        {
            try
            {
                using HttpResponseMessage response = await httpClient.GetAsync("http://127.0.0.1:8000");
                response.EnsureSuccessStatusCode();
                var responseBody = await response.Content.ReadAsStringAsync();

                var myObj = JsonSerializer.Deserialize<List<Stock>>(responseBody);
                return myObj;
                
            }
            catch (HttpRequestException ex)
            {
                throw new BadHttpRequestException("Error! Server Unreachable", 500);
            }
            
        }

        public async Task<Stock?> GetByTickerAsync(string ticker, CancellationToken cancellationToken)
        {
           return await _dbSet.Where(s => s.Ticker == ticker).FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<Stock?> AddStockFromApiByTickerAsync(string ticker, CancellationToken cancellationToken)
        {
            var stocks = await GetAsync(cancellationToken);
            var stock = stocks.Where(s => s.Ticker == ticker).FirstOrDefault();

            if (stock == null)
                return null;

            await AddAsync(stock, cancellationToken);
            return stock;
        }
    }
}
