# csv2json
csv(input.csv)をjson(output.json)に変換するだけのアプリ

```
user,field1,field2
sv.junic1,Hogehoge,Mogeta
sv.junic2,Hogehoge,Mogeta
sv.junic3,Hogehoge,Mogeta
sv.junic4,Hogehoge,Mogeta
sv.junic5,Hogehoge,Mogeta
sv.junic6,Hogehoge,Mogeta
```

これが

```
[{"user":"sv.junic1","field1":"Hogehoge","field2":"Mogeta"},{"user":"sv.junic2","field1":"Hogehoge","field2":"Mogeta"},{"user":"sv.junic3","field1":"Hogehoge","field2":"Mogeta"},{"user":"sv.junic4","field1":"Hogehoge","field2":"Mogeta"},{"user":"sv.junic5","field1":"Hogehoge","field2":"Mogeta"},{"user":"sv.junic6","field1":"Hogehoge","field2":"Mogeta"}]
```

こうなる
