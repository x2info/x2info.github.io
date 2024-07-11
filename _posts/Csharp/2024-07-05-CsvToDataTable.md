---
published: true
header:
  overlay_filter: 0.7 
  overlay_image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1778&q=80"
title:  "C# 프로그래밍: CSV 파일을 DataTable로 변환하기"
excerpt: "C#에서 CSV파일의 데이터를 DataTable Class로 변환하는 방법에 대해 간단한 예제를 통해 알아 봅니다."
categories:
  - csharp
tags:
  - [C#]
 
toc_label: "목차"
toc: true
toc_sticky: true
---



## # CSV File?

 CSV 파일은 데이터를 쉽게 교환하고 저장할 수 있도록 설계된 간단한 텍스트 파일 형식입니다. "CSV"는 "Comma-Separated Values"의 약자입니다. CSV 파일의 첫번째 행은 데이터의 속성 즉 어떤 데이터인지 알 수 있도록 헤더 정보가 포함되어 있으며, 두번째 행부터 실제적인 데이터가 추가됩니다.

 아래는 전형적인 CSV 파일 형태 입니다.
``` c
Name, Gender, Age
Alice, Female, 30
Bob, Male, 25
Charlie, Male, 35
Diana, Female, 28
```

## # DataTable 변환

CSV파일을 보면 C#의 DataTable로 변환하면 딱 맞겠다는 생각이 듭니다. 데이터를 맵핑하기에 가장 좋은 클래스 입니다. CSV 파일의 첫번째 행이 테이블의 헤더 정보를 포함하고 있고, 두번째 행부터 실제적인 데이터가 있기 때문입니다. 

이러한 구조적인 부분을 알고 있으면 외부의 라이브러리 도움 없이 간단하게 아래의 코드를 이용하여 구현이 가능합니다. 특별히 어려운 부분은 없는데 가끔 csv파일 맨 끝에 ,가 있는 경우에는 이 부분을 지워주는 것이 좋습니다. 지우지 않는다면 빈 열이 추가되게 됩니다.

``` c#
static void Main()
{
    // CSV 파일 경로 설정
    string filePath = @"sample.csv";

    // CSV 파일을 DataTable로 변환
    DataTable dataTable = ConvertCsvToDataTable(filePath);

    // DataTable 출력
    ShowDataTable(dataTable);

    Console.WriteLine();
}

// CSV 파일을 DataTable로 변환하는 메서드
static DataTable ConvertCsvToDataTable(string filePath)
{
    DataTable dataTable = new DataTable("SampleData");

    // 파일을 한 줄씩 읽기
    string[] lines = File.ReadAllLines(filePath);

    if (lines.Length > 0)
    {

        // 첫 줄은 열 이름 (헤더)
        string[] headerColumns = lines[0].TrimEnd(',').Split(',');

        // DataTable에 열 추가
        foreach (string column in headerColumns)
        {
            dataTable.Columns.Add(column);
        }

        // 나머지 줄은 데이터 행
        for (int i = 1; i < lines.Length; i++)
        {
            string[] dataColumns = lines[i].Split(',');
            DataRow dataRow = dataTable.NewRow();

            for (int j = 0; j < dataRow.Table.Columns.Count; j++)
            {
                dataRow[j] = dataColumns[j];
            }
            dataTable.Rows.Add(dataRow);
        }
    }

    return dataTable;
}

// DataTable의 내용을 출력하는 메서드
static void ShowDataTable(DataTable table)
{
    // 열 이름 출력
    foreach (DataColumn column in table.Columns)
    {
        Console.Write(column.ColumnName + "\t");
    }
    Console.WriteLine();

    // 각 행 출력
    foreach (DataRow row in table.Rows)
    {

        //
        // 출력방법 1
        //
        foreach (var item in row.ItemArray)
        {
            Console.Write(item + "\t");
        }

        //
        // 출력방법 2
        //
        //for (int j = 0; j < table.Columns.Count; j++)
        //{
        //    Console.Write(row[j] + "\t");
        //}
        Console.WriteLine();
    }
}
```

⬇️ 실행 결과<br>
![CSV To DataTable](/images/2024-07-11-13-19-20.png)


## # LINQ 활용
C#에서 데이터 처리와 관련된 기능 중에 LINQ를 활용하면 원하는 CSV파일에서 DataTable로 변환하고 그 DataTable에서 다시 조건에 맞는 데이터만 새로운 DataTable로 변환할 수 있습니다. 아래의 코드는 C#의 LINQ 기능을 활용하여 원하는 데이터를 DataTable에서 추출해서 새로운 DataTable를 만드는 예제입니다. 위의 예제 코드에서 GetMaleData라는 함수만 추가 했습니다.<BR>

여기서 주의 할 것은 기존의 DataTable의 Schema만 복사할 경우 DataTable의 Clone()함수를 이용한다는 점과 LINQ로 추출된 DataRow Collection은 새로운 DataTable에서 ImportRow()라는 함수를 통해 추가해야 된다는 사실입니다. 

```c#
 static DataTable GetMaleData(DataTable table)
 {

     var results = from myRow in table.AsEnumerable()
                   where myRow.Field<string>("Gender") == "Male"
                   select myRow;

     //Table의 Schema만 복사(데이터 X)
     DataTable newTable = table.Clone();

     foreach (DataRow item in results)
     {
         //Error발생 주의: System.ArgumentException: '이 행은 이미 다른 테이블에 속해 있습니다.'
         //newTable.Rows.Add(item);
         newTable.ImportRow(item);
     }

     return newTable;
 }
```

⬇️ 실행 결과<br>
![New DataTable by using C# LINQ](/images/2024-07-11-13-23-14.png)