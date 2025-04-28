import pandas as pd
import numpy as np
from fastapi import FastAPI
import json

app = FastAPI()

def parse_csv(df):
    res = df.to_json(orient="records")
    parsed = json.loads(res)
    return parsed

@app.get("/")
def getStocks():
    shares_list = pd.read_csv('app/statusinvest-busca-avancada.csv', sep=";") #Aplicar primeiro o filtro (Liquidez média diária > 300000) no site
    columns = ['ROE','ROIC','MARGEM EBIT','EV/EBIT',' LPA','PRECO']
    list_filtered = shares_list[columns].apply(lambda x: x.str.replace('.', '', regex=False).str.replace(',', '.', regex=False).transform(pd.to_numeric))

    share_name = shares_list['TICKER']
    list_filtered = pd.concat([share_name, list_filtered],axis=1)

    list_filtered = list_filtered[list_filtered['ROIC'] > 2]
    list_filtered = list_filtered[list_filtered['PRECO'] > 0]
    list_filtered = list_filtered[list_filtered['EV/EBIT'] > 0]
    list_filtered = list_filtered.sort_values(by = 'ROIC', ascending=False)
    list_filtered['ROIC_Rank'] = np.arange(len(list_filtered))
    list_filtered = list_filtered.sort_values(by = 'EV/EBIT')
    list_filtered['EY_Rank'] = np.arange(len(list_filtered))

    list_filtered['Final_Rank'] = list_filtered['ROIC_Rank'] + list_filtered['EY_Rank']
    list_filtered = list_filtered.sort_values(by = 'Final_Rank')
    list_filtered['Index'] = np.arange(len(list_filtered))
    list_filtered.to_csv('lista_final_apr_2025.csv')
    return parse_csv(list_filtered)