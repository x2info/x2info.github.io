---
title:  "Python Pandas Series란? 기초 개념과 사용 예제"
header:
  overlay_image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=3864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
excerpt: "Python Pandas의 Series를 이해하고 사용하는 방법을 알아보세요. 인덱싱, 슬라이싱, 연산 등 데이터 분석을 위한 Pandas Series 사용법을 예제와 함께 설명합니다."
categories:
  - python
tags:
  - [PC, IT, PYTHON, 파이썬, 구글,Colab]

toc_label: "  목차"
toc: true
toc_sticky: true
---



## Series 생성

Pandas에서 Series는 1차원 배열 형태의 데이터를 다룰 때 유용하며, (인덱스, 값)의 구조를 가지고 있습니다. 차후에 사용할 DataFrame에서의 기본 자료구조이기 때문에 간단하게 사용법에 대해 알아 보도록 하겠습니다. 




### # 리스트로 생성
우선 Pandas의 Series를 생성하는 방법에 대해 알아 봅니다. 

파이썬 자료구조의 리스트나 딕셔너리를 이용하여 Series를 만들 수 있습니다. Series는 (인덱스, 값)의 구조를 가지고 있는데, 생성시에 리스트를 사용할 경우 자동으로 정수형 인덱스를 생성해 줍니다.

```python
import pandas as pd

data = [10, 20, 30, 40]
series = pd.Series(data)
print(series)
```

위의 코드는 아래와 같은 구조를 가지고 있습니다. 인덱스를 설정하지 않았지만 자동으로 설정됩니다.

|index|Value|
|--|--|
|0|10|
|1|20|
|2|30|
|3|40|

### # 인덱스 지정하여 생성
리스트를 통해 생성할 때, 별도의 인덱스를 지정하는 것도 가능합니다.
```python
series = pd.Series(data, index=['a', 'b', 'c', 'd'])
print(series)
```

위의 코드는 아래와 같은 구조를 가지고 있습니다. 인덱스가 변경되었습니다.

|index|Value|
|--|--|
|a|10|
|b|20|
|c|30|
|c|40|

### # 딕셔너리로 생성
딕셔너리는 (키, 값)의 구조를 가지고 있는데, Series를 딕셔너리로 만들경우 키값이 자동으로 인덱스로 지정됩니다.

```python
data = {'a': 10, 'b': 20, 'c': 30}
series = pd.Series(data)
print(series)
```
위의 코드는 아래와 같은 구조를 가지고 있습니다. 딕셔너리의 키 값이 인덱스가 되었습니다.

|index|Value|
|--|--|
|a|10|
|b|20|
|c|30|

## 주요 기능
다음은 Series의 주요 기능에 대해 알아 보겠습니다.

### # 값과 인덱스 접근
앞서 Series는 (인덱스, 값)의 구조를 가지고 있는데, 각각의 속성을 아래와 같이 출력할 수 있습니다.

```python
print(series.values)  # [10 20 30]
print(series.index)   # Index(['a', 'b', 'c'], dtype='object')

# idex와 value 출력
for idx, val in seri_data.items():
  print(idx, val)

# index만 출력
for idx in seri_data.index:
  print(idx)

# value만 출력
for val in seri_data.values:
  print(val)

```

### # 인덱싱과 슬라이싱
리스트와 유사하게 인덱싱과 슬라이싱이 가능합니다. 만약 연속적이지 않은 인덱스를 선택할 경우 리스트로 인덱스를 넘겨주면 됩니다.

```python
print(series['a'])        # 10
print(series[0:2])        # 첫 두 개 요소
print(series[['a', 'c']]) # 인덱스 'a'와 'c' 선택
```

### # Series 연산
Series 간 산술 연산도 가능합니다. 동일한 인덱스끼리 연산되며, 인덱스가 다를 경우 NaN으로 처리됩니다.
아래 2개의 series를 더해보도록 하겠습니다.

```python
seri_a = pd.Series([1, 2, 3], index=['a', 'b', 'c'])
seri_b = pd.Series([4, 5, 6], index=['b', 'c', 'd'])

result = seri_a + seri_b
print(result)

# 결과:
# a    NaN
# b    6.0
# c    8.0
# d    NaN
```
<div class="notice--info">
  <h4>📌데이터의 값이 비어있거나 잘못된 형식이라서 숫자로 변환할 수 없는 경우, Pandas는 해당 위치를 NaN으로 채워서 표시합니다.</h4>
</div>

만약 두개의 Series연산에서 인덱스가 일치하지 않을 경우, 0으로 변환해서 계산하고자 하는 경우는 아래와 같이 코드를 수정 할 수 있습니다.

```python
seri_a = pd.Series([1, 2, 3], index=['a', 'b', 'c'])
seri_b = pd.Series([4, 5, 6], index=['b', 'c', 'd'])

result = seri_a.add(seri_b, fill_value=0)  # 덧셈
#result = seri_a.sub(seri_b, fill_value=0) # 뺄셈
#result = seri_a.mul(seri_b, fill_value=0) # 곱셉
#result = seri_a.div(seri_b, fill_value=0) # 나눗셈  
print(result)

# 결과:
# a    1.0
# b    6.0
# c    8.0
# d    6.0
```

### # Series 필터링
Series 데이터의 조건을 지정하고 그 조건에 만족하는 데이터만 출력할 수도 있습니다. 과일 갯수가 20개 이상인 것만 출력하도록 조건을 지정하면, apple은 출력되지 않는 것을 볼 수 있습니다.

```python
fru_seri = pd.Series(index=['apple','banana','cherry'],data=[10,20,30],name='과일') # 열 이름을 지정
fru_seri[fru_seri >= 20]

# 결과:
#      과일
#banana	20
#cherry	30

```

### # NaN 값 처리
**dropna**와 **fillna** 를 사용하여 NaN값을 제거하거나, 0으로 대체 할 수 있습니다.

```python
seri = pd.Series([1, None, 3, None, 5])
print(seri.dropna())     # NaN 값 제거
# 결과:
# 0    1.0
# 2    3.0
# 4    5.0

print(seri.fillna(0))    # NaN 값을 0으로 대체
# 결과:
# 0    1.0
# 1    0.0
# 2    3.0
# 3    0.0
# 4    5.0
```