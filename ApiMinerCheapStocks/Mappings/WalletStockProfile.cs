using ApiMinerCheapStocks.DTOs;
using ApiMinerCheapStocks.Models;
using AutoMapper;

namespace ApiMinerCheapStocks.Mappings
{
    public class WalletStockProfile : Profile
    {
        public WalletStockProfile() {
            CreateMap<WalletStock, WalletStockResponse>();
            CreateMap<WalletStockRequest, WalletStock>();
        }
    }
}
