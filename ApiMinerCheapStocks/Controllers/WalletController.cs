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
    public class WalletController : ControllerBase
    {
        private readonly IWalletRepository _walletRepository;
        private readonly IMapper _mapper;

        public WalletController(IWalletRepository walletRepository, IMapper mapper)
        {
            _walletRepository = walletRepository;
            _mapper = mapper;
        }

        [HttpPost]
        [ProducesResponseType(201)]
        public async Task<IActionResult> AddWalletAsync([FromBody] Wallet wallet, CancellationToken cancellationToken)
        {
            await _walletRepository.AddAsync(wallet, cancellationToken);
            return this.Created();
        }

        [HttpGet]
        [ProducesResponseType(200)]
        public async Task<IActionResult> GetWalletsAsync(CancellationToken cancellationToken)
        {
            List<Wallet> wallets = await _walletRepository.GetAsync(cancellationToken);
            return this.Ok(_mapper.Map<List<WalletResponse>>(wallets));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> GetWalletById(string id, CancellationToken cancellationToken)
        {
            Wallet wallet = await _walletRepository.GetByIdAsync(id, cancellationToken);
            return this.Ok(wallet);
        }
        
        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        public async Task<IActionResult> UpdateWalletAsync(string id, [FromBody] Wallet wallet, CancellationToken cancellationToken)
        {
            await _walletRepository.UpdateAsync(id, wallet, cancellationToken);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        public async Task<IActionResult> DeleteWalletAsync(string id, CancellationToken cancellationToken)
        {
            await _walletRepository.RemoveAsync(id, cancellationToken);
            return NoContent();
        }

    }
}
