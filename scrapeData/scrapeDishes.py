from seleniumwire import webdriver  # Import from seleniumwire
import gzip
import io
import json
import pandas as pd
bytes = io.BytesIO()

# Create a new instance of the Chrome driver
driver = webdriver.Chrome()

# cam le
# 127568, 130404
# ngu hanh son
# 130792
# hai chau
# 60114
# son tra
# 207333
# lien chieu
# 225160
# thanh khe
# 128317

supplierId = '128317'
linkWeb = 'https://shopeefood.vn/da-nang/sieu-thi-co-op-mart-da-nang'

# Go to the Google home page
driver.get(linkWeb)

dataFull = []

# Access requests via the `requests` attribute
for request in driver.requests:
    if request.response:
        if request.url.startswith('https://gappapi.deliverynow.vn/api/dish/get_delivery_dishes?id_type=2&request_id=' + supplierId):
            # print(request.response.body)
            res = request.response.body
            bytes.write(res)

            bytes.seek(0)
            with gzip.GzipFile(fileobj=bytes, mode='rb') as f:
                documents = f.read()  # type: bytes
                str = documents.decode('utf-8')
                data = json.loads(str)
                rows = data['reply']['menu_infos']
                # print(len(rows))
                for i in range(len(rows)):
                    rowDishes = len(data['reply']['menu_infos'][i]['dishes'])
                    for j in range(rowDishes):
                        id = data['reply']['menu_infos'][i]['dishes'][j]['id']
                        name = data['reply']['menu_infos'][i]['dishes'][j]['name']
                        photo = data['reply']['menu_infos'][i]['dishes'][j]['photos'][4]['value']
                        price = data['reply']['menu_infos'][i]['dishes'][j]['price']['value']
                        type = data['reply']['menu_infos'][i]['dish_type_name']

                        dataFull.append(
                            (id, name, photo, price, type, supplierId))
df = pd.DataFrame(dataFull, columns=['id', 'name', 'photo', 'price', 'type', 'supplierId'])
# print(df)
df.to_excel('test.xlsx')
