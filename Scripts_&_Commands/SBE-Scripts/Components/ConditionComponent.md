# ConditionComponent #

Conditions in scripts

## Syntax ##

```
#!java

#[(condition){ 
  body if condition has true value
}
else{ 
  body if condition has false value
}]
```

```
#!java

#[(condition){ body if condition has true value }]
```


## Available operators ##

```
#!text

 ===, !==, ~=, ==, !=, >=, <=, !, >, < 
```
Rules of comparison:

* **===** 
*  * Compares as: left == right as string
* **!==**
* * Compares as: left != right as string
* **~=**
* * Compares as: left Contains right ?
* **==** 
* * Compares in order of: 
* * * left == right as numeric
* * * left == right as boolean
* * * left == right as string
* **!=** 
* * Compares in order of: 
* * * left != right as numeric
* * * left != right as boolean
* * * left != right as string
* **>**
* * Compares as: left > right as numeric
* **>=**
* * Compares as: left >= right as numeric
* **<**
* * Compares as: left < right as numeric
* **<=**
* * Compares as: left <= right as numeric
* **!**
* * Inverting the all condition

## Examples ##

```
#!java

#[($(Configuration) ~= Deb){
    #[var ver = #[var ver].#[var revBuild]]
}]
```

```
#!java

#[(#[Build projects.find("ZenLib").IsBuildable]){
    #[var branchSha1 = #[File sout("git", "rev-parse --short HEAD")]]
}]
```

```
#!java

#[(!1 > 2){
    is greater
}]
```
