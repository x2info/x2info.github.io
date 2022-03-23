---
header:
  overlay_filter: 0.7 

title:  "C# XML 파일 가져오기(Parser/Serializatoin)"
excerpt: "C#에서 XML 활용법에 대해 알아봅니다."
classes: wide
categories:
  - csharp
tags:
  - [C#]
 
toc_label: "목차"
toc: true
toc_sticky: true
---



## XML 이란?

> **XML**(eXtensible Markup Language)은 [W3C](https://ko.wikipedia.org/wiki/W3C)에서 개발된, 다른 특수한 목적을 갖는 [마크업 언어](https://ko.wikipedia.org/wiki/마크업_언어)를 만드는데 사용하도록 권장하는 다목적 [마크업 언어](https://ko.wikipedia.org/wiki/마크업_언어)이다. XML은 [SGML](https://ko.wikipedia.org/wiki/SGML)의 단순화된 부분집합으로, 다른 많은 종류의 데이터를 기술하는 데 사용할 수 있다. XML은 주로 다른 종류의 시스템, 특히 [인터넷](https://ko.wikipedia.org/wiki/인터넷)에 연결된 시스템끼리 데이터를 쉽게 주고 받을 수 있게 하여 [HTML](https://ko.wikipedia.org/wiki/HTML)의 한계를 극복할 목적으로 만들어졌다.
>
> 기계는 인간의 언어를 읽거나 이해할 수 없는 계산기에 불과하므로 XML과 같은 구조화된 마크업 언어들은 인간의 읽고 분석하여 이해하는 능력과 컴퓨터의 단순한 계산적인 판독 능력 사이에 타협점을 만들어 줄 수 있다. [W3C](https://ko.wikipedia.org/wiki/W3C)가 만든 XML 1.0 Specification[[1\]](https://ko.wikipedia.org/wiki/XML#cite_note-1)과 몇몇 다른 관련 명세들[[2\]](https://ko.wikipedia.org/wiki/XML#cite_note-2)과 모든 자유 [개방형 표준](https://ko.wikipedia.org/wiki/개방형_표준)[[3\]](https://ko.wikipedia.org/wiki/XML#cite_note-3)에서 정의되었다.
>
> W3C는 XML 설계 목표에서 단순성과 일반성, 그리고 [인터넷](https://ko.wikipedia.org/wiki/인터넷)을 통한 사용 가능성을 강조했다.[[4\]](https://ko.wikipedia.org/wiki/XML#cite_note-XML_Goals-4) XML은 텍스트 데이터 형식으로 [유니코드](https://ko.wikipedia.org/wiki/유니코드)를 사용해 전 세계 언어를 지원한다. XML을 설계할 때는 주로 문서를 표현하는데 집중했지만, 지금은 임의의 자료구조를 나타내는 데 널리 쓰인다. 대표적인 예가 [웹 서비스](https://ko.wikipedia.org/wiki/웹_서비스)이다.
>
> 많은 [API](https://ko.wikipedia.org/wiki/API)가 개발되어 XML 데이터를 처리하고자 하는 소프트웨어 개발자들이 활용하고 있다. 또한, 여러 가지 [스키마 시스템](https://ko.wikipedia.org/wiki/XML_스키마)이 있어서 XML 기반 언어의 정의를 보다 쉽게 할 수 있도록 도와준다.
>
> <출저: [위키백과](https://ko.wikipedia.org/wiki/XML)>



## Sample XML(Books.xml)

아래의 XMl은 Catalog를 Root Element로 하는 Book List를 나열한 XML의 예이다.

> 출처: https://docs.microsoft.com/en-us/previous-versions/windows/desktop/ms762271(v=vs.85)

``` xml
<?xml version="1.0"?>
<catalog>
   <book id="bk101">
      <author>Gambardella, Matthew</author>
      <title>XML Developer's Guide</title>
      <genre>Computer</genre>
      <price>44.95</price>
      <publish_date>2000-10-01</publish_date>
      <description>An in-depth look at creating applications 
      with XML.</description>
   </book>
   <book id="bk102">
      <author>Ralls, Kim</author>
      <title>Midnight Rain</title>
      <genre>Fantasy</genre>
      <price>5.95</price>
      <publish_date>2000-12-16</publish_date>
      <description>A former architect battles corporate zombies, 
      an evil sorceress, and her own childhood to become queen 
      of the world.</description>
   </book>
   <book id="bk103">
      <author>Corets, Eva</author>
      <title>Maeve Ascendant</title>
      <genre>Fantasy</genre>
      <price>5.95</price>
      <publish_date>2000-11-17</publish_date>
      <description>After the collapse of a nanotechnology 
      society in England, the young survivors lay the 
      foundation for a new society.</description>
   </book>
   <book id="bk104">
      <author>Corets, Eva</author>
      <title>Oberon's Legacy</title>
      <genre>Fantasy</genre>
      <price>5.95</price>
      <publish_date>2001-03-10</publish_date>
      <description>In post-apocalypse England, the mysterious 
      agent known only as Oberon helps to create a new life 
      for the inhabitants of London. Sequel to Maeve 
      Ascendant.</description>
   </book>
   <book id="bk105">
      <author>Corets, Eva</author>
      <title>The Sundered Grail</title>
      <genre>Fantasy</genre>
      <price>5.95</price>
      <publish_date>2001-09-10</publish_date>
      <description>The two daughters of Maeve, half-sisters, 
      battle one another for control of England. Sequel to 
      Oberon's Legacy.</description>
   </book>
   <book id="bk106">
      <author>Randall, Cynthia</author>
      <title>Lover Birds</title>
      <genre>Romance</genre>
      <price>4.95</price>
      <publish_date>2000-09-02</publish_date>
      <description>When Carla meets Paul at an ornithology 
      conference, tempers fly as feathers get ruffled.</description>
   </book>
   <book id="bk107">
      <author>Thurman, Paula</author>
      <title>Splish Splash</title>
      <genre>Romance</genre>
      <price>4.95</price>
      <publish_date>2000-11-02</publish_date>
      <description>A deep sea diver finds true love twenty 
      thousand leagues beneath the sea.</description>
   </book>
   <book id="bk108">
      <author>Knorr, Stefan</author>
      <title>Creepy Crawlies</title>
      <genre>Horror</genre>
      <price>4.95</price>
      <publish_date>2000-12-06</publish_date>
      <description>An anthology of horror stories about roaches,
      centipedes, scorpions  and other insects.</description>
   </book>
   <book id="bk109">
      <author>Kress, Peter</author>
      <title>Paradox Lost</title>
      <genre>Science Fiction</genre>
      <price>6.95</price>
      <publish_date>2000-11-02</publish_date>
      <description>After an inadvertant trip through a Heisenberg
      Uncertainty Device, James Salway discovers the problems 
      of being quantum.</description>
   </book>
   <book id="bk110">
      <author>O'Brien, Tim</author>
      <title>Microsoft .NET: The Programming Bible</title>
      <genre>Computer</genre>
      <price>36.95</price>
      <publish_date>2000-12-09</publish_date>
      <description>Microsoft's .NET initiative is explored in 
      detail in this deep programmer's reference.</description>
   </book>
   <book id="bk111">
      <author>O'Brien, Tim</author>
      <title>MSXML3: A Comprehensive Guide</title>
      <genre>Computer</genre>
      <price>36.95</price>
      <publish_date>2000-12-01</publish_date>
      <description>The Microsoft MSXML3 parser is covered in 
      detail, with attention to XML DOM interfaces, XSLT processing, 
      SAX and more.</description>
   </book>
   <book id="bk112">
      <author>Galos, Mike</author>
      <title>Visual Studio 7: A Comprehensive Guide</title>
      <genre>Computer</genre>
      <price>49.95</price>
      <publish_date>2001-04-16</publish_date>
      <description>Microsoft Visual Studio 7 is explored in depth,
      looking at how Visual Basic, Visual C++, C#, and ASP+ are 
      integrated into a comprehensive development 
      environment.</description>
   </book>
</catalog>
```



## XML Parser

아래의 코드는 Books라는 xml파일(Smaple XML파일)을 읽은 후 Book의 Element의 이름과  값을 출력하는 예제 입니다.

- 코드

```c#
 //using System.Xml.Linq;
XDocument xdoc = XDocument.Load(@"F:\books.xml");

IEnumerable<XElement> books = xdoc.Root.Elements();
foreach (var book in books)
{
    Console.WriteLine("-----------------------------------------------");
    Console.WriteLine("Parent Element  Name:" + book.Parent.Name);
    Console.WriteLine("Current Element Name:" + book.Name);
    Console.WriteLine("-----------------------------------------------");
    if (book.HasElements)
    {
        Console.WriteLine("-----------------------------------------------");
        foreach (var e in book.Elements())
        {
            Console.WriteLine(e.Name + " = " + e.Value);
        }
        Console.WriteLine("-----------------------------------------------");
    }
}
```



## XML Serialization

Class에서 XmlElement를 정의하고, 이를 Object로도 받아 올 수 있습니다.

- 클래스 정의

```c#
//using System.Xml.Serialization;
[XmlRoot("catalog")]
public class BookList
{
    [XmlElement("book")]
    public List<Book> Books { get; set; }
}

public class Book
{
    [XmlElement("author")]
    public string author { get; set; }
    [XmlElement("title")]
    public string title { get; set; }
    [XmlElement("genre")]
    public string genre { get; set; }
    [XmlElement("price")]
    public string price { get; set; }
    [XmlElement("publish_date")]
    public string publish_date { get; set; }
    [XmlElement("description")]
    public string description { get; set; }

}
```

- XML Serialization

```c#
XmlSerializer serializer = new XmlSerializer(typeof(BookList));
string allText = File.ReadAllText(@"F:\books.xml");
using (TextReader reader = new StringReader(allText))
{
    BookList bookList = (BookList)serializer.Deserialize(reader);

    foreach (var book in bookList.Books)
    {
        Console.WriteLine(book.author);
        Console.WriteLine(book.title);
        Console.WriteLine(book.genre);
        Console.WriteLine(book.price);
        Console.WriteLine(book.publish_date);
    }
}
```



## XML File 생성

1. Root Element를 생성한 
2. Child Element를 Root Element에 추가 
3. Root Element를 XDocument에 추가
4. 저장할 위치 선택

```c#
XDocument fruitDoc   = new XDocument();
XElement  fruitRoot  = new XElement("FruitList");

XElement xe1 = new XElement("Fruit",
    new XAttribute("Id", "1"),
    new XElement("Name", "Apple"),
    new XElement("Price", "1000")
);

XElement xe2 = new XElement("Fruit",
    new XAttribute("Id", "2"),
    new XElement("Name", "Banana"),
    new XElement("Price", "2000")
);

fruitRoot.Add(xe1);
fruitRoot.Add(xe2);
fruitDoc.Add(fruitRoot);

fruitDoc.Save(@"F:\Fruit.xml");
```

