using System.Text.Json.Serialization;

namespace ApiMinerCheapStocks.DTOs
{
    public class StockDTO
    {
        public double Price { get; set; }
        public string Ticker { get; set; }
        public double Roe { get; set; }
        public double Roic { get; set; }
        public double MargemEbit { get; set; }
        public double EvEbit { get; set; }
        public double Lpa { get; set; }
        public int RoicRank { get; set; }
        public int EyRank { get; set; }
        public int FinalRank { get; set; }
        public int Index { get; set; }

    }
}
