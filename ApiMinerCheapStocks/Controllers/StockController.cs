using ApiMinerCheapStocks.DTOs;
using ApiMinerCheapStocks.Models;
using ApiMinerCheapStocks.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace ApiMinerCheapStocks.Controllers
{
    [ApiController]
    [Route("/api/v1/[controller]")]
    public class StockController : ControllerBase
    {
        private readonly IStockRepository _stockRepository;
        private readonly IMapper _mapper;

        public StockController(IStockRepository stockRepository, IMapper mapper) {
            _stockRepository = stockRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200)]
        public async Task<IActionResult> GetStockAsync(CancellationToken cancellationToken)
        {
            List<Stock> stocks = await _stockRepository.GetAsync(cancellationToken);
            return this.Ok(_mapper.Map<List<StockDTO>>(stocks));
        }

        [HttpGet("{ticker}")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> GetStockByTickerAsync(string ticker, CancellationToken cancellationToken)
        {
            Stock? stock = await _stockRepository.GetByTickerAsync(ticker, cancellationToken);
            if(stock == null)
                return this.NotFound();
            return this.Ok(_mapper.Map<StockDTO>(stock));

        }

        [HttpPost]
        [ProducesResponseType(201)]
        public async Task<IActionResult> AddStockAsync([FromBody] StockDTO request, CancellationToken cancellationToken)
        {
            await _stockRepository.AddAsync(_mapper.Map<Stock>(request), cancellationToken);
            return this.Created("stock", request);
        }

    }
}
