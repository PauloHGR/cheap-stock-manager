import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { StockService } from "./stocks.service";
import { Stock } from "./stocks.model";
import { StocksComponent } from "./stocks.component";
import { of } from "rxjs";

describe('Stocks Tests', () => {
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    beforeEach(() => {
        const httpSpy = jasmine.createSpyObj('HttpClient', ['get']);

        TestBed.configureTestingModule({
            imports:[StocksComponent],
            providers:[StockService,
                { provide: HttpClient, useValue: httpSpy },
            ]
        });
    });

    it('Should get all stocks succesfully', () => {
        
        let service = TestBed.inject(StockService);
        httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

        const valueToBeMock: Stock = {
            ticker: "PLPL3",
            roe: 0,
            roic: 0,
            margemEbit: 0,
            evEbit: 0,
            lpa: 0,
            price: 12.76,
            roicRank: 0,
            eyRank: 0,
            finalRank: 0,
            index: 0
        };

        const stockList = [valueToBeMock]

        httpClientSpy.get.and.returnValue(of(stockList));
        service.getAllAvailableStocks().subscribe(stock => {
            expect(stock).toContain(valueToBeMock);
            expect(httpClientSpy.get)
            .toHaveBeenCalledWith("http://localhost:5002/api/v1/Stock");
        });
        
    });

    it('Should get empty list of stocks', () => {
        
        let service = TestBed.inject(StockService);
        httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

        const stockList = [{}]

        httpClientSpy.get.and.returnValue(of(stockList));
        service.getAllAvailableStocks().subscribe(stock => {
            expect(stock).toBeNull;
            expect(httpClientSpy.get)
            .toHaveBeenCalledWith("http://localhost:5002/api/v1/Stock");
        });
        
    });

    it('Should get all stocks succesfully', () => {
        
        let service = TestBed.inject(StockService);
        httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

        const stockList = [
            {
                ticker: "PLPL3",
                roe: 0,
                roic: 0,
                margemEbit: 0,
                evEbit: 0,
                lpa: 0,
                price: 12.76,
                roicRank: 0,
                eyRank: 0,
                finalRank: 0,
                index: 0
            },
            {
                ticker: "SYNE",
                roe: 0,
                roic: 0,
                margemEbit: 0,
                evEbit: 0,
                lpa: 0,
                price: 6.76,
                roicRank: 4,
                eyRank: 2,
                finalRank: 1,
                index: 1
            }
        ];

        const valueToBeMock: Stock = {
            ticker: "SYNE",
            roe: 0,
            roic: 0,
            margemEbit: 0,
            evEbit: 0,
            lpa: 0,
            price: 6.76,
            roicRank: 4,
            eyRank: 2,
            finalRank: 1,
            index: 1
        }


        httpClientSpy.get.and.returnValue(of(stockList));
        service.getStockByTicker(valueToBeMock.ticker).subscribe(stock => {
            expect(stock).toContain(valueToBeMock);
            expect(httpClientSpy.get)
            .toHaveBeenCalledWith("http://localhost:5002/api/v1/Stock/" + valueToBeMock.ticker);
        });
        
    });
});