using ApiMinerCheapStocks.DTOs;
using ApiMinerCheapStocks.Models;
using AutoMapper;

namespace ApiMinerCheapStocks.Mappings
{
    public class StockProfile : Profile
    {
        public StockProfile() {
            CreateMap<StockDTO, Stock>().ReverseMap();
        }
    }
}
