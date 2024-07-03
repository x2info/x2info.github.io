---
header:
  overlay_filter: 0.7 
  overlay_image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1778&q=80"
title:  "C# DataTable 사용법(데이터 추가/삭제/필터링)"
excerpt: "C#의 DataTable에서 데이터 추가/삭제/수정/필터링하는 방법에 대해 알아봅니다."
categories:
  - csharp
tags:
  - [C#]
 
toc_label: "목차"
toc: true
toc_sticky: true
---



## # 데이터 추가


아래와 같은 표와 매칭되는 DataTable을 만들어 보겠습니다.

| Name | Age  | Address |
| ---- | ---- | ------- |
| Kim  | 21   | Seoul   |
| Lee  | 22   | Busan   |
| Choi | 20   | Daegu   |
| Yeu  | 25   | Daegu   |
| Son  | 22   | Seoul   |
| Yang | 22   | KwangJu |


아래 예제는 위의 표를 DataTable을 생성하는 예제 입니다. Column을 추가 할 때 데이터 타입을 지정할 수 있으며, 행을 추가 할 경우 데이터 열의 갯수만큼 데이터를 삽입해야 합니다.

``` c#
// 1. DataTable 생성
DataTable studentTable = new DataTable("Fruits");

// 2. 열(Column) 추가
studentTable.Columns.Add("Name", typeof(string));
studentTable.Columns.Add("Age", typeof(int));
studentTable.Columns.Add("Address", typeof(string));

// 3. 행(Row) 추가
studentTable.Rows.Add("Kim",21,"Seoul");
studentTable.Rows.Add("Lee",22,"Busan");
studentTable.Rows.Add("Choi",20,"Daegu");
studentTable.Rows.Add("Yeu",25,"Daegu");
studentTable.Rows.Add("Son",22,"Seoul");
studentTable.Rows.Add("Yang",22,"KwangJu");
```

아래는 MSDN에 있는 DataTable Sample Code인데 여기를 자세히 살펴 보면 Column에 추가 속성을 지정하는 모습을 볼 수 있습니다. Unique 속성을 통해 중복된 데이터 입력이 불가능하게 하거나, ReadOnly 속성을 통해 읽기만 가능하게 할 수도 있습니다.<br>

마지막으로 DB의 Table처럼 Primary Key를 지정할 수도 있습니다.
``` c#
//https://learn.microsoft.com/ko-kr/dotnet/api/system.data.datatable?view=net-8.0

// Create a new DataTable.
System.Data.DataTable table = new DataTable("ParentTable");
// Declare variables for DataColumn and DataRow objects.
DataColumn column;
DataRow row;

// Create new DataColumn, set DataType,
// ColumnName and add to DataTable.
column = new DataColumn();
column.DataType = System.Type.GetType("System.Int32");
column.ColumnName = "id";
column.ReadOnly = true;
column.Unique = true;
// Add the Column to the DataColumnCollection.
table.Columns.Add(column);

// Create second column.
column = new DataColumn();
column.DataType = System.Type.GetType("System.String");
column.ColumnName = "ParentItem";
column.AutoIncrement = false;
column.Caption = "ParentItem";
column.ReadOnly = false;
column.Unique = false;
// Add the column to the table.
table.Columns.Add(column);

// Make the ID column the primary key column.
DataColumn[] PrimaryKeyColumns = new DataColumn[1];
PrimaryKeyColumns[0] = table.Columns["id"];
table.PrimaryKey = PrimaryKeyColumns;
```






## # 데이터 탐색
DataTable 내에 있는 데이터는 foreach 구문을 이용하여 탐색할 수 있습니다. DataTable내의 각 행의 데이터는 DataRow라는 클래스로 맵핑되며, Column의 이름을 통해 데이터에 접근이 가능합니다.
``` c#
 
// 4. 전체 데이터 출력
Console.WriteLine("<< Student List >> ");
foreach (DataRow row in studentTable.Rows)
{
      Console.WriteLine($"Name: {row["Name"]} Age: {row["Age"]}  Address: {row["Address"]}");
}
```


## # 데이터 필터링
DataTable내의 있는 데이터는 마치 DB의 Query문처럼 특정 조건이 만족되는 데이터만 별도로 뽑아 올 수 있습니다.DataTable 클래스의 Select()함수를 이용하여 특정 연령만 뽑아오거나 데이터를 정렬 할 수도 있습니다.

``` c#
// 5. 특정 연령 필터링
string filterExpression = "Age = 22";
DataRow[] filteredRows = studentTable.Select(filterExpression);
Console.WriteLine(" \n << Student List (Age = 22) >> ");
foreach (DataRow row in filteredRows)
{
      Console.WriteLine($"Name: {row["Name"]} Age: {row["Age"]}  Address: {row["Address"]}");
}

// 6. 특정 이름 필터링
filterExpression = "Name = 'Lee'";
filteredRows = studentTable.Select(filterExpression);
Console.WriteLine(" \n << Student List (Name = Lee) >> ");
foreach (DataRow row in filteredRows)
{
      Console.WriteLine($"Name: {row["Name"]} Age: {row["Age"]}  Address: {row["Address"]}");
}


// 7. 나이를 기준으로 오름차순 정렬
string sortExpression = "Age ASC";
DataRow[] sortedRows = studentTable.Select("", sortExpression);
Console.WriteLine(" \n << Student Sorted List (Age) >> ");
foreach (DataRow row in sortedRows)
{
      Console.WriteLine($"Name: {row["Name"]} Age: {row["Age"]}  Address: {row["Address"]}");
}
```


## # 데이터 수정
이름이 Lee인 사람의 나이를 수정해보겠습니다. DataTable를 탐색하면서 이름이 'Lee'인 사람을 찾고 바로 데이터를 수정하면 됩니다.

``` c#
//8. DataTable 수정
Console.WriteLine("\nUpdated Student List: Lee's age 22 -> 32");
foreach (DataRow row in studentTable.Rows)
{
      if (row["Name"].ToString() == "Lee")
         row["Age"] = 32;
}

// 전체 데이터 출력
Console.WriteLine("<< Student List >> ");
foreach (DataRow row in studentTable.Rows)
{
      Console.WriteLine($"Name: {row["Name"]} Age: {row["Age"]}  Address: {row["Address"]}");
}           
```

## # 데이터 삭제

DataTable에서 데이터를 삭제할 때는 데이터를 수정하는 부분과 비슷하지만 주의할 점이 있습니다. foreach 구문에서 바로 DataTable의 Row를 삭제하는 함수를 호출하면 **"컬렉션이 수정되었습니다. 열거 작업이 실행되지 않을 수 있습니다."**과 같은 Exception이 발생하기 때문입니다. <br>

따라서 foreach 구문에서는 삭제할 행을 따로 보관하고, foreach 구문이 끝난 뒤 제거해야 됩니다.
``` c#
//9. DataTable 내의 데이터 삭제
Console.WriteLine("\n Deleted Student List: Lee");
DataRow targetRow = null;
foreach (DataRow row in studentTable.Rows)
{
   if (row["Name"].ToString() == "Lee")
   {
      //Error 발생
      //System.InvalidOperationException: '컬렉션이 수정되었습니다. 열거 작업이 실행되지 않을 수 있습니다.'
      //
      //studentTable.Rows.Remove(row);
      targetRow = row;
   }
}

//foreach 구문 끝나고 Row를 삭제 할 것
studentTable.Rows.Remove(targetRow);

// 전체 데이터 출력
Console.WriteLine("<< Student List >> ");
foreach (DataRow row in studentTable.Rows)
{
   Console.WriteLine($"Name: {row["Name"]} Age: {row["Age"]}  Address: {row["Address"]}");
}
Console.WriteLine();

```

## # 전체 샘플 코드
``` c#
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleAppTest
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // 1. DataTable 생성
            DataTable studentTable = new DataTable("Fruits");

            // 2. 열(Column) 추가
            studentTable.Columns.Add("Name", typeof(string));
            studentTable.Columns.Add("Age", typeof(int));
            studentTable.Columns.Add("Address", typeof(string));


            // 3. 행(Row) 추가
            studentTable.Rows.Add("Kim",21,"Seoul");
            studentTable.Rows.Add("Lee",22,"Busan");
            studentTable.Rows.Add("Choi",20,"Daegu");
            studentTable.Rows.Add("Yeu",25,"Daegu");
            studentTable.Rows.Add("Son",22,"Seoul");
            studentTable.Rows.Add("Yang",22,"KwangJu");

            // 4. 전체 데이터 출력
            Console.WriteLine("<< Student List >> ");
            foreach (DataRow row in studentTable.Rows)
            {
                Console.WriteLine($"Name: {row["Name"]} Age: {row["Age"]}  Address: {row["Address"]}");
            }

            // 5. 특정 연령 필터링
            string filterExpression = "Age = 22";
            DataRow[] filteredRows = studentTable.Select(filterExpression);
            Console.WriteLine(" \n << Student List (Age = 22) >> ");
            foreach (DataRow row in filteredRows)
            {
                Console.WriteLine($"Name: {row["Name"]} Age: {row["Age"]}  Address: {row["Address"]}");
            }

            // 6. 특정 이름 필터링
            filterExpression = "Name = 'Lee'";
            filteredRows = studentTable.Select(filterExpression);
            Console.WriteLine(" \n << Student List (Name = Lee) >> ");
            foreach (DataRow row in filteredRows)
            {
                Console.WriteLine($"Name: {row["Name"]} Age: {row["Age"]}  Address: {row["Address"]}");
            }

            // 7. 가격을 기준으로 오름차순 정렬
            string sortExpression = "Age ASC";
            DataRow[] sortedRows = studentTable.Select("", sortExpression);
            Console.WriteLine(" \n << Student Sorted List (Age) >> ");
            foreach (DataRow row in sortedRows)
            {
                Console.WriteLine($"Name: {row["Name"]} Age: {row["Age"]}  Address: {row["Address"]}");
            }

            //8. DataTable 수정
            Console.WriteLine("\nUpdated Student List: Lee's age 22 -> 32");
            foreach (DataRow row in studentTable.Rows)
            {
                if (row["Name"].ToString() == "Lee")
                    row["Age"] = 32;
            }

            // 전체 데이터 출력
            Console.WriteLine("<< Student List >> ");
            foreach (DataRow row in studentTable.Rows)
            {
                Console.WriteLine($"Name: {row["Name"]} Age: {row["Age"]}  Address: {row["Address"]}");
            }


            //9. DataTable 내의 데이터 삭제
            Console.WriteLine("\n Deleted Student List: Lee");
            DataRow targetRow = null;
            foreach (DataRow row in studentTable.Rows)
            {
                if (row["Name"].ToString() == "Lee")
                {
                    //Error 발생
                    //System.InvalidOperationException: '컬렉션이 수정되었습니다. 열거 작업이 실행되지 않을 수 있습니다.'
                    //
                    //studentTable.Rows.Remove(row);
                    targetRow = row;
                }
            }

            studentTable.Rows.Remove(targetRow);

            // 전체 데이터 출력
            Console.WriteLine("<< Student List >> ");
            foreach (DataRow row in studentTable.Rows)
            {
                Console.WriteLine($"Name: {row["Name"]} Age: {row["Age"]}  Address: {row["Address"]}");
            }
            Console.WriteLine();
        }
    }
}
```