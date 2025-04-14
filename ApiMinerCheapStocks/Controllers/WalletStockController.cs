using ApiMinerCheapStocks.DTOs;
using ApiMinerCheapStocks.Models;
using ApiMinerCheapStocks.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiMinerCheapStocks.Controllers
{
    [ApiController]
    //[Authorize(AuthenticationSchemes = "Bearer")]
    [Route("/api/v1/[controller]")]
    public class WalletStockController : ControllerBase
    {
        private readonly IWalletStockRepository _walletStockRepository;
        private readonly IMapper _mapper;

        public WalletStockController(IWalletStockRepository walletStockRepository, IMapper mapper)
        {
            _walletStockRepository = walletStockRepository;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> GetByIdAsync(string id, CancellationToken cancellationToken)
        {
            List<WalletStock> walletStocks = await _walletStockRepository.GetByWalletIdAsync(id, cancellationToken);
            return this.Ok(_mapper.Map<List<WalletStockResponse>>(walletStocks));
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        public async Task<IActionResult> RemoveWalletStockAsync(string id, CancellationToken cancellationToken)
        {
            await _walletStockRepository.RemoveWalletStockAsync(id, cancellationToken);
            return this.NoContent();
        }

        [HttpPost]
        [ProducesResponseType(201)]
        public async Task<IActionResult> AddWalletStockAsync([FromBody] WalletStockRequest walletStock, CancellationToken cancellationToken)
        {
            var result = await _walletStockRepository.AddWalletStockAsync(_mapper.Map<WalletStock>(walletStock), cancellationToken);
            return this.Created("WalletStock", _mapper.Map<WalletStockResponse>(result));
        }
    }
}
