using ApiMinerCheapStocks.DTOs;
using ApiMinerCheapStocks.Models;
using AutoMapper;

namespace ApiMinerCheapStocks.Mappings
{
    public class WalletProfile : Profile
    {
        public WalletProfile() {
            CreateMap<Wallet, WalletResponse>();
        }
    }
}
